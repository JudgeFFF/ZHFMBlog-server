import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesAdminController } from './articles-admin.controller';

describe('ArticlesAdminController', () => {
  let controller: ArticlesAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesAdminController],
    }).compile();

    controller = module.get<ArticlesAdminController>(ArticlesAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
