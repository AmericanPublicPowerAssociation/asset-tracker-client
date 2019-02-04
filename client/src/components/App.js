import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import classNames from 'classnames'
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  CONTENT_PADDING,
  INFORMATION_DRAWER_WIDTH,
  FILTER_LIST_DRAWER_WIDTH,
} from '../constants'
import NavigationDrawer from './NavigationDrawer'
import InformationDrawer from './InformationDrawer'
import FilterListDrawer from './FilterListDrawer'
import MapWindow from './MapWindow'
import TableWindow from './TableWindow'
import ReportWindow from './ReportWindow'
import AlertWindow from './AlertWindow'
import AccountWindow from './AccountWindow'
import ApplicationBarContainer from '../containers/ApplicationBarContainer'
import AssetAddDialogContainer from '../containers/AssetAddDialogContainer'

var theme = {
  typography: {
    useNextVariants: true,
  },
}
const brightTheme = createMuiTheme(theme)
const darkTheme = createMuiTheme({
  ...theme,
  palette: {
    type: 'dark',
  },
})

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    padding: CONTENT_PADDING,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentTransition: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentWithInformation: {
    marginRight: INFORMATION_DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      marginRight: 256,
    },
  },
  contentWithFilterList: {
    marginRight: FILTER_LIST_DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      marginRight: 256,
    },
  },
})

class App extends Component {
  state = {
    isDark: false,
    isNavigationDrawerOpen: false,
    isInformationDrawerOpen: false,
    isFilterListDrawerOpen: false,
    isAssetAddDialogOpen: false,
  }

  handleNavigationDrawerOpen = () => {
    this.setState({isNavigationDrawerOpen: true})}
  handleNavigationDrawerClose = () => {
    this.setState({isNavigationDrawerOpen: false})}

  handleInformationDrawerOpen = () => {
    this.setState({
      isInformationDrawerOpen: true,
      isFilterListDrawerOpen: false})}
  handleInformationDrawerClose = () => {
    this.setState({isInformationDrawerOpen: false})}

  handleFilterListDrawerOpen = () => {
    this.setState({
      isFilterListDrawerOpen: true,
      isInformationDrawerOpen: false})}
  handleFilterListDrawerClose = () => {
    this.setState({isFilterListDrawerOpen: false})}

  handleAssetAddDialogOpen = () => {
    this.setState({isAssetAddDialogOpen: true})}
  handleAssetAddDialogClose = () => {
    this.setState({isAssetAddDialogOpen: false})
    this.handleInformationDrawerOpen()}

  handleThemeToggle = () => {
    this.setState({isDark: !this.state.isDark})}

  render() {
    const { classes } = this.props
    const {
      isDark,
      isNavigationDrawerOpen,
      isInformationDrawerOpen,
      isFilterListDrawerOpen,
      isAssetAddDialogOpen,
    } = this.state
    const isRightDrawerOpen = isInformationDrawerOpen || isFilterListDrawerOpen
    return (
      <MuiThemeProvider theme={isDark ? darkTheme : brightTheme}>
        <CssBaseline />
        <ApplicationBarContainer
          isDark={isDark}
          isInformationDrawerOpen={isInformationDrawerOpen}
          isFilterListDrawerOpen={isFilterListDrawerOpen}
          onMenuIconClick={this.handleNavigationDrawerOpen}
          onAddIconClick={this.handleAssetAddDialogOpen}
          onThemeIconClick={this.handleThemeToggle}
          onFilterIconClick={this.handleFilterListDrawerOpen}
        />
        <div className={classes.toolbar} />
        <main className={classNames(classes.content, {
          [classes.contentTransition]: isRightDrawerOpen,
          [classes.contentWithInformation]: isInformationDrawerOpen,
          [classes.contentWithFilterList]: isFilterListDrawerOpen,
        })}>
        <Route exact path='/' render={() => (
          <MapWindow
            onSelect={this.handleInformationDrawerOpen}
          />
        )} />
        <Route exact path='/tables' render={() => (
          <TableWindow
            onSelect={this.handleInformationDrawerOpen}
          />
        )} />
        <Route exact path='/reports' render={() => (
          <ReportWindow />
        )} />
        <Route exact path='/alerts' render={() => (
          <AlertWindow />
        )} />
        <Route exact path='/accounts' render={() => (
          <AccountWindow />
        )} />
        </main>
        <NavigationDrawer
          open={isNavigationDrawerOpen}
          onClose={this.handleNavigationDrawerClose}
        />
        <InformationDrawer
          open={isInformationDrawerOpen}
          onClose={this.handleInformationDrawerClose}
        />
        <FilterListDrawer
          open={isFilterListDrawerOpen}
          onClose={this.handleFilterListDrawerClose}
        />
        <AssetAddDialogContainer
          open={isAssetAddDialogOpen}
          onClose={this.handleAssetAddDialogClose}
        />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
