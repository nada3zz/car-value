import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared';

@Injectable()
export class UsersService {
 constructor(protected prismaService: PrismaService){} 
 
 async findOne(id: number) {
   return this.prismaService.user.findUnique({
     where: { id }
   });
 }
}
