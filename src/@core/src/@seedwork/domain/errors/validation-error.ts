import { FieldsErrors } from "../validators";

export class ValidationError extends Error {}

export default ValidationError;

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors) {
    super("Entity Validation Error");
    this.name = "EntityValidationError";
  }
}
