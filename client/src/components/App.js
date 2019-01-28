import React, { Component, Fragment } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  CONTENT_PADDING,
  INFORMATION_DRAWER_WIDTH,
  FILTER_LIST_DRAWER_WIDTH,
} from '../constants'
import ApplicationBar from './ApplicationBar'
import NavigationDrawer from './NavigationDrawer'
import InformationDrawer from './InformationDrawer'
import FilterListDrawer from './FilterListDrawer'
import MapWindow from './MapWindow'

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
  },
  contentWithFilterList: {
    marginRight: FILTER_LIST_DRAWER_WIDTH,
  },
})

class App extends Component {
  state = {
    isNavigationDrawerOpen: false,
    isInformationDrawerOpen: false,
    isFilterListDrawerOpen: false,
  }

  handleNavigationDrawerOpen = () => {
    this.setState({isNavigationDrawerOpen: true})}
  handleNavigationDrawerClose = () => {
    this.setState({isNavigationDrawerOpen: false})}

  handleInformationDrawerOpen = () => {
    this.setState({
      isInformationDrawerOpen: true,
      isFilterListDrawerOpen: false,
    })
  }
  handleInformationDrawerClose = () => {
    this.setState({isInformationDrawerOpen: false})}

  handleFilterListDrawerOpen = () => {
    this.setState({
      isFilterListDrawerOpen: true,
      isInformationDrawerOpen: false,
    })
  }
  handleFilterListDrawerClose = () => {
    this.setState({isFilterListDrawerOpen: false})}

  render() {
    const { classes } = this.props
    const {
      isNavigationDrawerOpen,
      isInformationDrawerOpen,
      isFilterListDrawerOpen,
    } = this.state
    const isRightDrawerOpen = isInformationDrawerOpen || isFilterListDrawerOpen
    return (
      <Fragment>
        <CssBaseline />
        <ApplicationBar
          isInformationDrawerOpen={isInformationDrawerOpen}
          isFilterListDrawerOpen={isFilterListDrawerOpen}
          onMenuClick={this.handleNavigationDrawerOpen}
          onFilterListClick={this.handleFilterListDrawerOpen}
        />
        <div className={classes.toolbar} />
        <main className={classNames(classes.content, {
          [classes.contentTransition]: isRightDrawerOpen,
          [classes.contentWithInformation]: isInformationDrawerOpen,
          [classes.contentWithFilterList]: isFilterListDrawerOpen,
        })}>
          <MapWindow onItemSelect={this.handleInformationDrawerOpen} />
        </main>
        <NavigationDrawer
          isOpen={isNavigationDrawerOpen}
          onClose={this.handleNavigationDrawerClose}
        />
        <InformationDrawer
          isOpen={isInformationDrawerOpen}
          onClose={this.handleInformationDrawerClose}
        />
        <FilterListDrawer
          isOpen={isFilterListDrawerOpen}
          onClose={this.handleFilterListDrawerClose}
        />
      </Fragment>
    )
  }
}

export default withStyles(styles)(App)
