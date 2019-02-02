import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'

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

const AssetDetail = props => {
  const { classes } = props
  const {
    assetById,
    highlightedAssetId,
  } = props
  const {
    updateAsset,
  } = props
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
            label={<AddIcon />}
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
            label={<AddIcon />}
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
            label={<AddIcon />}
            color='primary'
          />
        </div>
      </FormControl>
    </form>
  )
}

export default withStyles(styles, {withTheme: true})(AssetDetail)
