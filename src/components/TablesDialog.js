import React, { useState } from 'react'
import { fade, makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab' 
import SearchIcon from '@material-ui/icons/Search'
import Dialog from '@material-ui/core/Dialog'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import InputBase from '@material-ui/core/InputBase'
import AssetDialogList from './AssetDialogList'
import TaskList from './TaskList'
import RiskList from './RiskList'

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: "10px",
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    color: "white",
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
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
  const [searchString, setSearchString] = useState("")

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
      return <AssetDialogList searchString={searchString}/>
    else if (displayTableIndex === 1)
      return <TaskList /> 
    else if (displayTableIndex === 2)
      return <RiskList />
  }

  const onChangeSearchValue = (e) => {
    const newValue = e.target.value
    setSearchString(newValue)
  }

  return (
    <Dialog
      fullScreen
      open={isWithTables}
      TransitionComponent={Transition}
    >
      <AppBar position="relative" color="secondary">
        <Toolbar>
          <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Tables
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              value={searchString}
              onChange={onChangeSearchValue}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
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
