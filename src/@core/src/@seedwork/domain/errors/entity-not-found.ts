export class EntityNotFoundError extends Error {
  constructor(message?: string) {
    super(message || "Entity not found");
    this.name = "EntityNotFoundError";
  }
}

export default EntityNotFoundError;
