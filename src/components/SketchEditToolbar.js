import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import SvgIcon from '@material-ui/core/SvgIcon'
import OpenWithIcon from '@material-ui/icons/OpenWith';
import Tooltip from '@material-ui/core/Tooltip'
import EditIcon from '@material-ui/icons/Edit';
import {
  SKETCHING_MODE_EDIT,
} from '../constants'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(45),
    left: theme.spacing(1),
  },
  selected: {
    color: 'white',
    backgroundColor: `${theme.palette.secondary.light} !important`,
  },
}))

function SketchEditToolbar(props) {
  const classes = useStyles()
  const {
    isSketching,
    sketchingMode,
    sketchingEditType,
    setSketchingEditType,
    setSelectedFeatureIndexes,
  } = props

  return (
    <Paper
      className={clsx(classes.root, {
        poof: !isSketching || sketchingMode !== SKETCHING_MODE_EDIT,
      })}
    >
      <List 
        component='nav'
        subheader={
          <ListSubheader component='div'>
            {/*'Add Asset List'.toUpperCase()*/}
          </ListSubheader>
        }>

        <Tooltip title="Edit Asset" placement='right' aria-label="Edit Asset">
          <ListItem
            classes={{selected: classes.selected}}
            button
            selected={sketchingEditType === 'm'}
            onClick={() => {
              setSketchingEditType('m')
            }}
          >
            <SvgIcon fontSize='large' component={EditIcon} />
            {/*<ListItemText primary='Line' />*/}
          </ListItem>
        </Tooltip>

        <Tooltip title='Move Asset' placement='right' aria-label='Move Asset'>
          <ListItem
            classes={{selected: classes.selected}}
            button
            selected={sketchingEditType === 't'}
            onClick={() => {
              setSketchingEditType('t')
            }}
          >
            <SvgIcon fontSize='large' component={OpenWithIcon} />
          </ListItem>
        </Tooltip>

      </List>
    </Paper>
  )
}

export default SketchEditToolbar
