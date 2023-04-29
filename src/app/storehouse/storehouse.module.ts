import { Module } from '@nestjs/common';
import { StorehouseController } from './controllers/storehouse.controller';
import { StorehouseService } from './services/storehouse.service';

@Module({
    controllers: [StorehouseController],
    providers: [StorehouseService]
})
export class StorehouseModule {}
