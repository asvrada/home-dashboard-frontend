/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum EnumEnumCategory {
  Card = "Card",
  Category = "Category",
  Company = "Company",
  NULL = "NULL",
}

export interface CreateTransactionInput {
  amount: number;
  category?: string | null;
  company?: string | null;
  card?: string | null;
  note?: string | null;
  skipSummary?: boolean | null;
  timeCreated?: string | null;
  clientMutationId?: string | null;
}

export interface UpdateTransactionInput {
  id: string;
  amount?: number | null;
  category?: string | null;
  company?: string | null;
  card?: string | null;
  note?: string | null;
  skipSummary?: boolean | null;
  timeCreated?: string | null;
  clientMutationId?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
