import { Sequelize } from "sequelize-typescript";
import { CategoryModel } from "./category-model";

describe("CategoryModel Unit Tests", () => {
  let sequelize: Sequelize;

  beforeAll(
    () =>
      (sequelize = new Sequelize({
        dialect: "sqlite",
        host: ":memory:",
        logging: false,
        models: [CategoryModel],
      }))
  );

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("create", async () => {
    const arrange = {
      id: "0d379d08-996b-4ffa-a44e-eb7f1a6d623c",
      name: "test",
      is_active: true,
      created_at: new Date(),
    };
    const category = await CategoryModel.create(arrange);
    expect(category.toJSON()).toStrictEqual(arrange);
  });
});
