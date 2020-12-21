import React from "react";
import { Col, Row } from "react-bootstrap";
import DropdownList from "react-widgets/lib/DropdownList";
import { getEnums_enums_edges_node } from "../../../helpers/types/getEnums";
import { findById } from "../../../helpers/utils";

interface DropdownListAndClearButtonRowProp {
  listData: getEnums_enums_edges_node[];
  propertyKey: string;
  values: any;
  setFieldValue: any;
  onCreateCallback: (type: string, name: string) => void;
}

function DropdownListAndClearButtonRow({
                                         listData,
                                         propertyKey,
                                         values,
                                         setFieldValue,
                                         onCreateCallback
                                       }: DropdownListAndClearButtonRowProp) {
  const value = values[propertyKey];
  return (
    <Row>
      <Col>
        <DropdownList
          allowCreate={true}
          data={listData}
          dataKey='id'
          textField='name'
          defaultValue={value ? findById(listData, value) : null}
          value={value ? findById(listData, value) : null}
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
      <Col>
        <button onClick={(e) => {
          e.preventDefault();
          setFieldValue(propertyKey, null);
        }}>
          x
        </button>
      </Col>
    </Row>
  );
}

export default DropdownListAndClearButtonRow;
