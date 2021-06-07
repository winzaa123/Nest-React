import { Injectable ,HttpException, HttpStatus } from '@nestjs/common';
import  UsersService from '../user/user.service';

import { hash, compare } from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

import LoginDto from "./dto/LoginDto"
import { JwtPayload } from './interfaces/JwtPayload';
import { use } from 'passport';

@Injectable()
export default  class AuthService {
  constructor(
    private usersService: UsersService
    ,private jwtService: JwtService
    ) {}

  async validateUser({email,password} : LoginDto): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new HttpException(`Not user found for this email`,HttpStatus.BAD_REQUEST)
      }
      const passwordValid = await compare(password, user.password)
      if (!passwordValid) {
        throw new HttpException('Invalid password',HttpStatus.BAD_REQUEST)
      }
    if (user) {
      // const { password, ...result } = user;
      const payload : JwtPayload = { userId: user.id, sub: user.id , username: String(user.id) ,roles:['admin'] };
      return {
        accessToken: this.jwtService.sign(payload),
      };
      // return result;
    }
    return null;
  }

  async signup({email,password} : LoginDto): Promise<any> {
    const checkEmail = await this.usersService.findOneByEmail(email)
    if (checkEmail) {
      throw new HttpException('User with that email already exists',HttpStatus.BAD_REQUEST)
    }
    const hashedPassword = await hash(password, 10)
      const user =  await this.usersService.createUser({
        email,
        password: hashedPassword,
      })
      // await this.userRepository.save(user);
      // delete user.password
      return user
  }

  async getUser(id : any): Promise<any> {
    return this.usersService.getUserById(id)
  }
}

