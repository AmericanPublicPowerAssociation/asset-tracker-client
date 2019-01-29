import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Chip from '@material-ui/core/Chip'

const styles = theme => ({
  assetName: {
    fontSize: 20,
  },
  chipGroup: {
    display: 'flex',
    // justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  chip: {
    margin: `${theme.spacing.unit}px 8px ${theme.spacing.unit}px 0`,
  },
  formControl: {
    margin: '24px 0',
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
  return (
    <form>
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
      <FormControl className={classes.formControl}>
        <FormLabel>Connections</FormLabel>
        <div className={classes.chipGroup}>
          <Chip
            label='Example Asset 1'
            className={classes.chip}
          />
          <Chip
            label='Example Asset 2'
            className={classes.chip}
          />
          <Chip
            label='Example Asset 3'
            className={classes.chip}
          />
          <Chip
            label='Example Asset 4'
            className={classes.chip}
          />
          <Chip
            label='Example Asset 5'
            className={classes.chip}
          />
          <Chip
            label='Example Asset 6'
            className={classes.chip}
          />
          <Chip
            label='Example Asset 7'
            className={classes.chip}
          />
        </div>
      </FormControl>
    </form>
  )
}

export default withStyles(styles, {withTheme: true})(AssetDetail)
