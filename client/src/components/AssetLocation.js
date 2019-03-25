import React, { PureComponent, Fragment } from 'react'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Chip from '@material-ui/core/Chip'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import PlaceIcon from '@material-ui/icons/Place'
import CheckIcon from '@material-ui/icons/Check'
import Tooltip from '@material-ui/core/Tooltip'
import {
  TOOLTIP_DELAY,
} from '../constants'

const styles = theme => ({
  root: {
    margin: `${theme.spacing.unit * 3}px 0 0 0`,
  },
  chip: {
    margin: `${theme.spacing.unit}px 8px 0 0`,
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
      focusingAssetId,
      focusingAssetLocation,
      locatingAssetId,
      setLocatingAsset,
    } = this.props
    const {
      showCoordinates,
    } = this.state
    const hasLocation = !focusingAssetLocation.isEmpty()
    const updateIcon = hasLocation ? <EditIcon /> : <AddIcon />
    return (
      <FormControl fullWidth className={classes.root}>
        <FormLabel>
          Location
        {hasLocation && showCoordinates &&
          <Fragment>
            {' ('}
            <Tooltip title='Longitude' enterDelay={TOOLTIP_DELAY} placement='top'>
              <span>{focusingAssetLocation.get(0)}</span>
            </Tooltip>
            {', '}
            <Tooltip title='Latitude' enterDelay={TOOLTIP_DELAY} placement='top'>
              <span>{focusingAssetLocation.get(1)}</span>
            </Tooltip>
            {')'}
          </Fragment>
        }
        </FormLabel>
        <div>
        {hasLocation &&
          <Chip
            label={<PlaceIcon />}
            className={classes.chip}
            onClick={() => this.setState({showCoordinates: !showCoordinates})}
          />
        }
          <Chip
            label={locatingAssetId ? <CheckIcon /> : updateIcon}
            color={locatingAssetId ? 'secondary' : 'primary'}
            className={classNames(classes.chip, {
              [classes.hide]: locatingAssetId &&
                locatingAssetId !== focusingAssetId,
            })}
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
