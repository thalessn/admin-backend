import { Category } from "./category";

describe("Category Tests", () => {
  test("constructor of category", () => {
    // Triple AAA - arrange Act Assert

    //Arrage
    const props = {
      name: "Movie",
      description: "description",
      is_active: true,
      created_at: new Date(),
    };

    // Act
    const category = new Category(props);

    //Assert
    expect(category.name).toBe("Movie");
    expect(category.description).toBe("description");
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBe(props.created_at);
  });
});
