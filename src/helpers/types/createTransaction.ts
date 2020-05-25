/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateTransactionInput, EnumEnumCategory } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: createTransaction
// ====================================================

export interface createTransaction_createTransaction_transaction_category_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
  keyword: string;
  path: string;
}

export interface createTransaction_createTransaction_transaction_category {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: EnumEnumCategory | null;
  icon: createTransaction_createTransaction_transaction_category_icon | null;
}

export interface createTransaction_createTransaction_transaction_company_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
  keyword: string;
  path: string;
}

export interface createTransaction_createTransaction_transaction_company {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: EnumEnumCategory | null;
  icon: createTransaction_createTransaction_transaction_company_icon | null;
}

export interface createTransaction_createTransaction_transaction_card_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
  keyword: string;
  path: string;
}

export interface createTransaction_createTransaction_transaction_card {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: EnumEnumCategory | null;
  icon: createTransaction_createTransaction_transaction_card_icon | null;
}

export interface createTransaction_createTransaction_transaction_creator {
  __typename: "RecurringBillType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface createTransaction_createTransaction_transaction {
  __typename: "TransactionType";
  /**
   * The ID of the object.
   */
  id: string;
  amount: number;
  category: createTransaction_createTransaction_transaction_category | null;
  company: createTransaction_createTransaction_transaction_company | null;
  card: createTransaction_createTransaction_transaction_card | null;
  skipSummary: boolean;
  creator: createTransaction_createTransaction_transaction_creator | null;
  note: string | null;
  timeCreated: any;
}

export interface createTransaction_createTransaction {
  __typename: "CreateTransactionPayload";
  transaction: createTransaction_createTransaction_transaction | null;
}

export interface createTransaction {
  createTransaction: createTransaction_createTransaction | null;
}

export interface createTransactionVariables {
  input: CreateTransactionInput;
}
