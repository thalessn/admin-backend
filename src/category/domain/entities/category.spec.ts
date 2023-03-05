import { Category } from "./category";

describe("Category Tests", () => {
  test("constructor of category", () => {
    const category = new Category("teste");

    expect(category.name).toBe("teste");
  });
});
