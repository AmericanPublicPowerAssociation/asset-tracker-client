import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AssetsFilter from '../containers/AssetsFilter'
import {
  RisksTable,
} from 'asset-report-risks'


const useStyles = makeStyles(theme => ({
  grid: {
    height: '100%',
  },
  frame: {
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      height: '50%',
    },
    overflow: 'auto',
  },
}))


export default function RisksWindow(props) {
  const classes = useStyles()

  const {
    refreshAssetsKit,
    refreshRisks,
    risks,
    openTaskEditDialog,
    setEditingTaskValues,
  } = props

  useEffect(() => {
    refreshRisks()
  }, [refreshRisks])

  useEffect( () => {
    refreshAssetsKit()
  } )

  return (
    <Grid container className={classes.grid}>
      <Grid item className={classes.frame}
        xs={12} sm={5} md={4} lg={3} xl={2} >
        <AssetsFilter />
      </Grid>
      <Grid item className={classes.frame}
        xs={12} sm={7} md={8} lg={9} xl={10} >
        <RisksTable
          risks={risks}
          openTaskEditDialog={openTaskEditDialog}
          setEditingTaskValues={setEditingTaskValues} />
      </Grid>
    </Grid>
  )
}
