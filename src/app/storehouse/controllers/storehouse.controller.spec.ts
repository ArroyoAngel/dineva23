import { Test, TestingModule } from '@nestjs/testing';
import { StorehouseController } from './storehouse.controller';

describe('StorehouseController', () => {
  let controller: StorehouseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StorehouseController],
    }).compile();

    controller = module.get<StorehouseController>(StorehouseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
