import UpdateCategoryUseCase from "../../update-category.use-case";
import EntityNotFoundError from "../../../../../@seedwork/domain/errors/entity-not-found";
import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

describe("UpdateCategoryUseCase Unit Test", () => {
  let categoryRepository: CategorySequelize.CategoryRepository;
  let updateCategoryUseCase: UpdateCategoryUseCase.UseCase;

  setupSequelize({ models: [CategorySequelize.CategoryModel] });

  beforeEach(() => {
    categoryRepository = new CategorySequelize.CategoryRepository(
      CategorySequelize.CategoryModel
    );
    updateCategoryUseCase = new UpdateCategoryUseCase.UseCase(
      categoryRepository
    );
  });

  it("should throw an error when entity not found", async () => {
    await expect(() =>
      updateCategoryUseCase.execute({ id: "fake id", name: "fake" })
    ).rejects.toThrow(
      new EntityNotFoundError(`Entity not found using ID fake id`)
    );
  });

  it("should update a new category", async () => {
    const entity = await CategorySequelize.CategoryModel.factory().create();

    let output = await updateCategoryUseCase.execute({
      id: entity.id,
      name: "test",
    });
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: null,
      is_active: true,
      created_at: entity.created_at,
    });

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
          is_active: entity.is_active,
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
          is_active: entity.is_active,
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
          is_active: entity.is_active,
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
