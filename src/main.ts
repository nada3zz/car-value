import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSession } from './shared/config';
import { setupSecurityHeaders } from './shared/middlewares';
import { disableETags } from './shared/config';
import { CurrentUserInterceptor } from './modules/auth/interceptor';
import { UsersService } from './modules/users/users.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
    transform: true,
    whitelist: true
  }));

  setupSession(app);
  setupSecurityHeaders(app);
  disableETags(app);
  app.useGlobalInterceptors(new CurrentUserInterceptor(app.get(UsersService)));

  const port = process.env.PORT || 5000;
  await app.listen(port);
}
bootstrap();
