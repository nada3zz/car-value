import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared';

@Injectable()
export class UsersService {
 constructor(protected prismaService: PrismaService){} 
 
 async findById(id: number) {
   return this.prismaService.user.findUnique({
     where: { id }
   });
 }

 async findBySessionId(sessionId: string) {
    return this.prismaService.user.findUnique({
      where: { sessionId }
    });
 }
}
