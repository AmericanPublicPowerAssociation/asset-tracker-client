import React, { useEffect } from 'react'
import {
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import ApplicationBar from '../containers/ApplicationBar'
import Main from '../containers/Main'
import NavigationDrawer from '../containers/NavigationDrawer'
import InformationDrawer from '../containers/InformationDrawer'
import AssetAddDialog from '../containers/AssetAddDialog'
import AssetUploadFileDialog from '../containers/AssetUploadFileDialog'
import TaskEditDialog from '../containers/TaskEditDialog'


const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
}))
const morningTheme = createMuiTheme()
const eveningTheme = createMuiTheme({palette: {type: 'dark'}})


export default function App(props) {
  const classes = useStyles()
  const {
    isUserMember,
    refreshAuth,
    withMorningTheme,
  } = props
  const theme = withMorningTheme ? morningTheme : eveningTheme

  useEffect(() => {
    refreshAuth()
  }, [refreshAuth])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ApplicationBar />
      <div className={classes.toolbar} />
      <Main />
      <NavigationDrawer />
      {isUserMember &&
      <>
        <InformationDrawer />
        <AssetAddDialog />
        <AssetUploadFileDialog />
        <TaskEditDialog />
      </>}
    </ThemeProvider>
  )
}
