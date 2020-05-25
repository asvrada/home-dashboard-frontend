/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateTransactionInput, EnumEnumCategory } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL mutation operation: updateTransaction
// ====================================================

export interface updateTransaction_updateTransaction_transaction_category_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
  keyword: string;
  path: string;
}

export interface updateTransaction_updateTransaction_transaction_category {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: EnumEnumCategory | null;
  icon: updateTransaction_updateTransaction_transaction_category_icon | null;
}

export interface updateTransaction_updateTransaction_transaction_company_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
  keyword: string;
  path: string;
}

export interface updateTransaction_updateTransaction_transaction_company {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: EnumEnumCategory | null;
  icon: updateTransaction_updateTransaction_transaction_company_icon | null;
}

export interface updateTransaction_updateTransaction_transaction_card_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
  keyword: string;
  path: string;
}

export interface updateTransaction_updateTransaction_transaction_card {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: EnumEnumCategory | null;
  icon: updateTransaction_updateTransaction_transaction_card_icon | null;
}

export interface updateTransaction_updateTransaction_transaction_creator {
  __typename: "RecurringBillType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface updateTransaction_updateTransaction_transaction {
  __typename: "TransactionType";
  /**
   * The ID of the object.
   */
  id: string;
  amount: number;
  category: updateTransaction_updateTransaction_transaction_category | null;
  company: updateTransaction_updateTransaction_transaction_company | null;
  card: updateTransaction_updateTransaction_transaction_card | null;
  skipSummary: boolean;
  creator: updateTransaction_updateTransaction_transaction_creator | null;
  note: string | null;
  timeCreated: any;
}

export interface updateTransaction_updateTransaction {
  __typename: "UpdateTransactionPayload";
  transaction: updateTransaction_updateTransaction_transaction | null;
}

export interface updateTransaction {
  updateTransaction: updateTransaction_updateTransaction | null;
}

export interface updateTransactionVariables {
  input: UpdateTransactionInput;
}
