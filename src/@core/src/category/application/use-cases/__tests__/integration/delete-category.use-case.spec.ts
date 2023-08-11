import { Category } from "../../../../domain/entities/category";
import DeleteCategoryUseCase from "../../delete-category.use-case";
import EntityNotFoundError from "../../../../../@seedwork/domain/errors/entity-not-found";
import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

describe("DeleteCategoryUseCase Integration Test", () => {
  let categoryRepository: CategorySequelize.CategoryRepository;
  let deleteCategoryUseCase: DeleteCategoryUseCase.UseCase;

  setupSequelize({ models: [CategorySequelize.CategoryModel] });

  beforeEach(() => {
    categoryRepository = new CategorySequelize.CategoryRepository(
      CategorySequelize.CategoryModel
    );
    deleteCategoryUseCase = new DeleteCategoryUseCase.UseCase(
      categoryRepository
    );
  });

  it("should throw an error when entity not found", async () => {
    await expect(() =>
      deleteCategoryUseCase.execute({ id: "fake id" })
    ).rejects.toThrow(
      new EntityNotFoundError(`Entity not found using ID fake id`)
    );
  });

  it("should delete a category", async () => {
    const entity = await CategorySequelize.CategoryModel.factory().create();

    await deleteCategoryUseCase.execute({ id: entity.id });

    const entityFound = await CategorySequelize.CategoryModel.findByPk(
      entity.id
    );
    expect(entityFound).toBeNull();
  });
});
