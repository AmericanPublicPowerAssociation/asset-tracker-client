import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import AssetNameWithLogo from './AssetNameWithLogo'
import {
  getAssetById,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}))

export default function AssetList(props) {
  const classes = useStyles()
  const assetById = useSelector(getAssetById)

  return (
    <List>
      {
        Object.entries(assetById).map((assetEntry) => {
          const [id, asset] = assetEntry

          return (
            <React.Fragment key={id}>
              <ListItem className={classes.listItem}>
                <AssetNameWithLogo asset={asset} />
              </ListItem>
              <Divider variant="middle" component="li" />
            </React.Fragment>
          )
        })
      }
    </List>
  )
}
