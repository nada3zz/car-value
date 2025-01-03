import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/shared';
import { LoginDTO, RegisterDTO } from '../dtos';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
  ) {}

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  private async validatePassword(password: string, hashedPassword: string) {
    return await bcrypt.compare(password, hashedPassword);
  }

  generateSessionId(){
    const sessionId = uuidv4();
    return sessionId;
  }

  async isUser(email:string){
    return await this.prismaService.user.findUnique({where:{email}})
  }

  async storeSessionId(email: string ,sessionId: string){
    return await this.prismaService.user.update({ where: { email }, data: { sessionId: sessionId }})
  }

  async register(user: RegisterDTO) {

    const findUser = await this.prismaService.user.findUnique({
      where: { email: user.email },
    });

    if (findUser) throw new BadRequestException('This email is already registered')

    const password = await this.hashPassword(user.password);
    const sessionId = this.generateSessionId()
    const { name, email } = user;
    const createUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password,
        role: Role.USER,
        sessionId
      },
    });

    return {
      createUser,
      message:
        'User registered successfully',
    };
  }

  async login(
    { email, password }: LoginDTO,
  ) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const match = await this.validatePassword(password, user.password);

    if (match) {
      const sessionId = this.generateSessionId()
      const user = await this.storeSessionId(email, sessionId)
      return {
        user,
        message:
          'User logged in successfully',
      };
    }

    throw new BadRequestException('Your password is not correct');
  }

  async logout(sessionId: string) {
    if(!sessionId)
      throw new BadRequestException('You are not logged');

    const findUser= await this.prismaService.user.findUnique({where: {sessionId}});
    if(!findUser) throw new NotFoundException('User not found');
    
    await this.prismaService.user.update({
      where: { sessionId },
      data: { sessionId: null },
    });
  
    return {
      message: 'Logout successful',
    };
  }

}
