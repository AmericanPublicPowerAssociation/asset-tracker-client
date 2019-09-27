import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import InputBase from '@material-ui/core/InputBase'
import Checkbox from '@material-ui/core/Checkbox'


const styles = theme => ({
  root: {
    backgroundColor: 'lightgrey',
  },
  nameInput: {
    padding: 0,
  },
})


class AssetsFilter extends PureComponent {

  setAssetsFilterName = name => {
    const { setAssetsFilterValues } = this.props
    setAssetsFilterValues({name})
  }

  render() {
    const {
      classes,
      // Get redux variables
      assetFilterValueByAttribute,
      assetFilterKeysByAttribute,
      assetTypeById,
      countByAssetTypeId,
      toggleAssetsFilterKey,
    } = this.props
    const name = assetFilterValueByAttribute.get('name')
    const selectedAssetTypeIds = assetFilterKeysByAttribute.get('typeId')
    const countedAssetTypeById = assetTypeById.filter((type, typeId) =>
      countByAssetTypeId.has(typeId))
    return (
      <Paper className={classes.root} elevation={0} square>
        <List>
          <ListItem>
            <InputBase
              value={name}
              placeholder='Filter by Name'
              inputProps={{ className: classes.nameInput }}
              onChange={event => this.setAssetsFilterName(event.target.value)}
            />
          </ListItem>
        {!countByAssetTypeId.isEmpty() &&
        <>
          <ListItem>
            <ListItemText primary='Filter by Type' />
          </ListItem>
          <List disablePadding>
          {countedAssetTypeById.entrySeq().map(([typeId, type]) => {
            const typeName = type.get('name')
            const count = countByAssetTypeId.get(typeId)
            const typeText = `${typeName} (${count})`
            return (
              <ListItem button key={typeId}
                onClick={() => toggleAssetsFilterKey({typeId}) }
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


export default withStyles(styles)(AssetsFilter)
