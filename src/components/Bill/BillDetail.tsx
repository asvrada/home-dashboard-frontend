import { useMutation } from '@apollo/react-hooks';
import { Button } from '@material-ui/core';
import React, { useContext } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link, useHistory } from 'react-router-dom';

import { DELETE } from '../../helpers/graphql';
import { getBill_bill } from '../../helpers/types/getBill';
import { unpackSummaryFlag } from '../../helpers/utils';
import WrapperContainer from '../Layout/WrapperContainer';

import { BillContext } from './BillContext';

/**
 * For Retrieve and Delete
 */
function BillDetail(): any {
  const bill = useContext(BillContext) as getBill_bill;
  const history = useHistory();
  const [deleteObj] = useMutation(DELETE);

  const id: string = bill.id;
  const {isSkipBudget, isSkipTotal} = unpackSummaryFlag(bill.skipSummaryFlag);

  const handleDelete = () => {
    deleteObj({
      variables: {
        id: id
      }
    }).then(() => {
      history.push('/');
    });
  };

  const componentSummaryFlag = (
    <div>
      <p>Summary Flag:</p>
      {isSkipBudget ? <p>Skip Budget</p> : null}
      {isSkipTotal ? <p>Skip Total</p> : null}
    </div>
  );

  return (
    <WrapperContainer>
      <Row>
        <Col>
          <p>
            {bill.amount}
          </p>
          <p>
            {bill.category && bill.category.name}
          </p>
          <p>{bill.company && bill.company.name}</p>
          <p>{bill.card && bill.card.name}</p>
          <p>{bill.note}</p>

          {componentSummaryFlag}

          <p>{bill.timeCreated}</p>

          <div>
            <Button variant="contained" component={Link} to={'/'}>Back</Button>

            <Button variant="contained" color="primary" component={Link} to={`/detail/${id}/edit/`}>Edit</Button>

            <Button variant="contained" color="secondary"
                    onClick={handleDelete}>Delete</Button>
          </div>
        </Col>
      </Row>
    </WrapperContainer>
  );
}

export default BillDetail;