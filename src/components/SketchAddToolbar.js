// TODO: Review from scratch

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import {
  setSketchMode,
} from '../actions'
import {
  ASSET_TYPE_CODE_CONTROL,
  ASSET_TYPE_CODE_GENERATOR,
  ASSET_TYPE_CODE_LINE,
  ASSET_TYPE_CODE_METER,
  ASSET_TYPE_CODE_POLE,
  ASSET_TYPE_CODE_POWER_QUALITY,
  ASSET_TYPE_CODE_STATION,
  ASSET_TYPE_CODE_STORAGE,
  ASSET_TYPE_CODE_SUBSTATION,
  ASSET_TYPE_CODE_SWITCH,
  ASSET_TYPE_CODE_TRANSFORMER,
  COLORS_BY_ASSET,
  SKETCH_MODE_ADD_CONTROL,
  SKETCH_MODE_ADD_GENERATOR,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_POLE,
  SKETCH_MODE_ADD_POWER_QUALITY,
  SKETCH_MODE_ADD_STATION,
  SKETCH_MODE_ADD_STORAGE,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_SWITCH,
  SKETCH_MODE_ADD_TRANSFORMER,
  SKETCH_MODE_EDIT,
  SKETCH_MODE_VIEW,
} from '../constants'
import {
  getSketchMode,
} from '../selectors'

const baseAssetIcon = {
  display: 'flex',
  flexDirection: 'column',
  fontSize: '11px',
  fontWeight: 'bold',
  paddingLeft: '4px',
  paddingRight: '4px',
  paddingTop: '4px',
  paddingBottom: '4px',
}

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    // top: theme.spacing(30),
    top: theme.spacing(6),
    left: theme.spacing(1),
  },
  list: {
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 280px)',
  },
  withTables: {
    maxHeight: 'calc(100vh - 556px)',
  },
  meterRightIndicator: {
    borderRight: `5px solid rgba(${COLORS_BY_ASSET['dark'][ASSET_TYPE_CODE_METER]})`,
    borderBottom: '2px solid #EAEAEA',
    ...baseAssetIcon,
  },
  transformerRightIndicator: {
    borderRight: `5px solid rgba(${COLORS_BY_ASSET['dark'][ASSET_TYPE_CODE_TRANSFORMER]})`,
    borderBottom: '2px solid #EAEAEA',
    ...baseAssetIcon,
  },
  lineRightIndicator: {
    borderRight: `5px solid rgba(${COLORS_BY_ASSET['dark'][ASSET_TYPE_CODE_LINE]})`,
    borderBottom: '2px solid #EAEAEA',
    ...baseAssetIcon,
  },
  poleRightIndicator: {
    borderRight: `5px solid rgba(${COLORS_BY_ASSET['dark'][ASSET_TYPE_CODE_POLE]})`,
    borderBottom: '2px solid #EAEAEA',
    ...baseAssetIcon,
  },
  switchRightIndicator: {
    borderRight: `5px solid rgba(${COLORS_BY_ASSET['dark'][ASSET_TYPE_CODE_SWITCH]})`,
    borderBottom: '2px solid #EAEAEA',
    ...baseAssetIcon,
  },
  powerRightIndicator: {
    borderRight: `5px solid rgba(${COLORS_BY_ASSET['dark'][ASSET_TYPE_CODE_POWER_QUALITY]})`,
    borderBottom: '2px solid #EAEAEA',
    ...baseAssetIcon,
  },
  controlRightIndicator: {
    borderRight: `5px solid rgba(${COLORS_BY_ASSET['dark'][ASSET_TYPE_CODE_CONTROL]})`,
    borderBottom: '2px solid #EAEAEA',
    ...baseAssetIcon,
  },
  storageRightIndicator: {
    borderRight: `5px solid rgba(${COLORS_BY_ASSET['dark'][ASSET_TYPE_CODE_STORAGE]})`,
    borderBottom: '2px solid #EAEAEA',
    ...baseAssetIcon,
  },
  generatorRightIndicator: {
    borderRight: `5px solid rgba(${COLORS_BY_ASSET['dark'][ASSET_TYPE_CODE_GENERATOR]})`,
    borderBottom: '2px solid #EAEAEA',
    ...baseAssetIcon,
  },
  substationRightIndicator: {
    borderRight: `5px solid rgba(${COLORS_BY_ASSET['dark'][ASSET_TYPE_CODE_SUBSTATION]})`,
    borderBottom: '2px solid #EAEAEA',
    ...baseAssetIcon,
  },
  stationRightIndicator: {
    borderRight: `5px solid rgba(${COLORS_BY_ASSET['dark'][ASSET_TYPE_CODE_STATION]})`,
    ...baseAssetIcon,
  },
}))

const LIST_ITEM_CLASSES = { selected: 'selected' }

export default function SketchAddToolbar({
  isWithTables,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const sketchMode = useSelector(getSketchMode)
  const isViewing = sketchMode === SKETCH_MODE_VIEW
  return !isViewing && (
    <Paper className={classes.root}>
      <List
        onKeyUp= {() => dispatch(setSketchMode(SKETCH_MODE_EDIT))}
        className={clsx(classes.list, {
          [classes.withTables]: isWithTables,
        })}
      >
        <Tooltip
          title='Add Pole'
          aria-label='Add Pole'
          placement='right'
        >
          <ListItem
            button
            className={classes.poleRightIndicator}
            classes={LIST_ITEM_CLASSES}
            selected={sketchMode === SKETCH_MODE_ADD_POLE}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_POLE))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_POLE} />
            <span>Pole</span>
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Line'
          aria-label='Add Line'
          placement='right'
        >
          <ListItem
            button
            className={classes.lineRightIndicator}
            classes={LIST_ITEM_CLASSES}
            selected={sketchMode === SKETCH_MODE_ADD_LINE}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_LINE))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_LINE} />
            <span>Line</span>
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Meter'
          aria-label='Add Meter'
          placement='right'
        >
          <ListItem
            button
            className={classes.meterRightIndicator}
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_METER}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_METER))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_METER} />
            <span>Meter</span>
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Transformer'
          aria-label='Add Transformer'
          placement='right'
        >
          <ListItem
            button
            className={classes.transformerRightIndicator}
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_TRANSFORMER}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_TRANSFORMER))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_TRANSFORMER} />
            <span>Tran...mer</span>
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Switch'
          aria-label='Add Switch'
          placement='right'
        >
          <ListItem
            button
            className={classes.switchRightIndicator}
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_SWITCH}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_SWITCH))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_SWITCH} />
            <span>Switch</span>
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Power Quality'
          aria-label='Add Power Quality'
          placement='right'
        >
          <ListItem
            button
            className={classes.powerRightIndicator}
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_POWER_QUALITY}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_POWER_QUALITY))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_POWER_QUALITY} />
            <span>Power</span>
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Control'
          aria-label='Add Control'
          placement='right'
        >
          <ListItem
            button
            className={classes.controlRightIndicator}
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_CONTROL}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_CONTROL))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_CONTROL} />
            <span>Control</span>
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Storage'
          aria-label='Add Storage'
          placement='right'
        >
          <ListItem
            button
            className={classes.storageRightIndicator}
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_STORAGE}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_STORAGE))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_STORAGE} />
            <span>Storage</span>
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Generator'
          aria-label='Add Generator'
          placement='right'
        >
          <ListItem
            button
            className={classes.generatorRightIndicator}
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_GENERATOR}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_GENERATOR))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_GENERATOR} />
            <span>Generator</span>
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Substation'
          aria-label='Add Substation'
          placement='right'
        >
          <ListItem
            button
            className={classes.substationRightIndicator}
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_SUBSTATION}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_SUBSTATION))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_SUBSTATION} />
            <span>Substation</span>
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Station'
          aria-label='Add Station'
          placement='right'
        >
          <ListItem
            button
            className={classes.stationRightIndicator}
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_STATION}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_STATION))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_STATION} />
            <span>Station</span>
          </ListItem>
        </Tooltip>
      </List>
    </Paper>
  )
}
