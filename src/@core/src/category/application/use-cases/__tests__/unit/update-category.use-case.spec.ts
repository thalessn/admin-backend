import { Category } from "../../../../domain/entities/category";
import CategoryInMemoryRepository from "../../../../infra/db/in-memory/category-in-memory.repository";
import UpdateCategoryUseCase from "../../update-category.use-case";
import EntityNotFoundError from "../../../../../@seedwork/domain/errors/entity-not-found";

describe("UpdateCategoryUseCase Unit Test", () => {
  let categoryRepository: CategoryInMemoryRepository;
  let updateCategoryUseCase: UpdateCategoryUseCase.UseCase;

  beforeEach(() => {
    categoryRepository = new CategoryInMemoryRepository();
    updateCategoryUseCase = new UpdateCategoryUseCase.UseCase(
      categoryRepository
    );
  });

  it("should throw an error when entity not found", async () => {
    await expect(() =>
      updateCategoryUseCase.execute({ id: "fake id", name: "fake" })
    ).rejects.toThrow(
      new EntityNotFoundError(`Entity not found with id: fake id`)
    );
  });

  it("should update a new category", async () => {
    let spyUpdate = jest.spyOn(categoryRepository, "update");
    const entity = new Category({ name: "Movie" });
    categoryRepository.items = [entity];

    const arrange = [
      {
        entity: {
          id: entity.id,
          name: "Test",
        },
        expected: {
          id: entity.id,
          name: "Test",
          description: null,
          is_active: true,
          created_at: entity.created_at,
        },
      },
      {
        entity: {
          id: entity.id,
          name: "Test",
          description: "some description",
        },
        expected: {
          id: entity.id,
          name: "Test",
          description: "some description",
          is_active: true,
          created_at: entity.created_at,
        },
      },
      {
        entity: {
          id: entity.id,
          name: "Test",
        },
        expected: {
          id: entity.id,
          name: "Test",
          description: null,
          is_active: true,
          created_at: entity.created_at,
        },
      },
      {
        entity: {
          id: entity.id,
          name: "Test",
          is_active: false,
        },
        expected: {
          id: entity.id,
          name: "Test",
          description: null,
          is_active: false,
          created_at: entity.created_at,
        },
      },
      {
        entity: {
          id: entity.id,
          name: "Test",
        },
        expected: {
          id: entity.id,
          name: "Test",
          description: null,
          is_active: false,
          created_at: entity.created_at,
        },
      },
      {
        entity: {
          id: entity.id,
          name: "Test",
          is_active: true,
        },
        expected: {
          id: entity.id,
          name: "Test",
          description: null,
          is_active: true,
          created_at: entity.created_at,
        },
      },
    ];

    for (const param of arrange) {
      let output = await updateCategoryUseCase.execute({
        id: param.entity.id,
        name: param.entity.name,
        description: param.entity.description,
        is_active: param.entity.is_active,
      });
      expect(output).toStrictEqual({
        id: param.expected.id,
        name: param.expected.name,
        description: param.expected.description,
        is_active: param.expected.is_active,
        created_at: param.expected.created_at,
      });
    }
  });
});
