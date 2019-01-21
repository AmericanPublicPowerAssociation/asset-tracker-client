import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { ASSET_TYPES } from '../constants'

const AssetFilter = () => {
  return (
    <List disablePadding>
    {ASSET_TYPES.map(x => (
      <ListItem button key={x.id} onClick={() => {console.log('hey')}}>
        <ListItemText primary={x.name} />
      </ListItem>
    ))}
    </List>
  )
}

export default AssetFilter
