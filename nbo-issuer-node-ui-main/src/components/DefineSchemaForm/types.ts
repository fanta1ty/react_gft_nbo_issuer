export enum SupportedTypeEnum {
  STRING = "String",
  DATE = "String (date)",
  DATE_TIME = "String (date-time)",
  NUMBER = "Number",
  INTEGER = "Integer",
  BOOLEAN = "Boolean",
}

export type FieldType = {
  fieldName: string;
  type: SupportedTypeEnum;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  isRequired: boolean;
};

export type FormDataType = {
  fields: Array<FieldType>;
};
