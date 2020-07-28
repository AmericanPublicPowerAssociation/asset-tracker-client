import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AssetList from './AssetList'

const useStyles = makeStyles(theme => ({
  tabs: {
    minWidth: 'calc(100%/3)',
  },
  tabPanels: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}))

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  )
}

export default function DetailWindowTabs() {
  const [tabValue, setTabValue] = React.useState(0)
  const classes = useStyles()

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
        <Tab className={classes.tabs} label='Assets' />
        <Tab className={classes.tabs} label='Tasks' />
        <Tab className={classes.tabs} label='Risks' />
      </Tabs>
      <Box pr={1} pl={1} style={{ height: '100%', overflowY: 'auto' }}>
        <TabPanel value={tabValue} index={0}>
          <AssetList />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          Tasks
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          Risks
        </TabPanel>
      </Box>
    </>
  )
}
