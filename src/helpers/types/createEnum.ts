/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEnumInput, EnumEnumCategory } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: createEnum
// ====================================================

export interface createEnum_createEnum_enum {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: EnumEnumCategory | null;
}

export interface createEnum_createEnum {
  __typename: "CreateEnumPayload";
  enum: createEnum_createEnum_enum | null;
}

export interface createEnum {
  createEnum: createEnum_createEnum | null;
}

export interface createEnumVariables {
  input: CreateEnumInput;
}
