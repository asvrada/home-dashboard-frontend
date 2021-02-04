import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import BillForm from './BillForm';

/**
 * For Create
 */
function BillCreate(): any {
  return (
    <Row className={'mt-2'}>
      <Col>
        <BillForm transaction={undefined} urlToGoBack={'/'} />
      </Col>
    </Row>
  );
}

export default BillCreate;
