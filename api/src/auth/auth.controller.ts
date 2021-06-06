import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {LocalAuthGuard} from "./local-auth.guard"

import LoginDto from "./dto/LoginDto"
import AuthService from "./auth.service"
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {}

    // @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiResponse({ status: 400, description: 'Bad Request.'  })
    async login(@Body() credential: LoginDto) {
       
      return await this.authService.validateUser(credential)
    }

    @Post('signup')
    @ApiResponse({
      status: 200,
      description: 'User Data',
      type: User,
    })
    async signup(@Body() credential: LoginDto) {
       
      return await this.authService.signup(credential)
    }
}
