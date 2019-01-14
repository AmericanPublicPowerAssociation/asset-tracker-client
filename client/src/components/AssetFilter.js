import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { withStyles } from '@material-ui/core/styles'
import { ASSET_TYPES } from '../constants'

const styles = () => ({
  noPadding: {
    padding: 0,
  },
})

const AssetFilter = props => {
  const { classes } = props
  return (
    <List disablePadding>
      {ASSET_TYPES.map(x => (
        <ListItem button key={x.id}>
          <ListItemText primary={x.name} classes={{root: classes.noPadding}} />
        </ListItem>
      ))}
    </List>
  )
}

export default withStyles(styles)(AssetFilter)
