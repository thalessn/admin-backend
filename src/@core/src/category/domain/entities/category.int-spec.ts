import ValidationError from "#seedwork/domain/errors/validation-error";
import { Category } from "./category";

describe("Category Integrations Tests", () => {
  describe("create method", () => {
    it("should a invalid category using name property", () => {
      expect(() => new Category({ name: null })).toThrow(
        new ValidationError("The name is required")
      );

      expect(() => new Category({ name: "" })).toThrow(
        new ValidationError("The name is required")
      );

      expect(() => new Category({ name: 5 as any })).toThrow(
        new ValidationError("The name must be a string")
      );

      expect(() => new Category({ name: "t".repeat(256) })).toThrow(
        new ValidationError(
          "The name must be less or equal than 255 characters"
        )
      );
    });

    it("should a invalid description using name property", () => {
      expect(
        () => new Category({ name: "name", description: 5 as any })
      ).toThrow(new ValidationError("The description must be a string"));
    });

    it("should a invalid is_active using name property", () => {
      expect(
        () => new Category({ name: "name", is_active: "" as any })
      ).toThrow(new ValidationError("The is_active must be a boolean"));
    });

    it("should create a valid category", () => {
      expect.assertions(0);
      new Category({ name: "Teste" }); //NOSONAR
      new Category({ name: "Teste", description: "some description" }); //NOSONAR
      new Category({ name: "Teste", description: null }); //NOSONAR
      /* NOSONAR */ new Category({
        name: "Teste",
        description: "some description",
        is_active: false,
      });
      /* NOSONAR */ new Category({
        name: "Teste",
        description: "some description",
        is_active: true,
      });
    });
  });

  describe("update method", () => {
    it("should a invalid category using name property", () => {
      let category = new Category({ name: "teste" });
      expect(() => category.update(null, null)).toThrow(
        new ValidationError("The name is required")
      );

      expect(() => category.update("", null)).toThrow(
        new ValidationError("The name is required")
      );

      expect(() => category.update(5 as any, null)).toThrow(
        new ValidationError("The name must be a string")
      );

      expect(() => category.update("a".repeat(256), null)).toThrow(
        new ValidationError(
          "The name must be less or equal than 255 characters"
        )
      );
    });

    it("should a invalid description using name property", () => {
      let category = new Category({ name: "teste" });
      expect(() => category.update("Teste1", 5 as any)).toThrow(
        new ValidationError("The description must be a string")
      );
    });

    it("should update a category", () => {
      expect.assertions(0);
      const category = new Category({ name: "Teste" });
      category.update("Teste2", "some description");
      category.update("Teste2", null);
    });
  });
});
