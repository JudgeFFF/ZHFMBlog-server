import { Test, TestingModule } from '@nestjs/testing';
import { TagsAdminController } from './tags-admin.controller';

describe('TagsAdminController', () => {
  let controller: TagsAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsAdminController],
    }).compile();

    controller = module.get<TagsAdminController>(TagsAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
