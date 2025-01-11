import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared';

@Injectable()
export class UsersService {
  constructor(protected prismaService: PrismaService) {}

  async findById(id: number) {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findBySessionId(sessionId: string) {
    return await this.prismaService.user.findUnique({
      where: { sessionId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });
  }

  async Delete(id: number) {
    return await this.prismaService.user.delete({
      where: { id },
    });
  }
}
