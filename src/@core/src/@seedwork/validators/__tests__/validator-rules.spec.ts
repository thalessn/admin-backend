import ValidationError from "#seedwork/errors/validation-error";
import ValidatorRules from "../validator-rules";

type Values = {
  value: any;
  property: string;
};

type ExpectedRule = {
  value: any;
  property: string;
  rule: keyof ValidatorRules;
  error: ValidationError;
  params?: any;
};

function runRule({
  value,
  property,
  rule,
  params = [],
}: Omit<ExpectedRule, "error">) {
  const validator = ValidatorRules.values(value, property);
  const method = validator[rule];
  method.apply(validator, params);
}

function assertIsInvalid(expectedRule: ExpectedRule) {
  expect(() => {
    runRule(expectedRule);
  }).toThrow(expectedRule.error);
}

function assertIsValid(expectedRule: ExpectedRule) {
  expect(() => {
    runRule(expectedRule);
  }).not.toThrow(expectedRule.error);
}

describe("Validator Rules Unit Tests", () => {
  test("value method", () => {
    const validator = ValidatorRules.values("some value", "field");
    expect(validator).toBeInstanceOf(ValidatorRules);
    expect(validator["value"]).toBe("some value");
    expect(validator["property"]).toBe("field");
  });

  test("required validation rule", () => {
    const arrangeInvalidValues: Values[] = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: "", property: "field" },
    ];

    const error = new ValidationError("The field is required");
    arrangeInvalidValues.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "required",
        error,
      });
    });

    const arrangeValidValues: Values[] = [
      { value: "test", property: "field" },
      { value: 5, property: "field" },
      { value: 0, property: "field" },
    ];

    arrangeValidValues.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error,
      });
    });
  });

  test("string validation rule", () => {
    const arrangeInvalidValues: Values[] = [
      { value: 5, property: "field" },
      { value: {}, property: "field" },
      { value: false, property: "field" },
    ];

    const error = new ValidationError("The field must be a string");
    arrangeInvalidValues.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "string",
        error,
      });
    });

    const arrangeValidValues: Values[] = [
      { value: undefined, property: "field" },
      { value: null, property: "field" },
      { value: "test", property: "field" },
    ];
    arrangeValidValues.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error,
      });
    });
  });

  test("maxlength validation rule", () => {
    const arrangeInvalidValues: Values[] = [
      { value: "aaaaaa", property: "field" },
    ];

    const error = new ValidationError(
      "The field must be less or equal than 5 characters"
    );
    arrangeInvalidValues.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "maxLength",
        error,
        params: [5],
      });
    });

    const arrangeValidValues: Values[] = [
      { value: undefined, property: "field" },
      { value: null, property: "field" },
      { value: "aaaaa", property: "field" },
    ];
    arrangeValidValues.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "required",
        error,
        params: [5],
      });
    });
  });

  test("boolean validation rule", () => {
    const arrangeInvalidValues: Values[] = [
      { value: 5, property: "field" },
      { value: "true", property: "field" },
      { value: "false", property: "field" },
      { value: "True", property: "field" },
      { value: "False", property: "field" },
    ];

    const error = new ValidationError("The field must be a boolean");
    arrangeInvalidValues.forEach((item) => {
      assertIsInvalid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error,
      });
    });

    const arrangeValidValues: Values[] = [
      { value: null, property: "field" },
      { value: undefined, property: "field" },
      { value: true, property: "field" },
      { value: false, property: "field" },
    ];

    arrangeValidValues.forEach((item) => {
      assertIsValid({
        value: item.value,
        property: item.property,
        rule: "boolean",
        error,
        params: [5],
      });
    });
  });

  it("should throw a validation error when combine tow or more validation", () => {
    let validator = new ValidatorRules(null, "field");
    expect(() => validator.required().string()).toThrow(
      new ValidationError("The field is required")
    );

    validator = new ValidatorRules(5, "field");
    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError("The field must be a string")
    );

    validator = new ValidatorRules("aaaaaa", "field");
    expect(() => validator.required().string().maxLength(5)).toThrow(
      new ValidationError("The field must be less or equal than 5 characters")
    );

    validator = new ValidatorRules(null, "field");
    expect(() => validator.required().boolean).toThrow(
      new ValidationError("The field is required")
    );

    validator = new ValidatorRules(5, "field");
    expect(() => validator.boolean()).toThrow(
      new ValidationError("The field must be a boolean")
    );
  });

  it("should valid when combine two or more validation rules", () => {
    expect.assertions(0);
    ValidatorRules.values("test", "field").required().string();
    ValidatorRules.values("aaaaa", "field").required().string().maxLength(5);

    ValidatorRules.values(true, "field").required().boolean();
    ValidatorRules.values(false, "field").required().boolean();
  });
});
