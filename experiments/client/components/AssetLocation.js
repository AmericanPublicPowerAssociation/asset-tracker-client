import { Redirect } from 'react-router'
import PlaceIcon from '@material-ui/icons/Place'
import Tooltip from '@material-ui/core/Tooltip'
import {
  TOOLTIP_DELAY,
} from '../constants'


        <FormLabel>
        {hasLocation && showCoordinates &&
          <Fragment>
            <Redirect to='/maps' />
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

        {hasLocation &&
          <Chip
            label={<PlaceIcon />}
            className={classes.chip}
            onClick={() => this.setState({showCoordinates: !showCoordinates})}
          />
        }
