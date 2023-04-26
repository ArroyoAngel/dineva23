import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { adminAuth } from '../../../../helpers/firebase.config.admin';
import { ForbiddenException } from '@nestjs/common';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers["authorization"]?.split(' ')[1];

    try {
      const owner = await adminAuth.verifyIdToken(token);
      const isVerified = await this.checkIfEmailVerified(owner.uid)
      return isVerified;
    }catch(error){
      throw new ForbiddenException('Invalid token');
    }
  }
  protected async checkIfEmailVerified(uid: string): Promise<boolean> {
    const user = await adminAuth.getUser(uid);
    return user.emailVerified;
  }
}
