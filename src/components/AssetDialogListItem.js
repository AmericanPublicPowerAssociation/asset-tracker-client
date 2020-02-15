import React from 'react'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import {
  ASSET_TYPE_BY_CODE
} from '../constants'


export default function AssetDialogListItem(props) {
  const {
    asset,
    handleShowDetailsDialog,
  } = props
  const {
    typeCode,
    name,
    id
  } = asset
  const assetTypeName = ASSET_TYPE_BY_CODE[typeCode].name
  const numOfConnections = asset['connections'] ? asset['connections'].length : 0

  return (
    <>
      <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid
                item
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
                item
                container
                direction='column'
                spacing={1}
              >
                <Grid item xs>
                  {name}
                </Grid>
                <Grid>
                  {numOfConnections}
                  {numOfConnections === 1 ? ' connection' : ' connections'}
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
