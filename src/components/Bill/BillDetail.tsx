import { useMutation } from "@apollo/react-hooks";
import { Button, Grid } from "@material-ui/core";
import React, { useContext } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useHistory } from "react-router-dom";

import { DELETE } from "../../helpers/graphql";
import { getBill_bill } from "../../helpers/types/getBill";
import { unpackSummaryFlag } from "../../helpers/utils";

import { BillContext } from "./BillContext";

/**
 * For Retrieve and Delete
 */
function BillDetail() {
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
    }).then(res => {
      console.log("Response", res);
      history.push("/");
    });
  };

  const componentSummaryFlag = (
    <div>
      <div>Summary Flag:</div>
      {isSkipBudget ? <div>Skip Budget</div> : null}
      {isSkipTotal ? <div>Skip Total</div> : null}
    </div>
  );

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <div>
          {bill.amount}
        </div>
        <div>
          {bill.category && bill.category.name}
        </div>
        <div>{bill.company && bill.company.name}</div>
        <div>{bill.card && bill.card.name}</div>
        <div>{bill.note}</div>

        {componentSummaryFlag}

        <p>{bill.timeCreated}</p>
      </Grid>

      <Grid item xs={12}>
        <LinkContainer to="/">
          <Button variant="contained">Back</Button>
        </LinkContainer>

        <LinkContainer to={`/detail/${id}/edit/`}>
          <Button variant="contained">Edit</Button>
        </LinkContainer>

        <Button variant="contained" onClick={handleDelete}>Delete</Button>
      </Grid>
    </Grid>
  );
}

export default BillDetail;