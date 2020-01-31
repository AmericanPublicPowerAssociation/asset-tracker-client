import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import SvgIcon from '@material-ui/core/SvgIcon'
import Tooltip from '@material-ui/core/Tooltip'
import {
  SKETCH_MODE_ADD_LINE,
  SKETCH_MODE_ADD_METER,
  SKETCH_MODE_ADD_SUBSTATION,
  SKETCH_MODE_ADD_TRANSFORMER,
} from '../constants'
import {
  ReactComponent as LineIcon
} from '../images/assets/line-16.svg'
import {
  ReactComponent as TransformerIcon
} from '../images/assets/transformer-16.svg'
import {
  ReactComponent as SubstationIcon
} from '../images/assets/substation-16.svg'
import {
  ReactComponent as MeterIcon
} from '../images/assets/meter-light-16.svg'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(34),
    // top: theme.spacing(22),
    left: theme.spacing(1),
  },
}))

export default function SketchAddToolbar(props) {
  const {
    sketchMode,
    setSketchMode,
    onSketchModeAddLine,
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
            onClick={() => {
              setSketchMode(SKETCH_MODE_ADD_LINE)
              onSketchModeAddLine()
            }}
          >
            <SvgIcon
              fontSize='large'
              viewBox='0 0 16 16'
              component={LineIcon}
            />
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
            onClick={() => {
              setSketchMode(SKETCH_MODE_ADD_METER)
            }}
          >
            <SvgIcon fontSize='large' viewBox='0 0 16 16' component={MeterIcon} />
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
            onClick={() => {
              setSketchMode(SKETCH_MODE_ADD_TRANSFORMER)
            }}
          >
            <SvgIcon
              fontSize='large'
              viewBox='0 0 16 16'
              component={TransformerIcon}
            />
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
            onClick={() => {
              setSketchMode(SKETCH_MODE_ADD_SUBSTATION)
            }}
          >
            <SvgIcon
              fontSize='large'
              viewBox='0 0 16 16'
              component={SubstationIcon}
            />
          </ListItem>
        </Tooltip>
      </List>
    </Paper>
  )
}
