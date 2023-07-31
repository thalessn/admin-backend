import { EntityValidationError } from "../errors";
import { ClassValidatorField, FieldsErrors } from "../validators";
import { default as Expect } from "expect";

type Expected =
  | { validator: ClassValidatorField<any>; data: any }
  | (() => any);

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    if (typeof expected === "function") {
      try {
        expected();
        return isValid();
      } catch (e) {
        const error = e as EntityValidationError;

        return assertContainsErrorsMessages(error.error, received);
      }
    } else {
      const { validator, data } = expected;
      const validated = expected.validator.validate(expected.data);
      if (validated) {
        isValid();
      }

      return assertContainsErrorsMessages(validator.errors, received);
    }
  },
});

function isValid() {
  return {
    pass: true,
    message: () => "The data is valid",
  };
}

function assertContainsErrorsMessages(
  expected: FieldsErrors,
  received: FieldsErrors
) {
  const isMatch = Expect.objectContaining(received).asymmetricMatch(expected);
  return isMatch
    ? {
        pass: true,
        message: () => "",
      }
    : {
        pass: false,
        message: () =>
          `The validation errors not contains ${JSON.stringify(
            received
          )}. Current: ${JSON.stringify(expected)}`,
      };
}
