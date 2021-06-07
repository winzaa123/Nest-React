import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import  AuthService from './auth.service';
import { AuthController } from './auth.controller';

import { LocalStrategy } from './local.strategy';
import {UserModule} from '../user/user.module';

import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './const';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [UserModule,PassportModule.register({
    defaultStrategy: 'jwt',
    property: 'user',
    session: false,
  }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService,LocalStrategy,JwtStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
