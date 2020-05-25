/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumEnumCategory } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: getEnum
// ====================================================

export interface getEnum_enums_edges_node_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface getEnum_enums_edges_node {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: EnumEnumCategory | null;
  icon: getEnum_enums_edges_node_icon | null;
}

export interface getEnum_enums_edges {
  __typename: "EnumCategoryTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: getEnum_enums_edges_node | null;
}

export interface getEnum_enums {
  __typename: "EnumCategoryTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (getEnum_enums_edges | null)[];
}

export interface getEnum {
  enums: getEnum_enums | null;
}
