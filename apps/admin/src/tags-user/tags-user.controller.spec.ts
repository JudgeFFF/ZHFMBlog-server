import { Test, TestingModule } from '@nestjs/testing';
import { TagsUserController } from './tags-user.controller';

describe('TagsUserController', () => {
  let controller: TagsUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TagsUserController],
    }).compile();

    controller = module.get<TagsUserController>(TagsUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
