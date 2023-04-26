import { Module } from '@nestjs/common';
import { AccountModule } from './app/account/account.module';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';

@Module({
  imports: [AccountModule, AuthModule, UserModule],
})
export class AppModule {}
