import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/modules/users/users.service';

declare global {
  namespace Express {
    interface User {
      id: number;
      name: string;
      email: string;
      role: string
    }

    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};

    if (userId) {
      const user = await this.usersService.findBySessionId(userId);
      req.currentUser = user;
    }

    next();
  }
}
