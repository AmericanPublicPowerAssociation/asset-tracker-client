import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import NavigationBar from './NavigationBar'
import MapPage from './MapPage'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    backgroundColor: 'blue',
    padding: 24,
  },
})

const App = props => {
  const { classes } = props
  return (
    <React.Fragment>
      <CssBaseline />
      <NavigationBar />
      <div className={classes.toolbar} />
      <div className={classes.content}>
        <MapPage />
      </div>
    </React.Fragment>
  )
}

export default withStyles(styles)(App)

