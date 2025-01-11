import { Body, Controller, Post, Session } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from '../dtos';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterDTO, @Session() session: any) {
    const user = await this.authService.register({ ...body });
    session.userId = user.createUser.sessionId;
    return user.message;
  }

  
  @Post('/register-admin')
  async registerAdmin(@Body() body: RegisterDTO, @Session() session: any) {
    const user = await this.authService.registerAdmin({ ...body });
    session.userId = user.createUser.sessionId;
    return user.message;
  }

  @Post('/login')
  async login(@Body() body: LoginDTO, @Session() session: any) {
    const user = await this.authService.login({ ...body });
    session.userId = user.user.sessionId;
    return user.message;
  }

  @Post('/logout')
  async logout(@Session() session: Record<string, any>) {
    await this.authService.logout(session.userId);
    session.userId = null;
    return { message: 'Sign out successful' };
  }
}
