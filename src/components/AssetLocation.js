import React, { PureComponent } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Check'


const styles = theme => ({
  chip: {
    margin: `${theme.spacing.unit}px ${theme.spacing.unit}px 0 0`,
  },
  hide: {
    visibility: 'hidden',
  },
})


class AssetLocation extends PureComponent {

  state = {
    showCoordinates: false,
  }

  render() {
    const {
      classes,
      className,
      // Get redux variables
      focusingAssetId,
      focusingAssetLocation,
      locatingAssetId,
      setLocatingAsset,
    } = this.props
    const hasLocation = !focusingAssetLocation.isEmpty()
    const updateIcon = hasLocation ? <EditIcon /> : <AddIcon />
    return(
      <FormControl fullWidth className={className}>
        <FormLabel>
          Location
        </FormLabel>
        <div>
          <Chip
            className={classNames(classes.chip, {
              [classes.hide]: locatingAssetId &&
                locatingAssetId !== focusingAssetId,
            })}
            label={locatingAssetId ? <SaveIcon /> : updateIcon}
            color={locatingAssetId ? 'secondary' : 'primary'}
            onClick={() => setLocatingAsset(locatingAssetId ? {
              id: null,
            } : {
              id: focusingAssetId,
            })}
          />
        </div>
      </FormControl>
    )
  }

}


export default withStyles(styles)(AssetLocation)
