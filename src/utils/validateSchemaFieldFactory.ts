import type { AnyObject, Maybe, ObjectSchema } from "yup";

/**
 * A factory function that generates a field validation function based on the provided schema and field name.
 *
 * @param {ObjectSchema<T>} schema - the schema to validate against
 * @param {keyof T} fieldName - the name of the field to validate
 * @return {function} a function that takes a value and returns a Promise that resolves to true if the value is valid, or rejects with an error message
 */
const validateSchemaFieldFactory = <T extends Maybe<AnyObject>>(
  schema: ObjectSchema<T>,
  fieldName: keyof T,
) => {
  return function (value: unknown) {
    return schema
      .pick([fieldName])
      .validate({ [fieldName]: value })
      .then(() => true)
      .catch((e) => e.message);
  };
};

export default validateSchemaFieldFactory;
