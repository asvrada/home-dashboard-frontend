/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getAllEnums
// ====================================================

export interface getAllEnums_enumCat_edges_node_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface getAllEnums_enumCat_edges_node {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  countBill: number | null;
  icon: getAllEnums_enumCat_edges_node_icon | null;
}

export interface getAllEnums_enumCat_edges {
  __typename: "EnumCategoryTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: getAllEnums_enumCat_edges_node | null;
}

export interface getAllEnums_enumCat {
  __typename: "EnumCategoryTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (getAllEnums_enumCat_edges | null)[];
}

export interface getAllEnums_enumCom_edges_node_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface getAllEnums_enumCom_edges_node {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  countBill: number | null;
  icon: getAllEnums_enumCom_edges_node_icon | null;
}

export interface getAllEnums_enumCom_edges {
  __typename: "EnumCategoryTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: getAllEnums_enumCom_edges_node | null;
}

export interface getAllEnums_enumCom {
  __typename: "EnumCategoryTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (getAllEnums_enumCom_edges | null)[];
}

export interface getAllEnums_enumCar_edges_node_icon {
  __typename: "IconType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface getAllEnums_enumCar_edges_node {
  __typename: "EnumCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  countBill: number | null;
  icon: getAllEnums_enumCar_edges_node_icon | null;
}

export interface getAllEnums_enumCar_edges {
  __typename: "EnumCategoryTypeEdge";
  /**
   * The item at the end of the edge
   */
  node: getAllEnums_enumCar_edges_node | null;
}

export interface getAllEnums_enumCar {
  __typename: "EnumCategoryTypeConnection";
  /**
   * Contains the nodes in this connection.
   */
  edges: (getAllEnums_enumCar_edges | null)[];
}

export interface getAllEnums {
  enumCat: getAllEnums_enumCat | null;
  enumCom: getAllEnums_enumCom | null;
  enumCar: getAllEnums_enumCar | null;
}
