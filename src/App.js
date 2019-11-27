import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DeckGL from '@deck.gl/react'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { StaticMap } from 'react-map-gl'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'

import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import CloseIcon from '@material-ui/icons/Close'
import UserIcon from '@material-ui/icons/AccountCircle'
import SignOutIcon from '@material-ui/icons/LockOpen'
import FiltersIcon from '@material-ui/icons/FilterList'
import RowsIcon from '@material-ui/icons/ViewList'
import DetailsIcon from '@material-ui/icons/Visibility'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const TOOLTIP_DELAY = 500

const useStyles = makeStyles(theme => ({
  usersWindow: {
    position: 'fixed',
    top: 0,
    right: 0,
    padding: theme.spacing(1),
  },
  optionsWindow: {
    position: 'fixed',
    top: 0,
    left: 0,
    padding: theme.spacing(1),
  },
  layersWindow: {
    position: 'fixed',
    top: theme.spacing(8),
    left: theme.spacing(1),
    width: theme.spacing(20),
    padding: theme.spacing(1),
    zIndex: 1,
  },
  filtersWindow: {
    position: 'fixed',
    top: theme.spacing(30),
    left: theme.spacing(1),
    bottom: theme.spacing(5),
    width: theme.spacing(30),
    padding: theme.spacing(1),
    zIndex: 1,
  },
  rowsWindow: {
    position: 'fixed',
    left: theme.spacing(34),
    bottom: theme.spacing(5),
    right: theme.spacing(34),
    height: theme.spacing(30),
    padding: theme.spacing(1),
    zIndex: 1,
  },
  detailsWindow: {
    position: 'fixed',
    top: theme.spacing(8),
    bottom: theme.spacing(5),
    right: theme.spacing(1),
    padding: theme.spacing(1),
    width: theme.spacing(30),
    zIndex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    margin: theme.spacing(1),
    cursor: 'pointer',
  },
}))


const userName = 'Alex Hofmann'
const initialGeojson = {
  type: 'FeatureCollection',
  features: [],
}
const initialViewState = {
  longitude: -73.897052,
  latitude: 40.780474,
  zoom: 15,
}


function App() {
  const classes = useStyles()

  const [withFilters, setWithFilters] = useState(true)
  const [withRows, setWithRows] = useState(true)
  const [withDetails, setWithDetails] = useState(true)
  // const [geojson, setGeojson] = useState(initialGeojson)
  // const [viewState, setViewState] = useState(initialViewState)
  // const [drawMode, setDrawMode] = useState('')

  const layers = []
  layers.push(new EditableGeoJsonLayer({
    id: 'editable-geojson-layer',
    data: initialGeojson,
  }))
  return (
    <div>

      <DeckGL initialViewState={initialViewState} controller={true} layers={layers}>
        <StaticMap mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} />
      </DeckGL>

      <div className={classes.usersWindow}>
        <Tooltip title={userName} enterDelay={TOOLTIP_DELAY}>
          <IconButton>
            <UserIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Sign Out' enterDelay={TOOLTIP_DELAY}>
          <IconButton>
            <SignOutIcon />
          </IconButton>
        </Tooltip>
      </div>

      <div className={classes.optionsWindow}>

      {!withFilters &&
        <Tooltip title='Filters' enterDelay={TOOLTIP_DELAY}>
          <IconButton onClick={() => setWithFilters(true)}>
            <FiltersIcon />
          </IconButton>
        </Tooltip>
      }

      {!withRows &&
        <Tooltip title='Rows' enterDelay={TOOLTIP_DELAY}>
          <IconButton onClick={() => setWithRows(true)}>
            <RowsIcon />
          </IconButton>
        </Tooltip>
      }

      {!withDetails &&
        <Tooltip title='Details' enterDelay={TOOLTIP_DELAY}>
          <IconButton onClick={() => setWithDetails(true)}>
            <DetailsIcon />
          </IconButton>
        </Tooltip>
      }

      </div>

      <div className={classes.layersWindow}>
        <RadioGroup>
          <FormControlLabel value="assets" control={<Radio />} label="Assets" />
          <FormControlLabel value="tasks" control={<Radio />} label="Tasks" />
          <FormControlLabel value="risks" control={<Radio />} label="Risks" />
        </RadioGroup>
      </div>

    {withFilters &&
      <Paper className={classes.filtersWindow}>
        <CloseIcon className={classes.closeButton} onClick={() => setWithFilters(false)} />
        Filters
      </Paper>
    }

    {withRows &&
      <Paper className={classes.rowsWindow}>

        <CloseIcon className={classes.closeButton} onClick={() => setWithRows(false)} />

        <div>
        </div>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>A</TableCell>
              <TableCell>B</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell>a</TableCell>
              <TableCell>b</TableCell>
            </TableRow>
          </TableBody>
        </Table>

      </Paper>
    }

    {withDetails &&
      <Paper className={classes.detailsWindow}>
        <CloseIcon className={classes.closeButton} onClick={() => setWithDetails(false)} />
        Details
      </Paper>
    }

    </div>
  )
}

export default App
