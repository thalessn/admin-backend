import UniqueEntityId from "#seedwork/domain/value-objects/unique-entity-id.vo";
import { Category, CategoryProperties } from "./category";
import { omit } from "lodash";

describe("Category Tests", () => {
  test("constructor of category", () => {
    let category = new Category({ name: "Movie" });
    let props = omit(category.props, "created_at");
    expect(props).toStrictEqual({
      name: "Movie",
      description: null,
      is_active: true,
    });
    expect(category.props.created_at).toBeInstanceOf(Date);

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
    });
    let created_at = new Date();
    expect(category.props).toStrictEqual({
      name: "Movie",
      description: "some description",
      is_active: false,
      created_at,
    });

    category = new Category({
      name: "Movie",
      description: "other description",
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      description: "other description",
    });

    category = new Category({
      name: "Movie",
      is_active: true,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      is_active: true,
    });

    created_at = new Date();
    category = new Category({
      name: "Movie",
      created_at,
    });
    expect(category.props).toMatchObject({
      name: "Movie",
      created_at,
    });
  });

  test("id field", () => {
    type CategoryData = { props: CategoryProperties; id?: UniqueEntityId };
    const data: CategoryData[] = [
      { props: { name: "Movie" } },
      { props: { name: "Movie" }, id: null },
      { props: { name: "Movie" }, id: undefined },
      {
        props: { name: "Movie" },
        id: new UniqueEntityId("0d379d08-996b-4ffa-a44e-eb7f1a6d623c"),
      },
    ];

    data.forEach((i) => {
      const category = new Category(i.props, i.id);
      expect(category.uniqueEntityId).not.toBeNull();
      expect(category.uniqueEntityId).toBeInstanceOf(UniqueEntityId);
    });
  });

  it("should update description and name value", () => {
    const category = new Category({
      name: "Teste",
      description: "Test_description",
    });
    expect(category.name).toBe("Teste");
    expect(category.description).toBe("Test_description");

    category.update("Updated_Name", "Updated_Description");
    expect(category.name).toBe("Updated_Name");
    expect(category.description).toBe("Updated_Description");
  });

  it("should activate and desativate the category", () => {
    const category = new Category({
      name: "Teste",
      description: "Test_description",
    });
    expect(category.is_active).toBeTruthy();
    category.deactivate();
    expect(category.is_active).toBeFalsy();
    category.activate();
    expect(category.is_active).toBeTruthy();
  });
});
