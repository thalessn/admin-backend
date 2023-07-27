import { FieldsErrors } from "#seedwork/domain";

declare global {
  declare namespace jest {
    interface Matchers<R> {
      containsErrorMessages: (expected: FieldsErrors) => R;
    }
  }
}
