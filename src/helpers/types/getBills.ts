/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getBills
// ====================================================

export interface getBills_bills_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface getBills_bills_edges_node_category_icon {
  __typename: "IconType";
  keyword: string;
}

export interface getBills_bills_edges_node_category {
  __typename: "EnumCategoryType";
  name: string;
  icon: getBills_bills_edges_node_category_icon | null;
}

export interface getBills_bills_edges_node_company_icon {
  __typename: "IconType";
  keyword: string;
}

export interface getBills_bills_edges_node_company {
  __typename: "EnumCategoryType";
  name: string;
  icon: getBills_bills_edges_node_company_icon | null;
}

export interface getBills_bills_edges_node_card_icon {
  __typename: "IconType";
  keyword: string;
}

export interface getBills_bills_edges_node_card {
  __typename: "EnumCategoryType";
  name: string;
  icon: getBills_bills_edges_node_card_icon | null;
}

export interface getBills_bills_edges_node_creator {
  __typename: "RecurringBillType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface getBills_bills_edges_node {
  __typename: "TransactionType";
  /**
   * The ID of the object.
   */
  id: string;
  amount: number;
  category: getBills_bills_edges_node_category | null;
  company: getBills_bills_edges_node_company | null;
  card: getBills_bills_edges_node_card | null;
  note: string | null;
  creator: getBills_bills_edges_node_creator | null;
  skipSummary: boolean;
  timeCreated: any;
}

export interface getBills_bills_edges {
  __typename: "TransactionTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: getBills_bills_edges_node | null;
}

export interface getBills_bills {
  __typename: "TransactionTypeConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: getBills_bills_pageInfo;
  /**
   * Contains the nodes in this connection.
   */
  edges: (getBills_bills_edges | null)[];
}

export interface getBills {
  bills: getBills_bills | null;
}

export interface getBillsVariables {
  cursor?: string | null;
  limit?: number | null;
}
