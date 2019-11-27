import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import DeckGL from '@deck.gl/react'
import { EditableGeoJsonLayer } from '@nebula.gl/layers'
import { StaticMap } from 'react-map-gl'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Paper from '@material-ui/core/Paper'
import UserIcon from '@material-ui/icons/AccountCircle'
import SignOutIcon from '@material-ui/icons/LockOpen'
import LayersIcon from '@material-ui/icons/Layers'
import FiltersIcon from '@material-ui/icons/FilterList'
import RowsIcon from '@material-ui/icons/ViewList'
import DetailsIcon from '@material-ui/icons/Visibility'

const TOOLTIP_DELAY_IN_MILLISECONDS = 500

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
    height: theme.spacing(20),
    padding: theme.spacing(1),
    zIndex: 1,
  },
  filtersWindow: {
    position: 'fixed',
    top: theme.spacing(32),
    left: theme.spacing(1),
    width: theme.spacing(20),
    height: theme.spacing(30),
    padding: theme.spacing(1),
    zIndex: 1,
  },
  rowsWindow: {
    position: 'fixed',
    left: theme.spacing(1),
    bottom: theme.spacing(4),
    right: theme.spacing(44),
    height: theme.spacing(30),
    padding: theme.spacing(1),
    zIndex: 1,
  },
  detailsWindow: {
    position: 'fixed',
    top: theme.spacing(8),
    bottom: theme.spacing(4),
    right: theme.spacing(1),
    padding: theme.spacing(1),
    width: theme.spacing(40),
    zIndex: 1,
  },
}))


function App() {
  const classes = useStyles()

  const [geojson, setGeojson] = useState({
    type: 'FeatureCollection',
    features: [],
  }) 
  const [viewState, setViewState] = useState({
    longitude: -73.897052,
    latitude: 40.780474,
    zoom: 15,
  })
  // const [drawMode, setDrawMode] = useState('')

  const layers = []
  layers.push(new EditableGeoJsonLayer({
    id: 'editable-geojson-layer',
    data: geojson,
  }))
  return (
    <>
      <DeckGL viewState={viewState} layers={layers}>
        <StaticMap mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN} />
      </DeckGL>
      <div className={classes.usersWindow}>
        <IconButton>
          <UserIcon />
        </IconButton>
        <IconButton>
          <SignOutIcon />
        </IconButton>
      </div>
      <div className={classes.optionsWindow}>
        <Tooltip title='Layers' enterDelay={TOOLTIP_DELAY_IN_MILLISECONDS}>
          <IconButton>
            <LayersIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Filters' enterDelay={TOOLTIP_DELAY_IN_MILLISECONDS}>
          <IconButton>
            <FiltersIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Rows' enterDelay={TOOLTIP_DELAY_IN_MILLISECONDS}>
          <IconButton>
            <RowsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Details' enterDelay={TOOLTIP_DELAY_IN_MILLISECONDS}>
          <IconButton>
            <DetailsIcon />
          </IconButton>
        </Tooltip>
      </div>
      <Paper className={classes.layersWindow}>
        Layers
      </Paper>
      <Paper className={classes.filtersWindow}>
        Filters
      </Paper>
      <Paper className={classes.rowsWindow}>
        Rows
      </Paper>
      <Paper className={classes.detailsWindow}>
        Details
      </Paper>
    </>
  )
}

export default App

/*
*/
