import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab' 
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import {
	getIsFullScreenDataDialog,
} from '../selectors'
import {
	setIsFullScreenDataDialog,
} from '../actions'

const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}))

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function FullScreenDialog() {
  const classes = useStyles()
	const dispatch = useDispatch()
	const isFullScreenDataDialog = useSelector(getIsFullScreenDataDialog)

	const handleClose = (e) => {
			e.stopPropagation()
			dispatch(setIsFullScreenDataDialog())
	}

  return (
    <div>
      <Dialog fullScreen open={isFullScreenDataDialog} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
							Tables
            </Typography>
						<IconButton edge="end" aria-label="search" color="inherit">
							<SearchIcon />
						</IconButton>
          </Toolbar>
        </AppBar>
				<Paper square>
					<Tabs
						value={0}
						indicatorColor="primary"
						textColor="primary"
						aria-label="disabled tabs"
						variant="fullWidth"
					>
						<Tab label="Assets" />
						<Tab label="Tasks" />
						<Tab label="Risks" />
					</Tabs>
				</Paper>
      </Dialog>
    </div>
  )
}
