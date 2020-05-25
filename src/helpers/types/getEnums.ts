/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumEnumCategory } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: getEnums
// ====================================================

export interface getEnums_enums_edges_node_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface getEnums_enums_edges_node {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: EnumEnumCategory | null;
  icon: getEnums_enums_edges_node_icon | null;
}

export interface getEnums_enums_edges {
  __typename: "EnumCategoryTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: getEnums_enums_edges_node | null;
}

export interface getEnums_enums {
  __typename: "EnumCategoryTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (getEnums_enums_edges | null)[];
}

export interface getEnums {
  enums: getEnums_enums | null;
}
