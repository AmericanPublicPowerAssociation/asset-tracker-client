import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import LeftPane from "./LeftPane";
import RightPane from "./RightPane";

const TheGrid = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <LeftPane />
      </Grid>
      <Grid item xs={2}>
        <RightPane />
      </Grid>
      <Grid item xs={4}>
        Right Pane 2
      </Grid>
    </Grid>
  );
};
export default TheGrid;

