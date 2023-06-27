import { Category } from "../../domain/entities/category";
import CategoryInMemoryRepository from "../../infra/repository/category-in-memory.repository";
import DeleteCategoryUseCase, { Input } from "../delete-category.use-case";
import EntityNotFoundError from "../../../@seedwork/errors/entity-not-found";

describe("DeleteCategoryUseCase Unit Test", () => {
  let categoryRepository: CategoryInMemoryRepository;
  let deleteCategoryUseCase: DeleteCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);
  });

  it("should throw an error when entity not found", async () => {
    expect(() =>
      deleteCategoryUseCase.execute({ id: "fake id" })
    ).rejects.toThrow(
      new EntityNotFoundError(`Entity not found with id: fake id`)
    );
  });

  it("should delete a category", async () => {
    let spyDelete = jest.spyOn(categoryRepository, "delete");
    const entity = new Category({ name: "Movie" });
    categoryRepository.items = [entity];

    await deleteCategoryUseCase.execute({ id: entity.id });

    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(categoryRepository.items).toHaveLength(0);
  });
});
