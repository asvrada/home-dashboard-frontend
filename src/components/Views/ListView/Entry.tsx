import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { getBills_bills_edges_node } from "../../../helpers/types/getBills";

import { formatCurrency } from "../../../helpers/utils";
import Category from "./Category";
import CompanyAndCard from "./CompanyAndCard";

function NaturalCurrency({amount}: any) {
  amount = Math.abs(amount);
  const strAmount = formatCurrency(amount);

  return (
    <Typography className="amount">
      <span className="dollar-sign">$</span>
      <span>{strAmount[0]}</span>
      <span>.</span>
      <span className="amount-decimal">{strAmount[1]}</span>
    </Typography>
  );
}

/**
 * Display a single entry of log
 */
function Entry({isIncome, node}: { isIncome: boolean, node: getBills_bills_edges_node }) {
  const history = useHistory();

  const componentNote = node.note
    ? (
      <Grid item xs={12}>
        <Typography>{isIncome ? "+" : "-"} {node.note}</Typography>
      </Grid>
    )
    : null;

  return (
    <Box onClick={() => history.push(`/detail/${node.id}/`)}>
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={3}>
          <Category node={node} />
        </Grid>
        {/* Amount and Note */}

        <Grid item xs={5}>
          <Grid container alignItems="center">
            <Grid item xs={12}>
              <NaturalCurrency amount={node.amount} />
            </Grid>
            {componentNote}
          </Grid>
        </Grid>

        <Grid item xs={4}>
          <CompanyAndCard node={node} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Entry;
