import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import AuthService from './auth.service';

import LoginDto from "./dto/LoginDto"


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate( credential : LoginDto): Promise<any> {
    const user = await this.authService.validateUser(credential);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}