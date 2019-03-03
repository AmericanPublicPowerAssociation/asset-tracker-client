import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import PlaceIcon from '@material-ui/icons/Place'
import CheckIcon from '@material-ui/icons/Check'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 3}px 0 0 0`,
  },
  chip: {
    margin: `${theme.spacing.unit}px 8px 0 0`,
  },
})

class AssetLocation extends PureComponent {
  render() {
    const {
      classes,
      focusingAsset,
      locatingAsset,
      setLocatingAsset,
    } = this.props
    const focusingAssetId = focusingAsset.get('id')
    const focusingAssetLocation = focusingAsset.get('location')
    const locatingAssetId = locatingAsset.get('id')
    const updateIcon = focusingAssetLocation ? <EditIcon /> : <AddIcon />
    return (
      <FormControl fullWidth className={classes.root}>
        <FormLabel>Location</FormLabel>
        <div>
        {focusingAssetLocation &&
          <Chip
            label={<PlaceIcon />}
            className={classes.chip}
          />
        }
          <Chip
            label={locatingAssetId ? <CheckIcon /> : updateIcon}
            color={locatingAssetId ? 'secondary' : 'primary'}
            className={classes.chip}
            onClick={() => {setLocatingAsset(locatingAssetId ? {
              id: null
            } : {
              id: focusingAssetId
            })}}
          />
        </div>
      </FormControl>
    )
  }
}

export default withStyles(styles)(AssetLocation)
