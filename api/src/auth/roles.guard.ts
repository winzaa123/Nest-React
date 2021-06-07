import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class RolesGuard  extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
      }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // console.log(user)
    const hasRole = () =>
      user.roles.some(role => !!roles.find(item => item === role));

      if(user && user.roles && hasRole()){
        return true
      }
      throw new UnauthorizedException();
    // return user && user.roles && hasRole();
  }
}