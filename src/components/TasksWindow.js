import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import AssetFilter from '../containers/AssetFilter'
import TasksTable from '../components/TasksTable'


const useStyles = makeStyles(theme => ({
  paper: {
    height: '100%',
  },
  grid: {
    height: '100%',
  },
  frame: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '50%',
    },
    overflow: 'auto',
  },
}))


export default function TasksWindow(props) {
  const classes = useStyles()

  useEffect(() => {
    const {
      refreshTasks,
    } = props
    refreshTasks()
  }, [props])

  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.grid}>
        <Grid item className={classes.frame}
          xs={12} sm={12} md={4} lg={3} xl={2}
        >
          <AssetFilter />
        </Grid>
        <Grid item className={classes.frame}
          xs={12} sm={12} md={8} lg={9} xl={10}
        >
          <TasksTable />
        </Grid>
      </Grid>
    </Paper>
  )
}
