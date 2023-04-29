import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { adminAuth } from 'src/helpers/firebase.config.admin';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthRoleGuard<Roles> implements CanActivate {
  
  constructor(private readonly role?: Roles) {}
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers["authorization"]?.split(' ')[1];
    try {
      const owner = await adminAuth.verifyIdToken(token);
      const unauthorized = owner["role"] !== this.role;
      if (unauthorized){
        throw new ForbiddenException('Invalid role');
      }
      return !unauthorized;
    }catch(error){
      throw new ForbiddenException('Invalid role');
    }
  }
}