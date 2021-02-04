import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { getBill_bill } from '../../helpers/types/getBill';
import { EnumPage, makeURL } from '../../helpers/url';

import { BillContext } from './BillContext';
import BillForm from './BillForm';

/**
 * For Update
 */
function BillUpdate(): any {
  const bill = useContext(BillContext) as getBill_bill;

  return (
    <Row className={'mt-2'}>
      <Col>
        <BillForm transaction={bill} urlToGoBack={makeURL(EnumPage.Entry, [bill.id])} />
      </Col>
    </Row>
  );
}

export default BillUpdate;
