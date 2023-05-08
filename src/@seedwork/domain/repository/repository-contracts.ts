import Entity from "../entity/entity";
export interface RepositoryInterface<Entity> {
  insert(entity: Entity): Promise<void>;
  findById(id: string): Promise<Entity>;
  findAll(): Promise<Entity[]>;
  update(entity: Entity): Promise<void>;
  delete(id: string): Promise<void>;
}
