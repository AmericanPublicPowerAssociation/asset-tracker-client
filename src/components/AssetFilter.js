import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InputBase from '@material-ui/core/InputBase'
import Checkbox from '@material-ui/core/Checkbox'
import { ASSET_TYPE_BY_ID } from '../constants'


const styles = {
  root: {
    height: '100%',
  },
  nameInput: {
    padding: 0,
  },
}


class AssetFilter extends PureComponent {
  render = () => {
    const {
      classes,
      // Get redux variables
      assetNameQuery,
      selectedAssetTypeIds,
      countByAssetTypeId,
      setAssetNameQuery,
      toggleSelectedAssetType,
    } = this.props
    const visibleAssetTypeIds = Object.keys(ASSET_TYPE_BY_ID).filter(
      typeId => typeId in countByAssetTypeId)
    return (
      <Paper className={classes.root} square>
        <List>
          <ListItem>
            <InputBase
              value={assetNameQuery}
              placeholder='Filter by Name'
              inputProps={{
                className: classes.nameInput,
              }}
              onChange={event => setAssetNameQuery({
                query: event.target.value})}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary='Filter by Type' />
          </ListItem>
          <List disablePadding>
          {visibleAssetTypeIds.map(typeId => {
            const assetType = ASSET_TYPE_BY_ID[typeId]
            const assetCount = countByAssetTypeId[typeId]
            const typeText = `${assetType.name} (${assetCount})`
            return (
              <ListItem button key={typeId}
                onClick={() => toggleSelectedAssetType({typeId}) }
              >
                <Checkbox tabIndex={-1} disableRipple
                  checked={selectedAssetTypeIds.includes(typeId)}
                />
                <ListItemText primary={typeText} />
              </ListItem>
            )
          })}
          </List>
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
