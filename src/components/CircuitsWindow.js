import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import AssetsCircuit from '../containers/AssetsCircuit'
import AssetsFilter from '../components/AssetsFilter'
import AssetList from '../containers/AssetList'


const useStyles = makeStyles(theme => ({
   grid: {
    height: '100%',
  },
  mapFrame: {
    minHeight: '50%',
  },
  tableFrame: {
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '50%',
    },
  },
  frame: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
    },
    height: '100%',
  },
  filterPanel: {
    maxHeight: '50%',
    [theme.breakpoints.down('sm')]: {
      maxHeight: '100%',
      maxWidth: '50%',
    },
    overflow: 'auto',
  },
  listPanel: {
    flex: 1,
    overflow: 'auto',
  },
  root: {
    padding: theme.spacing(3),
  },
}))


export default function CircuitsWindow(props) {
  const classes = useStyles()

  useEffect(() => {
    const { refreshAssetsKit, } = props
    refreshAssetsKit()
  }, [])

  const {
      assetFilterValueByAttribute,
      assetFilterKeysByAttribute,
      assetTypeById,
      assetCountByAssetTypeId,
      toggleAssetsFilterKey,
    } = props

  return (
    <Grid container className={classes.grid}>
      <Grid item xs={12} sm={12} md={9} className={classes.mapFrame}>
        <AssetsCircuit />
      </Grid>
      <Grid item xs={12} sm={12} md={3} className={classes.tableFrame}>
        <div className={classes.frame}>
          <div className={classes.filterPanel}>
            <AssetsFilter 
              assetFilterValueByAttribute={assetFilterValueByAttribute}
              assetFilterKeysByAttribute={assetFilterKeysByAttribute}
              assetTypeById={assetTypeById}
              countByAssetTypeId={assetCountByAssetTypeId}
              toggleAssetsFilterKey={toggleAssetsFilterKey} />
          </div>
          <div className={classes.listPanel}>
            <AssetList />
          </div>
        </div>
      </Grid>
    </Grid>
  )
}
