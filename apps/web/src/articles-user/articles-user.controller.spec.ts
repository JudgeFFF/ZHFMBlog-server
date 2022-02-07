import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesUserController } from './articles-user.controller';

describe('ArticlesUserController', () => {
  let controller: ArticlesUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesUserController],
    }).compile();

    controller = module.get<ArticlesUserController>(ArticlesUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
