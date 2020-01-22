import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import SvgIcon from '@material-ui/core/SvgIcon'
import Tooltip from '@material-ui/core/Tooltip'
import {
  ReactComponent as LineIcon} from '../images/assets/line-16.svg'
import {
  ReactComponent as TransformerIcon} from '../images/assets/transformer-16.svg'
import {
  ReactComponent as SubstationIcon } from '../images/assets/substation-16.svg'
import {
  ADD_LINE,
  ADD_TRANSFORMER,
  ADD_SUBSTATION,
  LINE_ASSET_TYPE_ID,
  TRANSFORMER_ASSET_TYPE_ID,
  SUBSTATION_ASSET_TYPE_ID,
} from '../constants'
import {
  setSelectedFeatureIndexes,
} from '../actions'
import {
  getSketchAssetType,
} from '../selectors'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(22),
    left: theme.spacing(1),
  },
}))

export default function SketchAddToolbar(props) {
  const classes = useStyles()

  const dispatch = useDispatch()
  const sketchAssetType = useSelector(getSketchAssetType)
  const {
    sketchMode,
    setSketchMode,
  } = props
  const isAdding = sketchMode.startsWith('add')

  const _onClick = (sketchMode) => {
    console.log(sketchAssetType)
    if (sketchAssetType === LINE_ASSET_TYPE_ID) {
      dispatch(setSelectedFeatureIndexes([]))
    }
    setSketchMode(sketchMode)
  }


  return (
    <Paper
      className={clsx(classes.root, {
        poof: !isAdding,
      })}
    >
      <List>

        <Tooltip title='Add Line' aria-label='Add Line' placement='right'>
          <ListItem
            button
            classes={{selected: 'selected'}}
            selected={sketchMode === ADD_LINE}
            onClick={() => _onClick(ADD_LINE)}
          >
            <SvgIcon fontSize='large' viewBox='0 0 16 16' component={LineIcon} />
          </ListItem>
        </Tooltip>

        <Tooltip title='Add Transformer' aria-label='Add Transformer' placement='right'>
          <ListItem
            button
            classes={{selected: 'selected'}}
            selected={sketchMode === ADD_TRANSFORMER}
            onClick={() => _onClick(ADD_TRANSFORMER)}
          >
            <SvgIcon fontSize='large' viewBox='0 0 16 16' component={TransformerIcon} />
          </ListItem>
        </Tooltip>

        <Tooltip title='Add Substation' aria-label='Add Substation' placement='right'>
          <ListItem
            button
            classes={{selected: 'selected'}}
            selected={sketchMode === ADD_SUBSTATION}
            onClick={() => _onClick(ADD_SUBSTATION)}
          >
            <SvgIcon fontSize='large' viewBox='0 0 16 16' component={SubstationIcon} />
          </ListItem>
        </Tooltip>

      </List>

    </Paper>
  )
}

