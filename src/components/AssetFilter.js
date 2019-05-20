import React, { Fragment, PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InputBase from '@material-ui/core/InputBase'
import Checkbox from '@material-ui/core/Checkbox'
import { ASSET_TYPE_BY_ID } from '../constants'
import { splitTerms } from '../macros'


const styles = {
  root: {
    height: '100%',
  },
  nameInput: {
    padding: 0,
  },
}


class AssetFilter extends PureComponent {

  setAssetNameFilters = name => {
    const {
      setAssetAttributeFilters,
      setAssetFilter,
    } = this.props
    setAssetFilter({name})
    setAssetAttributeFilters({name: splitTerms(name.toLowerCase())})
  }

  render = () => {
    const {
      classes,
      // Get redux variables
      assetFilter,
      assetFiltersByAttribute,
      countByAssetTypeId,
      toggleAssetAttributeFilter,
    } = this.props
    const name = assetFilter.get('name')
    const visibleAssetTypeIds = Object.keys(ASSET_TYPE_BY_ID).filter(
      typeId => typeId in countByAssetTypeId)
    const selectedAssetTypeIds = assetFiltersByAttribute.get('typeId')
    return (
      <Paper className={classes.root} square>
        <List>
          <ListItem>
            <InputBase
              value={name}
              placeholder='Filter by Name'
              inputProps={{
                className: classes.nameInput,
              }}
              onChange={event => this.setAssetNameFilters(event.target.value)}
            />
          </ListItem>
        {visibleAssetTypeIds.length > 0 &&
        <Fragment>
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
                onClick={() => toggleAssetAttributeFilter({typeId}) }
              >
                <Checkbox tabIndex={-1} disableRipple
                  checked={selectedAssetTypeIds.has(typeId)}
                />
                <ListItemText primary={typeText} />
              </ListItem>
            )
          })}
          </List>
        </Fragment>
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
