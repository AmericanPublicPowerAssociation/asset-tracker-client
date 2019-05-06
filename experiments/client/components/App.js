import {
} from '@material-ui/core/styles'
import {
  CONTENT_PADDING,
  INFORMATION_DRAWER_WIDTH,
  // FILTER_LIST_DRAWER_WIDTH,
} from '../constants'
import NavigationDrawerContainer from '../containers/NavigationDrawerContainer'
import InformationDrawer from './InformationDrawer'
// import FilterListDrawer from './FilterListDrawer'
import MapWindow from './MapWindow'
import TableWindowContainer from '../containers/TableWindowContainer'
import ReportWindowContainer from '../containers/ReportWindowContainer'
import VulnerabilityReportWindowContainer from '../containers//VulnerabilityReportWindowContainer'
import AlertWindow from './AlertWindow'
import AccountWindow from './AccountWindow'
import ApplicationBarContainer from '../containers/ApplicationBarContainer'
import AssetAddDialogContainer from '../containers/AssetAddDialogContainer'


const styles = theme => ({
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
    isAssetAddDialogOpen: false,
  }

  openAssetAddDialog = () => {
    this.setState({isAssetAddDialogOpen: true})}
  closeAssetAddDialog = () => {
    this.setState({isAssetAddDialogOpen: false})
    this.openInformationDrawer()}

  toggleTheme = () => {
    this.setState({isDark: !this.state.isDark})}

  render() {
    const {
      isAssetAddDialogOpen,
    } = this.state
    const isRightDrawerOpen = isInformationDrawerOpen
    return (
        <ApplicationBarContainer
          isDark={isDark}
          onAddIconClick={this.openAssetAddDialog}
          onThemeIconClick={this.toggleTheme}
        />
        <main className={classNames(classes.main, {
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
              <ReportWindowContainer />
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
        <InformationDrawer
          open={isInformationDrawerOpen}
          onClose={this.closeInformationDrawer}
        />
        <AssetAddDialogContainer
          open={isAssetAddDialogOpen}
          onClose={this.closeAssetAddDialog}
        />
    )
  }
}
