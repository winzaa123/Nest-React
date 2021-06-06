import { Module } from '@nestjs/common';
import  UserService from './user.service';
import { UserController } from './user.controller';

import {User,UserSocial} from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User,UserSocial])],
  providers: [UserService],
  exports: [UserService], // for auth
  controllers: [UserController]
})
export class UserModule {}
