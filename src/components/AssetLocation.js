import React, { Fragment, PureComponent } from 'react'
import { Redirect, Switch } from 'react-router-dom'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Tooltip from '@material-ui/core/Tooltip'
import Chip from '@material-ui/core/Chip'
import PlaceIcon from '@material-ui/icons/Place'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Check'
import {
  TOOLTIP_DELAY,
} from '../constants'


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
      changeAsset,
    } = this.props
    const {
      showCoordinates,
    } = this.state
    const hasLocation = !focusingAssetLocation.isEmpty()
    const updateIcon = hasLocation ? <EditIcon /> : <AddIcon />
    const withMap = locatingAssetId || showCoordinates

    return (
      <FormControl fullWidth className={className}>
        <FormLabel>
          Location
        {hasLocation && showCoordinates &&
        <Fragment>
          {' ('}
          <Tooltip enterDelay={TOOLTIP_DELAY} placement='bottom' title='Longitude'>
            <span>{focusingAssetLocation.get(0)}</span>
          </Tooltip>
          {', '}
          <Tooltip enterDelay={TOOLTIP_DELAY} placement='bottom' title='Latitude'>
            <span>{focusingAssetLocation.get(1)}</span>
          </Tooltip>
          {') '}
        </Fragment>
        }
        </FormLabel>
        <div>
        {hasLocation &&
          <Tooltip enterDelay={TOOLTIP_DELAY} placement='bottom' title='Show Coordinates'>
            <Chip
              className={classes.chip}
              label={<PlaceIcon />}
              color={showCoordinates ? 'primary' : 'default'}
              onClick={() => this.setState({showCoordinates: !showCoordinates})}
            />
          </Tooltip>
        }
          <Chip
            className={classNames(classes.chip, {
              [classes.hide]: locatingAssetId &&
                locatingAssetId !== focusingAssetId,
            })}
            label={locatingAssetId ? <SaveIcon /> : updateIcon}
            color={locatingAssetId ? 'secondary' : 'primary'}
            onClick={() => {
              if (!locatingAssetId) {
                setLocatingAsset({id: focusingAssetId})
              } else {
                setLocatingAsset({id: null})
                changeAsset({
                  id: focusingAssetId,
                  location: focusingAssetLocation,
                })
              }
            }}
          />
        </div>

      {withMap &&
        <Switch>
          <Redirect from='/tables' to='/maps' />
          <Redirect from='/circuits' to='/maps' />
        </Switch>
      }
      </FormControl>
    )
  }

}


export default withStyles(styles)(AssetLocation)
