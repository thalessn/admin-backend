import { CategorySequelize } from "./category-sequelize";
import { LoadEntityError, UniqueEntityId } from "#seedwork/domain";
import { Category } from "#category/domain";
import { setupSequelize } from "../../../../@seedwork/infra/testing/helpers/db";

const { CategoryModel, CategoryModelMapper } = CategorySequelize;

describe("Category Model Mapper Test", () => {
  setupSequelize({ models: [CategoryModel] });

  it("should throw error when category is invalid", () => {
    const model = CategoryModel.build({
      id: "4531d7fa-d4f8-4d2f-9d4f-462137ad2fdb",
    });
    try {
      CategoryModelMapper.toEntity(model);
      fail("The category is valid, but must throw a LoadEntityError");
    } catch (e) {
      expect(e).toBeInstanceOf(LoadEntityError);
      expect(e.error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    }
  });

  it("should throw a generic error", () => {
    const error = new Error("Generic Error");
    const spyValidate = jest
      .spyOn(Category, "validate")
      .mockImplementation(() => {
        throw error;
      });
    const model = CategoryModel.build({
      id: "4531d7fa-d4f8-4d2f-9d4f-462137ad2fdb",
    });
    expect(() => CategoryModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalled();
    spyValidate.mockRestore();
  });

  it("should covert a category model to a category entity", () => {
    const created_at = new Date();
    const model = CategoryModel.build({
      id: "4531d7fa-d4f8-4d2f-9d4f-462137ad2fdb",
      name: "some value",
      description: "some description",
      is_active: true,
      created_at,
    });

    const entity = CategoryModelMapper.toEntity(model);
    expect(entity.toJSON()).toStrictEqual(
      new Category(
        {
          name: "some value",
          description: "some description",
          is_active: true,
          created_at,
        },
        new UniqueEntityId("4531d7fa-d4f8-4d2f-9d4f-462137ad2fdb")
      ).toJSON()
    );
  });
});
