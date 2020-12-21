import React from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import DropdownList from "react-widgets/lib/DropdownList";
import styled from "styled-components";

import { getEnums_enums_edges_node } from "../../../helpers/types/getEnums";
import { findById } from "../../../helpers/utils";

interface DropdownListAndClearButtonRowProp {
  listData: getEnums_enums_edges_node[];
  propertyKey: string;
  values: any;
  setFieldValue: any;
  onCreateCallback: (type: string, name: string) => void;
}

const HeaderSpan = styled.span`
    text-transform: capitalize;
    vertical-align: middle;
`;

function DropdownListAndClearButtonRow({
                                         listData,
                                         propertyKey,
                                         values,
                                         setFieldValue,
                                         onCreateCallback
                                       }: DropdownListAndClearButtonRowProp) {
  const value = values[propertyKey];
  const currentObj = value ? findById(listData, value) : null;
  return (
    <>
      <Row>
        <Col>
          <HeaderSpan>{propertyKey}</HeaderSpan>

          <Button variant='link' size='sm' onClick={(e: any) => {
            e.preventDefault();
            setFieldValue(propertyKey, null);
          }}>
            Clear Selection
          </Button>
        </Col>
      </Row>
      <Row className={'mb-2'}>
        <Col>
          <DropdownList
            allowCreate={true}
            data={listData}
            dataKey='id'
            textField='name'
            defaultValue={currentObj}
            value={currentObj}
            onChange={(val: getEnums_enums_edges_node) => {
              setFieldValue(propertyKey, val.id);
            }}
            onCreate={(newName) => {
              newName = newName.trim();
              if (newName.length === 0) {
                return;
              }
              onCreateCallback(propertyKey, newName);
            }}
          />
        </Col>
      </Row>
    </>
  );
}

export default DropdownListAndClearButtonRow;
