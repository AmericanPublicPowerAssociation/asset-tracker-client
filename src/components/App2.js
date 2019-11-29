import { ViewMode } from 'nebula.gl'
import Paper from '@material-ui/core/Paper'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import RisksTable from './RisksTable'

import {
  ASSETS,
  GEOJSON,
  RISKS,
  TASKS,
  TOOLTIP_DELAY,
} from '../constants'

const useStyles = makeStyles(theme => ({
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
}))

const assetsMode = {
  'Transformer': 1,
  'Substation': 2,
  'Line': 3
}

const modes = [
  ViewMode,
]

const assets = Object.keys(assetsMode)

function App() {
  const [selectedOverlay, setSelectedOverlay] = useState('Assets')
  const [selectedSketchItemIndexes, setSelectedSketchItemIndexes] = useState([])
  const [selectedSketchAsset, setSelectedSketchAsset] = useState('')
  const [sketchMode, setSketchMode] = useState(0)
  // const [viewState, setViewState] = useState(initialViewState)

  const _onEdit = ({ updatedData, editType, editContext }) => {
    if (editType === 'addFeature'){
      const { featureIndexes } = editContext
      
      featureIndexes.forEach( index => {
        updatedData.features[index].properties['name'] = Math.random().toString(36).substring(2, 6)
        updatedData.features[index].properties['type'] = selectedSketchAsset
      })
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
  // const selectedFeatureIndexes = []
  if (asSketch) {
    layers.push(new EditableGeoJsonLayer({
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
          {geojson.features.map(feature =>
            <TableRow key={feature.properties.id}>
              <TableCell>{feature.properties.name}</TableCell>
              <TableCell>{feature.properties.type}</TableCell>
              <TableCell>{feature.properties.vendor}</TableCell>
              <TableCell>{feature.properties.product}</TableCell>
              <TableCell>{feature.properties.version}</TableCell>
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
      table = <RisksTable risks={RISKS} />
      break
    }
    default:
      break
  }

  return (
    <div>

      <DeckGL
        controller={{
          doubleClickZoom: false
        }}
        onClick={_onLayerClick}>
      </DeckGL>

      <div className={classes.optionsWindow}>

      {!withFilters && !asSketch &&
      }

      {!withRows && !asSketch &&
      }

      </div>

      { asSketch &&
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
      
      { asSketch ||
      <div className={classes.overlaysWindow}>
        {/* TODO: Show counts for what is visible in map after applying filters */}
        <RadioGroup value={selectedOverlay} onChange={e => setSelectedOverlay(e.target.value)}>
          <FormControlLabel value='Assets' control={<Radio />} label={assetsOverlayLabel} />
          <FormControlLabel value='Tasks' control={<Radio />} label={tasksOverlayLabel} />
          <FormControlLabel value='Risks' control={<Radio />} label={risksOverlayLabel} />
        </RadioGroup>
      </div>
      }

    {withFilters && !asSketch &&
      <Paper className={classes.filtersWindow}>
        <CloseIcon className={classes.closeButton} onClick={() => setWithFilters(false)} />
        Filters for {selectedOverlay}
      </Paper>
    }

    {withRows && !asSketch &&
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
          { geojson.features[selectedSketchItemIndexes[0]] ? <p>Asset Name: {geojson.features[selectedSketchItemIndexes[0]].properties.name}</p> : <p>Select Something</p>
        }
      </Paper>
    }

    </div>
  )
}
