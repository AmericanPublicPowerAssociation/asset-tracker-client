import React from 'react'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AssetList from './AssetList'
import TaskDetails from './TaskDetails'
import { TaskList } from './TaskList'
import {
  getSelectedTaskId,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  tabs: {
    minWidth: 'calc(100%/3)',
  },
  hidden: {
    display: 'hidden',
  },
  fullHeight: {
    height: '100%',
  },
  overflow: {
    overflowX: 'hidden',
    overflowY: 'auto',
  },
}))

function TabPanel(props) {
  const { children, value, tabName, ...other } = props
  const classes = useStyles()

  return (
    <div
      className={classes.fullHeight, classes.overflow}
      role='tabpanel'
      hidden={value !== tabName}
      id={`scrollable-prevent-tabpanel-${tabName}`}
      aria-labelledby={`scrollable-prevent-tab-${tabName}`}
      {...other}
    >
      {value === tabName && (
        <Box display='flex' flexDirection='column' className={classes.fullHeight}>
          {children}
        </Box>
      )}
    </div>
  )
}

export default function DetailWindowTabs() {
  const [tabValue, setTabValue] = React.useState(false)
  const classes = useStyles()
  const selectedTaskId = useSelector(getSelectedTaskId)

  const handleChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <>
      <Tabs
        value={tabValue}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChange}
        aria-label='disabled tabs example'
      >
        <Tab className={classes.tabs} label='Assets' value='asset-list' />
        <Tab className={classes.tabs} label='Tasks' value='task-list' />
        <Tab className={classes.tabs} label='Risks' value='risk-list' />
      </Tabs>
      <TabPanel value={tabValue} tabName='asset-list'>
        <AssetList />
      </TabPanel>
      <TabPanel value={tabValue} tabName='task-list'>
        { !selectedTaskId
          ? <TaskList />
          : <TaskDetails taskId={selectedTaskId.taskId} />
        }
      </TabPanel>
      <TabPanel value={tabValue} tabName='risk-list'>
        Risks
      </TabPanel>
    </>
  )
}
