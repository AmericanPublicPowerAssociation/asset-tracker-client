import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import AssetTypeSvgIcon from './AssetTypeSvgIcon'
import {
  ASSET_TYPE_CODE_LINE,
  ASSET_TYPE_CODE_METER,
  ASSET_TYPE_CODE_SUBSTATION,
  ASSET_TYPE_CODE_TRANSFORMER,
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_TRANSFORMER,
} from '../constants'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(28.5),
    left: theme.spacing(1),
  },
}))

export default function SketchAddToolbar(props) {
  const {
    sketchMode,
    changeSketchMode,
  } = props
  const classes = useStyles()
  const isAdding = sketchMode.startsWith('add')
  return (
    <Paper className={clsx(classes.root, {poof: !isAdding})}>
      <List>
        <Tooltip
          title='Add Line'
          aria-label='Add Line'
          placement='right'
        >
          <ListItem
            button
            classes={{selected: 'selected'}}
            selected={sketchMode === SKETCH_MODE_ADD_LINE}
            onClick={() => changeSketchMode(SKETCH_MODE_ADD_LINE)}
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
            classes={{selected: 'selected'}}
            selected={sketchMode === SKETCH_MODE_ADD_METER}
            onClick={() => changeSketchMode(SKETCH_MODE_ADD_METER)}
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
            classes={{selected: 'selected'}}
            selected={sketchMode === SKETCH_MODE_ADD_TRANSFORMER}
            onClick={() => changeSketchMode(SKETCH_MODE_ADD_TRANSFORMER)}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_TRANSFORMER} />
          </ListItem>
        </Tooltip>

        <Tooltip
          title='Add Substation'
          aria-label='Add Substation'
          placement='right'
        >
          <ListItem
            button
            classes={{selected: 'selected'}}
            selected={sketchMode === SKETCH_MODE_ADD_SUBSTATION}
            onClick={() => changeSketchMode(SKETCH_MODE_ADD_SUBSTATION)}
          >
            <AssetTypeSvgIcon assetTypeCode={ASSET_TYPE_CODE_SUBSTATION} />
          </ListItem>
        </Tooltip>
      </List>
    </Paper>
  )
}
