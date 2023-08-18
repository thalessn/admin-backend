import { CategoriesController } from '../../categories.controller';
import { CreateCategoryDto } from '../../dto/create-category.dto';
import {
  CreateCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from '@tsn/micro-videos/category/application';
import { UpdateCategoryDto } from '../../dto/update-category.dto';
import { SearchCategoryDto } from '../../dto/search-category.dto';

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it('should create a category', async () => {
    const expectedOutput: CreateCategoryUseCase.Output = {
      id: '664dfbae-99cb-414c-9e4c-871e12a0a107',
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    const input: CreateCategoryDto = {
      name: 'Movie',
      description: 'some description',
      is_active: true,
    };
    //@ts-expect-error test
    controller['createUseCase'] = mockCreateUseCase;
    const output = await controller.create(input);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(output).toStrictEqual(expectedOutput);
    expect(controller).toBeDefined();
  });

  it('should gets a category', async () => {
    const id = '664dfbae-99cb-414c-9e4c-871e12a0a107';
    const expectedOutput: CreateCategoryUseCase.Output = {
      id,
      name: 'Movie',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockGetUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    //@ts-expect-error test
    controller['getUseCase'] = mockGetUseCase;
    const output = await controller.findOne(id);
    expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
    expect(output).toStrictEqual(expectedOutput);
    expect(controller).toBeDefined();
  });

  it('should update a category', async () => {
    const id = '664dfbae-99cb-414c-9e4c-871e12a0a107';
    const expectedOutput: UpdateCategoryUseCase.Output = {
      id,
      name: 'Movie-Update',
      description: 'some description',
      is_active: true,
      created_at: new Date(),
    };
    const mockUpdateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    const input: UpdateCategoryDto = {
      name: 'Movie-Update',
      description: 'some description',
      is_active: true,
    };
    //@ts-expect-error test
    controller['updateUseCase'] = mockUpdateUseCase;
    const output = await controller.update(id, input);
    expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({ id, ...input });
    expect(output).toStrictEqual(expectedOutput);
    expect(controller).toBeDefined();
  });

  it('should delete a category', async () => {
    const expectedOutput = undefined;
    const deleteUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    //@ts-expect-error test
    controller['deleteUseCase'] = deleteUseCase;
    const id = '664dfbae-99cb-414c-9e4c-871e12a0a107';
    const output = await controller.remove(id);
    expect(controller.remove(id)).toBeInstanceOf(Promise);
    expect(deleteUseCase.execute).toHaveBeenCalledWith({ id });
    expect(output).toStrictEqual(expectedOutput);
    expect(controller).toBeDefined();
  });

  it('should lists categories', async () => {
    const expectedOutput: ListCategoriesUseCase.Output = {
      items: [
        {
          id: '664dfbae-99cb-414c-9e4c-871e12a0a107',
          name: 'Movie',
          description: 'some description',
          is_active: true,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };
    const mockListUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    const input: SearchCategoryDto = {
      per_page: 1,
      page: 1,
      sort: 'name',
      sort_dir: 'desc',
      filter: 'test',
    };
    //@ts-expect-error test
    controller['listUseCase'] = mockListUseCase;
    const output = await controller.search(input);
    expect(mockListUseCase.execute).toHaveBeenCalledWith(input);
    expect(output).toStrictEqual(expectedOutput);
    expect(controller).toBeDefined();
  });
});
