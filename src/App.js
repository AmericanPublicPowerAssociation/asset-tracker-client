import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DeckGL from '@deck.gl/react'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { StaticMap } from 'react-map-gl'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'
import Fab from '@material-ui/core/Fab';

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
const ASSETS = [{
  id: 'akM1',
  name: 'High Voltage Transformer 1',
  type: 'tp',
  vendor: 'Schneider Electric',
  product: 'HVT36A',
  version: '2.0.1',
}, {
  id: 'anZQ',
  name: 'Meter 1',
  type: 'm',
  vendor: 'ITRON',
  product: '6219399',
  version: '7.9.5',
}]
const TASKS = [{
  id: 1,
  name: 'Clean Transformer',
  status: 50,
}, {
  id: 2,
  name: 'Reset Meter',
  status: 0,
}]
const RISKS = [{
  id: 1,
  name: 'Open Port',
  meterCount: 5,
  assetId: 'anZQ',
}, {
  id: 2,
  name: 'Voltage Too High',
  meterCount: 2,
  assetId: 'akM1',
}]

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
  overlaysWindow: {
    position: 'fixed',
    top: theme.spacing(8),
    left: theme.spacing(1),
    width: theme.spacing(20),
    padding: theme.spacing(1),
    zIndex: 1,
  },
  filtersWindow: {
    position: 'fixed',
    top: theme.spacing(29),
    left: theme.spacing(1),
    bottom: theme.spacing(38),
    width: theme.spacing(30),
    padding: theme.spacing(1),
    zIndex: 1,
  },
  rowsWindow: {
    position: 'fixed',
    left: theme.spacing(1),
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

  const [sketch, setSketch] = useState(false)
  const [selectedOverlay, setSelectedOverlay] = useState('Assets')
  const [withFilters, setWithFilters] = useState(true)
  const [withRows, setWithRows] = useState(true)
  const [withDetails, setWithDetails] = useState(true)
  // const [geojson, setGeojson] = useState(initialGeojson)
  // const [viewState, setViewState] = useState(initialViewState)
  // const [drawMode, setDrawMode] = useState('')

  const layers = []
  if (sketch) {
    layers.push(new EditableGeoJsonLayer({
      id: 'editable-geojson-layer',
      data: initialGeojson,
    }))
  }

  const visibleAssetCount = ASSETS.length
  const visibleTaskCount = TASKS.length
  const visibleRiskCount = RISKS.length

  const assetsOverlayLabel = `Assets (${visibleAssetCount})`
  const tasksOverlayLabel = `Tasks (${visibleTaskCount})`
  const risksOverlayLabel = `Risks (${visibleRiskCount})`

  let table
  switch(selectedOverlay) {
    case 'Assets': {
      table = (
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Asset</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Version</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {ASSETS.map(asset => 
            <TableRow>
              <TableCell>{asset.name}</TableCell>
              <TableCell>{asset.type}</TableCell>
              <TableCell>{asset.vendor}</TableCell>
              <TableCell>{asset.product}</TableCell>
              <TableCell>{asset.version}</TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      )
      break
    }
    case 'Tasks': {
      table = (
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {TASKS.map(task =>
            <TableRow>
              <TableCell>{task.name}</TableCell>
              <TableCell>{{
                0: 'New',
                50: 'In Progress',
              }[task.status]}</TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      )
      break
    }
    case 'Risks': {
      table = (
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Risk</TableCell>
              <TableCell>Asset</TableCell>
              <TableCell>Customers</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {RISKS.map(risk =>
            <TableRow>
              <TableCell>{risk.name}</TableCell>
              <TableCell>{risk.assetId}</TableCell>
              <TableCell>{risk.meterCount}</TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      )
      break
    }
    default:
      break
  }

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

      <div>
        { sketch || 
        <Fab
          variant="extended"
          color='secondary'
          onClick={ () => setSketch(true)}>
          Sketch
        </Fab>
        }
        { sketch && 
        <Fab
          variant="extended"
          color='secondary'
          onClick={ () => setSketch(false)}>
          Exit
        </Fab>
        }

      </div>

      <div className={classes.overlaysWindow}>
        {/* TODO: Show counts for what is visible in map after applying filters */}
        <RadioGroup value={selectedOverlay} onChange={e => setSelectedOverlay(e.target.value)}>
          <FormControlLabel value='Assets' control={<Radio />} label={assetsOverlayLabel} />
          <FormControlLabel value='Tasks' control={<Radio />} label={tasksOverlayLabel} />
          <FormControlLabel value='Risks' control={<Radio />} label={risksOverlayLabel} />
        </RadioGroup>
      </div>

    {withFilters &&
      <Paper className={classes.filtersWindow}>
        <CloseIcon className={classes.closeButton} onClick={() => setWithFilters(false)} />
        Filters for {selectedOverlay}
      </Paper>
    }

    {withRows &&
      <Paper className={classes.rowsWindow}>
        <CloseIcon className={classes.closeButton} onClick={() => setWithRows(false)} />
        {/* TODO: Show only what is visible in the map */}
        {/* TODO: Implement paging */}
        {table}
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
