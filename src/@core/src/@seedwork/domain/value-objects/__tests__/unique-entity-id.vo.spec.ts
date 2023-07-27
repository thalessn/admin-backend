import InvalidUuidError from "../../errors/invalid-uuid-error";
import UniqueEntityId from "../unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

describe("Unique Entity Id", () => {
  const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");

  it("should throw an err if invalid uuid is passed", () => {
    expect(() => new UniqueEntityId("fake uuid")).toThrow(
      new InvalidUuidError()
    );
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a valid uuid as parameter", () => {
    //const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const uuid = "4531d7fa-d4f8-4d2f-9d4f-462137ad2fdb";
    const vo = new UniqueEntityId(uuid);
    expect(vo.id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should generate a valid uuid if the constructor is empty", () => {
    //const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const vo = new UniqueEntityId();
    expect(uuidValidate(vo.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
