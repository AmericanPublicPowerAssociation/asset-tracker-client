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
          <Chip label='Connected Asset 1' className={classes.chip} />
          <Chip label='Connected Asset 2' className={classes.chip} />
          <Chip label='Connected Asset 3' className={classes.chip} />
          <Chip label='Connected Asset 4' className={classes.chip} />
          <Chip label='Connected Asset 5' className={classes.chip} />
          <Chip label='Connected Asset 6' className={classes.chip} />
          <Chip label='Connected Asset 7' className={classes.chip} />
          <Chip
            className={classes.chip}
            label={<AddIcon />}
            onClick={() => console.log('hey')}
            color='primary'
          />
        </div>
      </FormControl>
      <FormControl className={classes.formControl}>
        <FormLabel>Parents</FormLabel>
        <div className={classes.chipGroup}>
          <Chip label='Parent Asset 1' className={classes.chip} />
          <Chip label='Parent Asset 2' className={classes.chip} />
          <Chip label='Parent Asset 3' className={classes.chip} />
          <Chip label='Parent Asset 4' className={classes.chip} />
          <Chip label='Parent Asset 5' className={classes.chip} />
          <Chip label='Parent Asset 6' className={classes.chip} />
          <Chip label='Parent Asset 7' className={classes.chip} />
          <Chip
            className={classes.chip}
            label={<AddIcon />}
            onClick={() => console.log('hey')}
            color='primary'
          />
        </div>
      </FormControl>
      <FormControl className={classes.formControl}>
        <FormLabel>Children</FormLabel>
        <div className={classes.chipGroup}>
          <Chip label='Child Asset 1' className={classes.chip} />
          <Chip label='Child Asset 2' className={classes.chip} />
          <Chip label='Child Asset 3' className={classes.chip} />
          <Chip label='Child Asset 4' className={classes.chip} />
          <Chip label='Child Asset 5' className={classes.chip} />
          <Chip label='Child Asset 6' className={classes.chip} />
          <Chip label='Child Asset 7' className={classes.chip} />
          <Chip
            className={classes.chip}
            label={<AddIcon />}
            onClick={() => console.log('hey')}
            color='primary'
          />
        </div>
      </FormControl>
    </form>
  )
}

export default withStyles(styles, {withTheme: true})(AssetDetail)
