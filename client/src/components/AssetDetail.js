import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'
import CancelIcon from '@material-ui/icons/Clear'

const styles = theme => ({
  assetName: {
    fontSize: 20,
  },
  chipGroup: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: `${theme.spacing.unit}px 8px 0 0`,
  },
  formControl: {
    margin: '24px 0 0 0',
  },
})

const AssetDetail = ({
  classes,
  // Get local variables
  exposedAssetKey,
  onAssetKeyOpen,
  onAssetKeyClose,
  // Get global variables
  assetById,
  highlightedAssetId,
  updateAsset,
}) => {
  const asset = assetById[highlightedAssetId]
  const connectedIds = (asset && asset.connectedIds) || []
  const parentIds = (asset && asset.parentIds) || []
  const childIds = (asset && asset.childIds) || []
  return (
    <form onSubmit={event => event.preventDefault()}>
      <TextField
        value={(asset && asset.name) || ''}
        fullWidth
        required
        InputProps={{
          classes: { input: classes.assetName },
        }}
        onChange={event => updateAsset(
          Object.assign({}, asset, {
            id: highlightedAssetId,
            name: event.target.value,
          })
        )}
      />
      <FormControl className={classes.formControl} fullWidth>
        <FormLabel>Connections</FormLabel>
        <div className={classes.chipGroup}>
        {connectedIds.map(assetId => (
          <Chip
            label={assetById[assetId].name}
            className={classes.chip} />
        ))}
          <Chip
            className={classes.chip}
            label={'connectedIds' === exposedAssetKey ? <CancelIcon /> : <AddIcon />}
            onClick={() => 'connectedIds' === exposedAssetKey ?  onAssetKeyClose() : onAssetKeyOpen('connectedIds')}
            color='primary'
          />
        </div>
      </FormControl>
      <FormControl className={classes.formControl} fullWidth>
        <FormLabel>Parents</FormLabel>
        <div className={classes.chipGroup}>
        {parentIds.map(assetId => (
          <Chip
            label={assetById[assetId].name}
            className={classes.chip} />
        ))}
          <Chip
            className={classes.chip}
            label={'parentIds' === exposedAssetKey ? <CancelIcon /> : <AddIcon />}
            onClick={() => 'parentIds' === exposedAssetKey ?  onAssetKeyClose() : onAssetKeyOpen('parentIds')}
            color='primary'
          />
        </div>
      </FormControl>
      <FormControl className={classes.formControl} fullWidth>
        <FormLabel>Children</FormLabel>
        <div className={classes.chipGroup}>
        {childIds.map(assetId => (
          <Chip
            label={assetById[assetId].name}
            className={classes.chip} />
        ))}
          <Chip
            className={classes.chip}
            label={'childIds' === exposedAssetKey ? <CancelIcon /> : <AddIcon />}
            onClick={() => 'childIds' === exposedAssetKey ?  onAssetKeyClose() : onAssetKeyOpen('childIds')}
            color='primary'
          />
        </div>
      </FormControl>
    </form>
  )
}

export default withStyles(styles)(AssetDetail)
