import React from 'react'
import { useSelector } from 'react-redux'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import {
  getConnectedAssetCount,
} from '../routines'
import {
  getAssetTypeByCode,
} from '../selectors'

export default function AssetDialogListItem(props) {
  const {
    asset,
    handleShowDetailsDialog,
  } = props
  const {
    typeCode,
    name,
    id,
  } = asset
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetTypeName = assetTypeByCode[typeCode].name
  const connectionCount = getConnectedAssetCount(asset)

  return (
    <>
      <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid
                container
                direction='column'
                alignItems='center'
              >
                <Grid item>
                  <AssetTypeSvgIcon assetTypeCode={typeCode} />
                </Grid>
                <Grid item>
                  <Typography color='textSecondary' overflow='hidden'>
                    {assetTypeName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid
                container
                direction='column'
                spacing={1}
              >
                <Grid item xs>
                  {name}
                </Grid>
                <Grid>
                  {connectionCount}
                  {connectionCount === 1 ? ' connection' : ' connections'}
                </Grid>
                <Grid item xs>
                  <Button
                    color='secondary'
                    onClick={() => handleShowDetailsDialog(id)}
                  >
                    View details
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      </ListItem>
      <Divider variant='middle' component='li' />
    </>
  )
}
