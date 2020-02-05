import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab' 
import SearchIcon from '@material-ui/icons/Search'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import AssetList from './AssetList'
import TaskList from './TaskList'
import RiskList from './RiskList'

const useStyles = makeStyles(theme => ({
  appBar: {
    // position: 'relative',
  },
  offset: theme.mixins.toolbar,
  title: {
    // marginLeft: theme.spacing(2),
    // flex: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function TablesDialog(props) {
  const {
    isWithTables,
    setIsWithTables,
  } = props
  const [displayTableIndex, setDisplayTableIndex] = useState(0)

  const classes = useStyles()

	const handleClose = () => {
    // e.stopPropagation()
    setIsWithTables(false)
	}

  const handleChange = (e, newVal) => {
    setDisplayTableIndex(newVal)
  }

  const getTableComponent = () => {
    if (displayTableIndex === 0)
      return <AssetList />
    else if (displayTableIndex === 1)
      return <TaskList /> 
    else if (displayTableIndex === 2)
      return <RiskList />
  }

  return (
    <Dialog
      fullScreen
      open={isWithTables}
      TransitionComponent={Transition}
      onClose={handleClose}
    >
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Tables
          </Typography>
        </Toolbar>
      </AppBar>
      <Tabs
          value={displayTableIndex}
          indicatorColor='secondary'
          textColor='inherit'
          variant='fullWidth'
          onChange={handleChange}
      >
        <Tab label='Assets' />
        <Tab label='Tasks' />
        <Tab label='Risks' />
      </Tabs>
      <div>
        { getTableComponent() }
    </div>
    </Dialog>
  )
}
