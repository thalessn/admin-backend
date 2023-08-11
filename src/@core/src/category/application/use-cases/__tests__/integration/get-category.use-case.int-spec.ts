import GetCategoryUseCase from "../../get-category.use-case";
import EntityNotFoundError from "../../../../../@seedwork/domain/errors/entity-not-found";
import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

describe("getCategoryUseCase Unit Test", () => {
  let categoryRepository: CategorySequelize.CategoryRepository;
  let getCategoryUseCase: GetCategoryUseCase.UseCase;

  setupSequelize({ models: [CategorySequelize.CategoryModel] });

  beforeEach(() => {
    categoryRepository = new CategorySequelize.CategoryRepository(
      CategorySequelize.CategoryModel
    );
    getCategoryUseCase = new GetCategoryUseCase.UseCase(categoryRepository);
  });

  it("should throw an error when entity not found", async () => {
    await expect(() =>
      getCategoryUseCase.execute({ id: "fake id" })
    ).rejects.toThrow(
      new EntityNotFoundError(`Entity not found using ID fake id`)
    );
  });

  it("should return a category", async () => {
    const entity = await CategorySequelize.CategoryModel.factory().create();

    let output = await getCategoryUseCase.execute({ id: entity.id });
    expect(output).toStrictEqual({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    });
  });
});
