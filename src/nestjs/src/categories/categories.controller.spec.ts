import { CategoriesController } from './categories.controller';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCategoryUseCase } from '@tsn/micro-videos/category/application';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should create a category', () => {
    const expectedOutput: CreateCategoryUseCase.Output = {
      id: '664dfbae-99cb-414c-9e4c-871e12a0a107',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };

    const input: CreateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    //@ts-expect-error test
    controller['createUseCase'] = mockCreateUseCase;
    const output = controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(output).toStrictEqual(expectedOutput);
    expect(controller).toBeDefined();
  });
});
