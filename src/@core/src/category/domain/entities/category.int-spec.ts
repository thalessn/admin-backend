import ValidationError from "#seedwork/domain/errors/validation-error";
import { Category } from "./category";

describe("Category Integrations Tests", () => {
  describe("create method", () => {
    it("should a invalid category using name property", () => {
      expect(() => new Category({ name: null })).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => new Category({ name: "" })).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => new Category({ name: 5 as any })).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(
        () => new Category({ name: "t".repeat(256) })
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should a invalid category using description property", () => {
      expect(
        () => new Category({ name: "name", description: 5 as any })
      ).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should a invalid category using is_active property", () => {
      expect(
        () => new Category({ name: "name", is_active: "" as any })
      ).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
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

      expect(() => category.update(null, null)).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() => category.update("", null)).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() => category.update(5 as any, null)).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() =>
        category.update("test".repeat(256), null)
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    it("should a invalid description using name property", () => {
      let category = new Category({ name: "teste" });
      expect(() => category.update("Test", 5 as any)).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    it("should update a category", () => {
      expect.assertions(0);
      const category = new Category({ name: "Teste" });
      category.update("Teste2", "some description");
      category.update("Teste2", null);
    });
  });
});
