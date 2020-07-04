import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { getBills_bills_edges_node } from "../../../helpers/types/getBills";

const useStyle = makeStyles((theme) => ({
  box: {
  },
  otherIcon: {
    height: "36px",
    width: "36px",
    "border-radius": "36px",
  },
  text: {}
}));

function RowTemplate({name}: { name: string }) {
  const classes = useStyle();

  return (
    <Grid container className={classes.box} alignItems="center">
      <Grid item xs={4}>
        <Box textAlign={"right"}>
          <img className={classes.otherIcon}
               src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
               alt="icon" />
        </Box>
      </Grid>

      <Grid item xs={8}>
        <Box ml={1}>
          <Typography variant="caption" display="block">{name}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

function CompanyAndCard({node}: { node: getBills_bills_edges_node }) {
  const componentCompany = node.company ? (
    <RowTemplate name={node.company.name} />
  ) : null;
  const componentCard = node.card ? (
    <RowTemplate name={node.card.name} />
  ) : null;

  return (
    <Box>
      {componentCompany}
      {componentCard}
    </Box>
  );
}

export default CompanyAndCard;
