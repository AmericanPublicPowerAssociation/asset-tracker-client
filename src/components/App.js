import React, { Component } from 'react'
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import ApplicationBar from '../containers/ApplicationBar'
import Main from '../containers/Main'
import NavigationDrawer from '../containers/NavigationDrawer'
import InformationDrawer from '../containers/InformationDrawer'
import AssetAddDialog from '../containers/AssetAddDialog'


const styles = theme => ({
  toolbar: theme.mixins.toolbar,
})
const morningTheme = createMuiTheme()
const eveningTheme = createMuiTheme({palette: {type: 'dark'}})


class App extends Component {

  componentDidMount() {
    const {
      refreshAuth,
    } = this.props
    refreshAuth()
  }

  render() {
    const {
      classes,
      isUserMember,
      withMorningTheme,
    } = this.props
    const theme = withMorningTheme ? morningTheme : eveningTheme
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <ApplicationBar />
        <div className={classes.toolbar} />
        <Main />
        <NavigationDrawer />
      {isUserMember &&
      <>
        <InformationDrawer />
        <AssetAddDialog />
      </>
      }
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
