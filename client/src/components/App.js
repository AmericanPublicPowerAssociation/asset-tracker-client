import React, { Component, Fragment } from 'react'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { CONTENT_PADDING } from '../constants'
import ApplicationBar from './ApplicationBar'
import NavigationDrawer from './NavigationDrawer'
import InformationDrawer from './InformationDrawer'
import FilterListDrawer from './FilterListDrawer'
import MapWindow from './MapWindow'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    padding: CONTENT_PADDING,
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
        <main className={classes.content}>
          <MapWindow
            isInformationDrawerOpen={isInformationDrawerOpen}
            isFilterListDrawerOpen={isFilterListDrawerOpen}
            onItemSelect={this.handleInformationDrawerOpen}
          />
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
