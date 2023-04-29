import { Module } from '@nestjs/common';
import { AccountModule } from './app/account/account.module';
import { AuthModule } from './app/auth/auth.module';
import { UserModule } from './app/user/user.module';
import { StorehouseModule } from './app/storehouse/storehouse.module';
import { OrderModule } from './app/order/order.module';
import { PurchaseModule } from './app/purchase/purchase.module';
import { RequestModule } from './app/request/request.module';

import { ConfigModule } from '@nestjs/config';
import { enviroments } from './enviroments';
import config from './config'
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.Node_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
          API_KEY: Joi.string().required(),
      })
    }),
    AccountModule, 
    AuthModule, 
    UserModule, 
    StorehouseModule, 
    OrderModule, 
    PurchaseModule, 
    RequestModule],
})
export class AppModule {}
