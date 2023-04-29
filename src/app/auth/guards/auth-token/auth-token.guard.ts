import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { adminAuth } from '../../../../helpers/firebase.config.admin';
import { ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import config from '../../../../config'
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ){}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.get('isPublic',  context.getHandler());
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers["authorization"]?.split(' ')[1];

    if(this.checkPublicKey(isPublic, token)) return true;

    try {
      const owner = await adminAuth.verifyIdToken(token);
      const isVerified = await this.checkIfEmailVerified(owner.uid);
      if(!isVerified) {
        throw new Error('Email is not verified!');
      }
      return isVerified;
    } catch(error) {
      throw new ForbiddenException('Invalid token');
    }
  }

  protected checkPublicKey(isPublic: boolean, token: string): boolean{
      if(
        isPublic === true && 
        this.configService.apiKey === token
      ) return true;

      return false;
  }

  protected async checkIfEmailVerified(uid: string): Promise<boolean> {
    const user = await adminAuth.getUser(uid);
    return user.emailVerified;
  }
}
