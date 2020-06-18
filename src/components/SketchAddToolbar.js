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
} from '../constants'
import {
  getSketchMode,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(28.5),
    left: theme.spacing(1),
  },
  list: {
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 280px)',
  },
  withTables: {
    bottom: '50%',
  },
}))

const LIST_ITEM_CLASSES = { selected: 'selected' }

export default function SketchAddToolbar({
  isWithTables,
}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const sketchMode = useSelector(getSketchMode)
  const isAdding = sketchMode.startsWith('add')
  return isAdding && (
    <Paper className={classes.root}>
      <List className={clsx(classes.list, {
        isWithTables: classes.withTables,
      })}>
        <Tooltip
          title='Add Pole'
          aria-label='Add Pole'
          placement='right'
        >
          <ListItem
            button
            classes={LIST_ITEM_CLASSES}
            selected={sketchMode === SKETCH_MODE_ADD_POLE}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_POLE))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_POLE} />
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Line'
          aria-label='Add Line'
          placement='right'
        >
          <ListItem
            button
            classes={LIST_ITEM_CLASSES}
            selected={sketchMode === SKETCH_MODE_ADD_LINE}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_LINE))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_LINE} />
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Meter'
          aria-label='Add Meter'
          placement='right'
        >
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_METER}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_METER))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_METER} />
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Transformer'
          aria-label='Add Transformer'
          placement='right'
        >
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_TRANSFORMER}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_TRANSFORMER))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_TRANSFORMER} />
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Switch'
          aria-label='Add Switch'
          placement='right'
        >
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_SWITCH}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_SWITCH))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_SWITCH} />
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Power Quality'
          aria-label='Add Power Quality'
          placement='right'
        >
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_POWER_QUALITY}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_POWER_QUALITY))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_POWER_QUALITY} />
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Control'
          aria-label='Add Control'
          placement='right'
        >
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_CONTROL}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_CONTROL))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_CONTROL} />
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Storage'
          aria-label='Add Storage'
          placement='right'
        >
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_STORAGE}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_STORAGE))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_STORAGE} />
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Generator'
          aria-label='Add Generator'
          placement='right'
        >
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_GENERATOR}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_GENERATOR))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_GENERATOR} />
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Substation'
          aria-label='Add Substation'
          placement='right'
        >
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_SUBSTATION}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_SUBSTATION))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_SUBSTATION} />
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Station'
          aria-label='Add Station'
          placement='right'
        >
          <ListItem
            button
            classes={{ selected: 'selected' }}
            selected={sketchMode === SKETCH_MODE_ADD_STATION}
            onClick={() => dispatch(setSketchMode(SKETCH_MODE_ADD_STATION))}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_STATION} />
          </ListItem>
        </Tooltip>
      </List>
    </Paper>
  )
}
