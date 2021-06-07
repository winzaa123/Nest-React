import { Controller, Request, Post, UseGuards, Body, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import {LocalAuthGuard} from "./local-auth.guard"

import LoginDto from "./dto/LoginDto"
import AuthService from "./auth.service"
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';

import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtPayload } from './interfaces/JwtPayload';

import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from './roles.guard';
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

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    @ApiBearerAuth()
    getProfile(@Request() req) {
      console.log( req.user)
      return this.authService.getUser(req.user.userId)
    }

    @Get('whoami')
    @UseGuards(AuthGuard())
    @ApiBearerAuth()
    public async testAuth(@Request() req: any): Promise<JwtPayload> {
      return req.user;
    }

    @Get('testRole')
    @UseGuards(AuthGuard(),RolesGuard)
    @Roles('admin','xxx')
    @ApiBearerAuth()
    async create( ) {
      return "can access"
    }

    
}
