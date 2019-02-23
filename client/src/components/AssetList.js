import React, { PureComponent } from 'react'
import { List } from 'react-virtualized'
import { withStyles } from '@material-ui/core/styles'
// import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Switch from '@material-ui/core/Switch'

const styles = theme => ({
  exposed: {
    backgroundColor: theme.palette.secondary.main,
  },
})

class AssetList extends PureComponent {
  renderRow = ({index, key, style}) => {
    const {
      classes,
      // Get local variables
      onSelect,
      // Get global variables
      visibleAssets,
      highlightedAssetId,
      exposedAssetKey,
      exposedAsset,
      exposedAssetTypeIds,
      setHighlightedAsset,
      toggleAssetRelation,
    } = this.props
    const visibleAsset = visibleAssets.get(index)
    const visibleAssetId = visibleAsset.get('id')
    const visibleAssetName = visibleAsset.get('name')
    const visibleAssetTypeId = visibleAsset.get('typeId')
    const exposedAssetId = exposedAsset.get('id')
    return (
      <ListItem
        key={key}
        style={style}

        button
        onClick={() => {
          setHighlightedAsset({id: visibleAssetId})
          onSelect()
        }}
        selected={visibleAssetId === highlightedAssetId}
        className={(
          exposedAssetId &&
          exposedAssetId === visibleAssetId &&
          classes.exposed) || ''}
      >
        <ListItemText primary={visibleAssetName} />
        {
          exposedAssetId &&
          exposedAssetId !== visibleAssetId &&
          exposedAssetTypeIds.includes(visibleAssetTypeId) &&
          <ListItemSecondaryAction>
            <Switch
              checked={(
                exposedAsset.get(exposedAssetKey, [])
              ).includes(visibleAssetId)}
              onChange={() => {toggleAssetRelation({
                exposedAssetId,
                exposedAssetKey,
                visibleAssetId})}}
            />
          </ListItemSecondaryAction>
        }
      </ListItem>
    )
  }

  render() {
    const {
      visibleAssets,
    } = this.props
    return (
      <List
        width={800}
        height={600}
        rowHeight={50}
        rowCount={visibleAssets.size}
        rowRenderer={this.renderRow}
      />
    )
  }
}

export default withStyles(styles)(AssetList)
