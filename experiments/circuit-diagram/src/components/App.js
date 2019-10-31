import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import * as go from 'gojs'
import { ReactDiagram } from 'gojs-react';
import Circuit from './Circuit'
import CircuitPalette from './CircuitPalette'
import '../App.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function App() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <h1>Test</h1>
      <Grid container spacing={3}>
        <Grid item xs={10}>
          <h1>Circuit</h1>
          <Circuit />
        </Grid>
        <Grid item xs={2}>
          <h1>CircuitPalette</h1>
          <CircuitPalette />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
