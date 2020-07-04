import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { getBills_bills_edges_node } from "../../../helpers/types/getBills";


const useStyle = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  image: {
    height: "36px",
    width: "36px",
    "border-radius": "36px",
  },
  text: {
    "font-size": "0.8em"
  }
}));

function Category({node}: { node: getBills_bills_edges_node }) {
  const classes = useStyle();

  let componentCategory = null;
  if (node.category !== null) {
    componentCategory = (
      <>
        <img className={classes.image}
             src={process.env.PUBLIC_URL + "/static/test_icon.jpeg"}
             alt="icon for category" />
        <Typography className={classes.text} variant="caption" display="block">
          {node.category.name}
        </Typography>
      </>
    );
  }

  return (
    <Box className={classes.root}>
      {componentCategory}
    </Box>
  );
}

export default Category;