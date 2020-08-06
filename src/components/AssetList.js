import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import AssetNameWithIcon from './AssetNameWithIcon'
import {
  setSelection,
} from '../actions'
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
  const dispatch = useDispatch()
  const classes = useStyles()
  const assetById = useSelector(getAssetById)

  return (
    <List>
      {
        Object.entries(assetById).map((assetEntry) => {
          const [assetId, asset] = assetEntry

          return (
            <React.Fragment key={assetId}>
              <ListItem button component='div'
                className={classes.listItem}
                onClick={() => dispatch(setSelection({ assetId: assetId }))}
              >
                <AssetNameWithIcon asset={asset} />
              </ListItem>
              <Divider variant="middle" component="li" />
            </React.Fragment>
          )
        })
      }
    </List>
  )
}
