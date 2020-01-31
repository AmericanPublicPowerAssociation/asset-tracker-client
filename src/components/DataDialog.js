import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab' 
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'

const useStyles = makeStyles(theme => ({
  appBar: {
    // position: 'relative',
  },
  title: {
    // marginLeft: theme.spacing(2),
    // flex: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function DataDialog(props) {
  const {
    isWithData,
    setIsWithData,
  } = props
  const classes = useStyles()

	const handleClose = () => {
    // e.stopPropagation()
    setIsWithData(false)
	}

  return (
    <Dialog
      fullScreen
      open={isWithData}
      TransitionComponent={Transition}
      onClose={handleClose}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Tables
          </Typography>
          <IconButton edge='end' aria-label='search' color='inherit'>
            <SearchIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Paper square>
        <Tabs
          value={0}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
        >
          <Tab label='Assets' />
          <Tab label='Tasks' />
          <Tab label='Risks' />
        </Tabs>
      </Paper>
    </Dialog>
  )
}
