import { Test, TestingModule } from '@nestjs/testing';
import { StorehouseService } from './storehouse.service';

describe('StorehouseService', () => {
  let service: StorehouseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorehouseService],
    }).compile();

    service = module.get<StorehouseService>(StorehouseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
