import Entity from "./entity";

class StubEntity extends Entity<{ prop1: string; prop2: string }> {}

describe("Entity Tests", () => {
  it("should set id and props", () => {
    const arrange = { prop1: "value1", prop2: "value2" };
    const entity = new StubEntity(arrange);
    expect(entity.props).toStrictEqual(arrange);
  });
});
