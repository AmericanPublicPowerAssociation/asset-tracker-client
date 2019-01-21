import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Navigation from './Navigation'
import MapPage from './MapPage'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    padding: theme.spacing.unit * 3,
  },
})

const App = props => {
  const { classes } = props
  return (
    <React.Fragment>
      <CssBaseline />
      <Navigation />
      <div className={classes.toolbar} />
      <main className={classes.content}>
        <MapPage />
      </main>
    </React.Fragment>
  )
}

export default withStyles(styles)(App)
