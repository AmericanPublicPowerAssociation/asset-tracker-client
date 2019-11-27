import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DeckGL from '@deck.gl/react'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { DrawPointMode, DrawPolygonMode, DrawLineStringMode, ViewMode } from 'nebula.gl'
import { StaticMap } from 'react-map-gl'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'

import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import StopIcon from '@material-ui/icons/Stop'
import CloseIcon from '@material-ui/icons/Close'
import SeeUserIcon from '@material-ui/icons/AccountCircle'
import SignOutIcon from '@material-ui/icons/LockOpen'
import SketchAssetsIcon from '@material-ui/icons/Gesture'
import SeeFiltersIcon from '@material-ui/icons/FilterList'
import SeeRowsIcon from '@material-ui/icons/ViewList'
import SeeDetailsIcon from '@material-ui/icons/Visibility'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

const TOOLTIP_DELAY = 500
const ASSETS = [{
  id: 'akM1',
  name: 'High Voltage Transformer 1',
  geometry: {
    type: 'Point',
    coordinates: [-73.89756698413085, 40.782009430441526],
  },
  type: 'tp',
  vendor: 'Schneider Electric',
  product: 'HVT36A',
  version: '2.0.1',
}, {
  id: 'anZQ',
  name: 'Meter 1',
  geometry: {
    type: 'Point',
    coordinates: [-73.89679450793457, 40.78119703780428],
  },
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
  sketchButton: {
    position: 'fixed',
    top: theme.spacing(1),
    left: '50%',
    transform: 'translateX(-50%)',
  },
  overlaysWindow: {
    position: 'fixed',
    top: theme.spacing(8),
    left: theme.spacing(1),
    width: theme.spacing(20),
    padding: theme.spacing(1),
    zIndex: 1,
  },
  assetList: {
    position: 'fixed',
    top: theme.spacing(29),
    left: theme.spacing(1),
    zIndex: 1,
    textAlign: 'center',
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

const assetsMode = {
  'Transformer': 1,
  'Substation': 2,
  'Line': 3
}

const modes = [
  ViewMode,
  DrawPointMode,
  DrawPolygonMode,
  DrawLineStringMode
]

const assets = Object.keys(assetsMode)

function App() {
  const classes = useStyles()

  // const [asSketch, setAsSketch] = useState(false)
  const [selectedOverlay, setSelectedOverlay] = useState('Assets')
  const [withFilters, setWithFilters] = useState(true)
  const [withRows, setWithRows] = useState(true)
  const [withDetails, setWithDetails] = useState(true)
  const [sketch, setSketch] = useState(false)
  const [geojson, setGeojson] = useState(initialGeojson)
  const [selectedSketchItemIndexes, setSelectedSketchItemIndexes] = useState([])
  const [selectedSketchAsset, setSelectedSketchAsset] = useState('')
  const [sketchMode, setSketchMode] = useState(0)
  // const [viewState, setViewState] = useState(initialViewState)

  const _onEdit = ({ updatedData, editType, editContext }) => {
    if (editType === 'addFeature'){
      const { featureIndexes } = editContext

      setSelectedSketchItemIndexes( [...selectedSketchItemIndexes, ...featureIndexes])
    }
    setGeojson(updatedData)
  }

  const _onLayerClick = (event) => {
    if (event.index > -1){
      setSelectedSketchItemIndexes([event.index])
    }
  }

  const layers = []
  const selectedFeatureIndexes = []
  if (sketch) {
    layers.push(new EditableGeoJsonLayer({
      id: 'editable-geojson-layer',
      data: geojson,
      selectedFeatureIndexes: selectedSketchItemIndexes,
      onEdit: _onEdit,
      mode: modes[sketchMode],
      editHandlePointRadiusScale: 2,
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
            <TableRow key={asset.id}>
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
            <TableRow key={task.id}>
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
            <TableRow key={risk.id}>
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

      <DeckGL
        initialViewState={initialViewState}
        controller={{
          doubleClickZoom: false
        }}
        layers={layers}
        onClick={_onLayerClick}>
        <StaticMap mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} />
      </DeckGL>

      <div className={classes.usersWindow}>
        <Tooltip title={userName} enterDelay={TOOLTIP_DELAY}>
          <IconButton>
            <SeeUserIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title='Sign Out' enterDelay={TOOLTIP_DELAY}>
          <IconButton>
            <SignOutIcon />
          </IconButton>
        </Tooltip>
      </div>

      <div className={classes.optionsWindow}>

      {/*
      {sketch ?
        <Tooltip title='Stop Sketching' enterDelay={TOOLTIP_DELAY}>
          <IconButton color='secondary' onClick={() => setAsSketch(false)}>
            <StopIcon />
          </IconButton>
        </Tooltip>
        :
        <Tooltip title='Sketch Assets' enterDelay={TOOLTIP_DELAY}>
          <IconButton color='secondary' onClick={() => setAsSketch(true)}>
            <SketchAssetsIcon />
          </IconButton>
        </Tooltip>
      }
      */}

      {!withFilters && !sketch &&
        <Tooltip title='Filters' enterDelay={TOOLTIP_DELAY}>
          <IconButton onClick={() => setWithFilters(true)}>
            <SeeFiltersIcon />
          </IconButton>
        </Tooltip>
      }

      {!withRows && !sketch &&
        <Tooltip title='Rows' enterDelay={TOOLTIP_DELAY}>
          <IconButton onClick={() => setWithRows(true)}>
            <SeeRowsIcon />
          </IconButton>
        </Tooltip>
      }

      {!withDetails &&
        <Tooltip title='See Details' enterDelay={TOOLTIP_DELAY}>
          <IconButton onClick={() => setWithDetails(true)}>
            <SeeDetailsIcon />
          </IconButton>
        </Tooltip>
      }

      </div>

      <div>
        <Fab
          className={classes.sketchButton}
          variant="extended"
          color='secondary'
          onClick={ () => {
            setSketch(!sketch)
          }} >
          { sketch ? 'Exit' : 'Sketch'}
        </Fab>
      </div>

      { sketch &&
        <Paper className={classes.assetList}>
          <List subheader={<ListSubheader>ASSETS</ListSubheader>}>
            { assets.map( (asset) => (
              <ListItem
                selected={asset === selectedSketchAsset}
                onClick={() => {
                  const modeIndex = assetsMode[asset]
                  setSelectedSketchAsset(asset)
                  setSketchMode(modeIndex)
                  if (asset === 'Line')
                    setSelectedSketchItemIndexes([])
                }}>
                <ListItemText primary={asset}/>
              </ListItem>
              ))
            }
          </List>
          <List subheader={<ListSubheader>EDIT MODE</ListSubheader>}>
            <ListItem
              selected={ sketchMode === 0}
              onClick={() => {
                setSketchMode(0)
                setSelectedSketchItemIndexes([])
                setSelectedSketchAsset('')
              }}>
              <ListItemText primary="Select"/>
            </ListItem>
          </List>
        </Paper>
      }
      
      { sketch ||
      <div className={classes.overlaysWindow}>
        {/* TODO: Show counts for what is visible in map after applying filters */}
        <RadioGroup value={selectedOverlay} onChange={e => setSelectedOverlay(e.target.value)}>
          <FormControlLabel value='Assets' control={<Radio />} label={assetsOverlayLabel} />
          <FormControlLabel value='Tasks' control={<Radio />} label={tasksOverlayLabel} />
          <FormControlLabel value='Risks' control={<Radio />} label={risksOverlayLabel} />
        </RadioGroup>
      </div>
      }

    {withFilters && !sketch &&
      <Paper className={classes.filtersWindow}>
        <CloseIcon className={classes.closeButton} onClick={() => setWithFilters(false)} />
        Filters for {selectedOverlay}
      </Paper>
    }

    {withRows && !sketch &&
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
