import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import {
  ASSET_TYPE_BY_CODE
} from '../constants'
import {
  getAssetById
}from '../selectors' 


export default function AssetList(props) {
  const assetById = useSelector(getAssetById)
  return (
    <List>
      {
        Object.keys(assetById).map( assetKey => (
          <AssetListItem 
            key={`asset-list-${assetKey}`}
            asset={assetById[assetKey]} />
        ))
      } 
    </List>
  )
}


function AssetListItem(props) {
  const {
    asset
  } = props
  const {
    typeCode,
    name,
    id
  } = asset
  const assetTypeName = ASSET_TYPE_BY_CODE[typeCode].name
  return (
    <>
      <ListItem>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Grid
                item
                container
                direction="column"
                alignItems="center"
              >
                <Grid item>
                  <AssetTypeSvgIcon assetTypeCode={typeCode} />
                </Grid>
                <Grid item>
                  <Typography color="textSecondary" overflow="hidden">
                    {assetTypeName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid
                item
                container
                direction="column"
                spacing={1}
              >
                <Grid item xs>
                  Name: {name}
                </Grid>
                <Grid item xs>
                  Id: {id}
                </Grid>
                <Grid item xs>
                  <Button color="secondary">
                    View details
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      </ListItem>
      <Divider variant="middle" component="li" />
    </>
  )
}
