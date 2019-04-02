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
import Paper from '@material-ui/core/Paper'
import NavigationDrawerContainer from '../containers/NavigationDrawerContainer'
import InformationDrawer from './InformationDrawer'
import FilterListDrawer from './FilterListDrawer'
import MapWindow from './MapWindow'
import TableWindowContainer from '../containers/TableWindowContainer'
import ReportWindow from './ReportWindow'
import VulnerabilityReportWindowContainer from '../containers//VulnerabilityReportWindowContainer'
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
  main: {
    padding: CONTENT_PADDING,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  mainTransition: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  mainWithInformation: {
    marginRight: INFORMATION_DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      marginRight: 256,
    },
  },
  mainWithFilterList: {
    marginRight: FILTER_LIST_DRAWER_WIDTH,
    [theme.breakpoints.down('md')]: {
      marginRight: 256,
    },
  },
  paper: {
    height: `calc(100vh - 56px - ${CONTENT_PADDING * 2}px)`,
    [`${theme.breakpoints.up('xs')} and (orientation: landscape)`]: {
      height: `calc(100vh - 48px - ${CONTENT_PADDING * 2}px)`,
    },
    [theme.breakpoints.up('sm')]: {
      height: `calc(100vh - 64px - ${CONTENT_PADDING * 2}px)`,
    },
    overflow: 'auto',
  }
})

class App extends Component {
  state = {
    isDark: false,
    isNavigationDrawerOpen: false,
    isInformationDrawerOpen: false,
    isFilterListDrawerOpen: false,
    isAssetAddDialogOpen: false,
  }

  openNavigationDrawer = () => {
    this.setState({isNavigationDrawerOpen: true})}
  closeNavigationDrawer = () => {
    this.setState({isNavigationDrawerOpen: false})}

  openInformationDrawer = () => {
    this.setState({
      isInformationDrawerOpen: true,
      isFilterListDrawerOpen: false})}
  closeInformationDrawer = () => {
    this.setState({isInformationDrawerOpen: false})}

  openFilterListDrawer = () => {
    this.setState({
      isFilterListDrawerOpen: true,
      isInformationDrawerOpen: false})}
  closeFilterListDrawer = () => {
    this.setState({isFilterListDrawerOpen: false})}

  openAssetAddDialog = () => {
    this.setState({isAssetAddDialogOpen: true})}
  closeAssetAddDialog = () => {
    this.setState({isAssetAddDialogOpen: false})
    this.openInformationDrawer()}

  toggleTheme = () => {
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
    const isRightDrawerOpen =
      isInformationDrawerOpen ||
      isFilterListDrawerOpen
    return (
      <MuiThemeProvider theme={isDark ? darkTheme : brightTheme}>
        <CssBaseline />
        <ApplicationBarContainer
          isDark={isDark}
          isInformationDrawerOpen={isInformationDrawerOpen}
          isFilterListDrawerOpen={isFilterListDrawerOpen}
          onMenuIconClick={this.openNavigationDrawer}
          onAddIconClick={this.openAssetAddDialog}
          onThemeIconClick={this.toggleTheme}
          onFilterIconClick={this.openFilterListDrawer}
        />
        <div className={classes.toolbar} />
        <main className={classNames(classes.main, {
          [classes.mainTransition]: isRightDrawerOpen,
          [classes.mainWithInformation]: isInformationDrawerOpen,
          [classes.mainWithFilterList]: isFilterListDrawerOpen,
        })}>
          <Paper className={classes.paper}>
            <Route exact path='/' render={() => (
              <TableWindowContainer
                onSelect={this.openInformationDrawer}
              />
            )} />
            <Route exact path='/maps' render={() => (
              <MapWindow
                onSelect={this.openInformationDrawer}
              />
            )} />
          {/*
            <Route exact path='/circuits' render={() => (
              <CircuitWindow
                onSelect={this.openInformationDrawer}
              />
            )} />
          */}
            <Route exact path='/reports' render={() => (
              <ReportWindow />
            )} />
            <Route exact path='/reports/vulnerability' render={() => (
              <VulnerabilityReportWindowContainer />
            )} />
            <Route exact path='/alerts' render={() => (
              <AlertWindow />
            )} />
            <Route exact path='/accounts' render={() => (
              <AccountWindow />
            )} />
          </Paper>
        </main>
        <NavigationDrawerContainer
          open={isNavigationDrawerOpen}
          onClose={this.closeNavigationDrawer}
        />
        <InformationDrawer
          open={isInformationDrawerOpen}
          onClose={this.closeInformationDrawer}
        />
        <FilterListDrawer
          open={isFilterListDrawerOpen}
          onClose={this.closeFilterListDrawer}
        />
        <AssetAddDialogContainer
          open={isAssetAddDialogOpen}
          onClose={this.closeAssetAddDialog}
        />
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
