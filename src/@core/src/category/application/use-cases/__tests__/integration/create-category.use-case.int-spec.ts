import CreateCategoryUseCase from "../../create-category.use-case";
import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

describe("CreateCategoryUseCase Unit Test", () => {
  let categoryRepository: CategorySequelize.CategoryRepository;
  let createCategoryUseCase: CreateCategoryUseCase.UseCase;

  setupSequelize({ models: [CategorySequelize.CategoryModel] });

  beforeEach(() => {
    categoryRepository = new CategorySequelize.CategoryRepository(
      CategorySequelize.CategoryModel
    );
    createCategoryUseCase = new CreateCategoryUseCase.UseCase(
      categoryRepository
    );
  });

  it("should create a new category", async () => {
    let output = await createCategoryUseCase.execute({ name: "Test" });
    let entity = await categoryRepository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "Test",
      description: null,
      is_active: true,
      created_at: entity.created_at,
    });

    output = await createCategoryUseCase.execute({
      name: "Test",
      description: "some description",
    });
    entity = await categoryRepository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "Test",
      description: "some description",
      is_active: true,
      created_at: entity.created_at,
    });

    output = await createCategoryUseCase.execute({
      name: "Test",
      description: "some description",
      is_active: true,
    });
    entity = await categoryRepository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "Test",
      description: "some description",
      is_active: true,
      created_at: entity.created_at,
    });

    output = await createCategoryUseCase.execute({
      name: "Test",
      description: "some description",
      is_active: false,
    });
    entity = await categoryRepository.findById(output.id);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "Test",
      description: "some description",
      is_active: false,
      created_at: entity.created_at,
    });
  });
});
