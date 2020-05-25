/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumEnumCategory } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: getBill
// ====================================================

export interface getBill_bill_category_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
  path: string;
  keyword: string;
}

export interface getBill_bill_category {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  icon: getBill_bill_category_icon | null;
  name: string;
  category: EnumEnumCategory | null;
}

export interface getBill_bill_company_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
  path: string;
  keyword: string;
}

export interface getBill_bill_company {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  icon: getBill_bill_company_icon | null;
  name: string;
  category: EnumEnumCategory | null;
}

export interface getBill_bill_card_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
  path: string;
  keyword: string;
}

export interface getBill_bill_card {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  icon: getBill_bill_card_icon | null;
  name: string;
  category: EnumEnumCategory | null;
}

export interface getBill_bill_creator {
  __typename: "RecurringBillType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface getBill_bill {
  __typename: "TransactionType";
  /**
   * The ID of the object.
   */
  id: string;
  amount: number;
  category: getBill_bill_category | null;
  company: getBill_bill_company | null;
  card: getBill_bill_card | null;
  note: string | null;
  creator: getBill_bill_creator | null;
  skipSummary: boolean;
  timeCreated: any;
}

export interface getBill {
  /**
   * The ID of the object
   */
  bill: getBill_bill | null;
}

export interface getBillVariables {
  id: string;
}
