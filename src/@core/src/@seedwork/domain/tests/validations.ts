import { ClassValidatorField, FieldsErrors } from "../validators";
import { default as Expect } from "expect";

type Expected = { validator: ClassValidatorField<any>; data: any };

expect.extend({
  containsErrorMessages(expected: Expected, received: FieldsErrors) {
    const { validator, data } = expected;
    const isValid = expected.validator.validate(expected.data);
    if (isValid) {
      return {
        pass: true,
        message: () => "Tha data is valid",
      };
    }

    //test.objectContaining(received).asymmetricMatch()
    const isMatch = Expect.objectContaining(received).asymmetricMatch(
      validator.errors
    );
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
            )}. Current: ${JSON.stringify(validator.errors)}`,
        };
  },
});
