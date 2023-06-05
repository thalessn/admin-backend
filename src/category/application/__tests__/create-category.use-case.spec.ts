import { Category } from "category/domain/entities/category";
import CategoryInMemoryRepository from "../../infra/repository/category-in-memory.repository";
import CreateCategoryUseCase, { Input } from "../create-category.use-case";

describe("CreateCategoryUseCase Unit Test", () => {
  let categoryRepository: CategoryInMemoryRepository;
  let createCategoryUseCase: CreateCategoryUseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
  });

  it("should create a new category", async () => {
    let spyInsert = jest.spyOn(categoryRepository, "insert");
    let output = await createCategoryUseCase.execute({ name: "Test" });
    expect(spyInsert).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: categoryRepository.items[0].id,
      name: "Test",
      description: null,
      is_active: true,
      created_at: categoryRepository.items[0].created_at,
    });

    output = await createCategoryUseCase.execute({
      name: "Test",
      description: "some description",
      is_active: false,
    });
    expect(spyInsert).toHaveBeenCalledTimes(2);
    expect(output).toStrictEqual({
      id: categoryRepository.items[1].id,
      name: "Test",
      description: "some description",
      is_active: false,
      created_at: categoryRepository.items[1].created_at,
    });
  });
});
