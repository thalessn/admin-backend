import { Category } from "../../../../domain/entities/category";
import CategoryInMemoryRepository from "../../../../infra/db/in-memory/category-in-memory.repository";
import GetCategoryUseCase from "../../get-category.use-case";
import EntityNotFoundError from "../../../../../@seedwork/domain/errors/entity-not-found";

describe("getCategoryUseCase Unit Test", () => {
  let categoryRepository: CategoryInMemoryRepository;
  let getCategoryUseCase: GetCategoryUseCase.UseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    getCategoryUseCase = new GetCategoryUseCase.UseCase(categoryRepository);
  });

  it("should throw an error when entity not found", async () => {
    await expect(() =>
      getCategoryUseCase.execute({ id: "fake id" })
    ).rejects.toThrow(
      new EntityNotFoundError(`Entity not found with id: fake id`)
    );
  });

  it("should return a category", async () => {
    const items = [new Category({ name: "Movie" })];
    categoryRepository.items = items;

    let spyFindById = jest.spyOn(categoryRepository, "findById");
    let output = await getCategoryUseCase.execute({ id: items[0].id });
    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].id,
      name: "Movie",
      description: null,
      is_active: true,
      created_at: categoryRepository.items[0].created_at,
    });
  });
});
