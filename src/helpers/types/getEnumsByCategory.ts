/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EnumEnumCategory } from "./../../types/graphql-global-types";

// ====================================================
// GraphQL query operation: getEnumsByCategory
// ====================================================

export interface getEnumsByCategory_enums_edges_node_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface getEnumsByCategory_enums_edges_node {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  category: EnumEnumCategory | null;
  icon: getEnumsByCategory_enums_edges_node_icon | null;
}

export interface getEnumsByCategory_enums_edges {
  __typename: "EnumCategoryTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: getEnumsByCategory_enums_edges_node | null;
}

export interface getEnumsByCategory_enums {
  __typename: "EnumCategoryTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (getEnumsByCategory_enums_edges | null)[];
}

export interface getEnumsByCategory {
  enums: getEnumsByCategory_enums | null;
}

export interface getEnumsByCategoryVariables {
  category?: string | null;
}
