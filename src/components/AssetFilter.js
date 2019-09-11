import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InputBase from '@material-ui/core/InputBase'
import Checkbox from '@material-ui/core/Checkbox'
import {
  getAssetTypeName,
} from '../routines'


const styles = theme => ({
  root: {
    height: '100%',
  },
  nameInput: {
    padding: 0,
  },
})


class AssetFilter extends PureComponent {

  setAssetFilterName = name => {
    const { setAssetFilterValue } = this.props
    setAssetFilterValue({name})
  }

  render() {
    const {
      classes,
      // Get redux variables
      assetFilterValueByAttribute,
      assetFilterKeysByAttribute,
      assetTypeById,
      countByAssetTypeId,
      toggleAssetFilterKey,
    } = this.props
    const name = assetFilterValueByAttribute.get('name')
    const selectedAssetTypeIds = assetFilterKeysByAttribute.get('typeId')
    return (
      <Paper className={classes.root} elevation={0} square>
        <List>
          <ListItem>
            <InputBase
              value={name}
              placeholder='Filter by Name'
              inputProps={{ className: classes.nameInput }}
              onChange={event => this.setAssetFilterName(event.target.value)}
            />
          </ListItem>
        {!countByAssetTypeId.isEmpty() &&
        <>
          <ListItem>
            <ListItemText primary='Filter by Type' />
          </ListItem>
          <List disablePadding>
          {countByAssetTypeId.entrySeq().map(([typeId, count]) => {
            const typeName = getAssetTypeName(typeId, assetTypeById)
            const typeText = `${typeName} (${count})`
            return (
              <ListItem button key={typeId}
                onClick={() => toggleAssetFilterKey({typeId}) }
              >
                <Checkbox tabIndex={-1} disableRipple
                  checked={selectedAssetTypeIds.has(typeId)}
                />
                <ListItemText primary={typeText} />
              </ListItem>
            )
          })}
          </List>
        </>
        }
        {/*
          <ListItem>
            <ListItemText primary='Filter by Utility' />
          </ListItem>
        */}
        </List>
      </Paper>
    )
  }
}


export default withStyles(styles)(AssetFilter)
