import { Module } from '@nestjs/common';
import { PurchaseController } from './controllers/purchase.controller';
import { PurchaseService } from './services/purchase.service';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService]
})
export class PurchaseModule {}
