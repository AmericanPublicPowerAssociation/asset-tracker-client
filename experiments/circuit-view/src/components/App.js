import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Fab from '@material-ui/core/Fab'
import Grid from '@material-ui/core/Grid'
import Circuit from '../containers/Circuit'
import CircuitPalette from './CircuitPalette'
import Details from '../containers/Details'
import '../App.css';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    height: '100%',
  },
  floatingMenu: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    height: '300px',
    width: '100px',
    zIndex: 2,
  },
  fab: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    background: 'blue',
    '&&:hover': {
      background: 'blue',
    },
    color: 'white',
    zIndex: 2,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function App(props) {
  const classes = useStyles()
  const { togglePalette, palette } = props
  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.grid}>
        <Grid item xs={9}>
          <Circuit />
          <div className={classes.floatingMenu}>
            { palette && <CircuitPalette /> }
            <Fab
              size="large"
              variant="extended"
              aria-label="add"
            className={classes.fab}
            onClick={ () => togglePalette()}>
            Palatte
            </Fab>
          </div>
        </Grid>
        <Grid item xs={3}>
          <h1>Node Details</h1>
          <Details />
        </Grid>
      </Grid>
    </div>
  )
}

export default App
