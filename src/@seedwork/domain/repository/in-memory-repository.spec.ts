import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import InMemoryRepository from "./in-memory-repository";

type StubProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubProps> {}

class SubInMemoryRepository extends InMemoryRepository<Entity> {}

describe("InmemoryRepository Unit Test", () => {
  let repository: SubInMemoryRepository;

  beforeEach(() => (repository = new SubInMemoryRepository()));

  it("should insert a new entity", async () => {
    const entity = new StubEntity({ name: "Teste", price: 10 });
    await repository.insert(entity);
    expect(repository.items[0].toJSON()).toEqual(entity.toJSON);
  });

  it("should return a error if entity not found", async () => {
    const id = "invalid Id";
    expect(() => repository.findById(id)).rejects.toThrow();

    const uniqueEntityId = new UniqueEntityId(
      "97576a70-ef53-4dc3-ae2e-1b25b26deb8f"
    );
    expect(() => repository.findById(uniqueEntityId)).rejects.toThrow(
      "Entity not found with id: 97576a70-ef53-4dc3-ae2e-1b25b26deb8f"
    );
  });

  it("should return all entities", async () => {
    const entity = new StubEntity({ name: "Teste", price: 10 });
    await repository.insert(entity);

    let entitiesFound = await repository.findAll();
    expect(entitiesFound).toHaveLength(1);
    expect(entitiesFound[0].toJSON()).toStrictEqual(entity.toJSON());
  });

  it("should throw an error if entity not found", async () => {
    const entity = new StubEntity({ name: "Teste", price: 10 });
    expect(() => repository.update(entity)).rejects.toThrow(
      `Entity not found with id: ${entity.id}`
    );
  });

  it("should throw an error if entity not found", async () => {
    const id = "invalid Id";
    expect(() => repository.delete(id)).rejects.toThrow();

    const uniqueEntityId = new UniqueEntityId(
      "97576a70-ef53-4dc3-ae2e-1b25b26deb8f"
    );
    expect(() => repository.delete(uniqueEntityId.value)).rejects.toThrow(
      "Entity not found with id: 97576a70-ef53-4dc3-ae2e-1b25b26deb8f"
    );
  });

  it("should update an entity", async () => {
    const entity = new StubEntity({ name: "Teste", price: 10 });
    await repository.insert(entity);

    let updatedEntity = new StubEntity(
      { name: "updatedName", price: 1 },
      entity.uniqueEntityId
    );
    await repository.update(updatedEntity);

    let entityFound = await repository.findById(entity.id);
    expect(entityFound.toJSON()).toStrictEqual(updatedEntity.toJSON());
  });

  it("should delete an entity by id", async () => {
    let entity = new StubEntity({ name: "Teste", price: 10 });
    await repository.insert(entity);

    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);

    await repository.insert(entity);
    await repository.delete(entity.uniqueEntityId);
    expect(repository.items).toHaveLength(0);
  });
});
