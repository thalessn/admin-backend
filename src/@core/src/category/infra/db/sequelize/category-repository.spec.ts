import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category-model";
import { Category } from "#category/domain";
import { CategorySequelizeRepository } from "./category-repository";
import EntityNotFoundError from "#seedwork/domain/errors/entity-not-found";
import { UniqueEntityId } from "#seedwork/domain";
import { setupSequelize } from "../../../../@seedwork/infra/testing/helpers/db";

describe("CategoryRepository Test", () => {
  setupSequelize({ models: [CategoryModel] });
  let repository: CategorySequelizeRepository;

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  it("should insert a new category", async () => {
    let category = new Category({ name: "Movie" });
    await repository.insert(category);
    let model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJSON());

    category = new Category({
      name: "Movie",
      description: "some description",
      is_active: false,
    });
    await repository.insert(category);
    model = await CategoryModel.findByPk(category.id);
    expect(model.toJSON()).toStrictEqual(category.toJSON());
  });

  it("should throw error when entity not found", async () => {
    await expect(repository.findById("fake id")).rejects.toThrow(
      new EntityNotFoundError("Entity not found using ID fake id")
    );

    await expect(
      repository.findById(
        new UniqueEntityId("97576a70-ef53-4dc3-ae2e-1b25b26deb8f")
      )
    ).rejects.toThrow(
      new EntityNotFoundError(
        "Entity not found using ID 97576a70-ef53-4dc3-ae2e-1b25b26deb8f"
      )
    );
  });

  it("should finds a category by id", async () => {
    const entity = new Category({ name: "Movie" });
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());

    entityFound = await repository.findById(entity.uniqueEntityId);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should return all categories", async () => {
    const entity = new Category({ name: "test" });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity]));
  });

  it("search", async () => {
    await CategoryModel.factory().create();
    console.log(await CategoryModel.findAll());
  });
});
