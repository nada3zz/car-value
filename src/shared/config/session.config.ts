import { INestApplication } from '@nestjs/common';
const cookieSession = require('cookie-session');

export function setupSession(app: INestApplication) {
  app.use(
    cookieSession({
      keys: [process.env.SESSION_SECRET_KEY],
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    }),
  );
}
