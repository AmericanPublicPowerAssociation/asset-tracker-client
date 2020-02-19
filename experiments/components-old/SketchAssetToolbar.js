import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
// import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import SvgIcon from '@material-ui/core/SvgIcon'
import Tooltip from '@material-ui/core/Tooltip'
import { ReactComponent as Substation } from '../images/assets/substation-16.svg'
import { ReactComponent as Transformer } from '../images/assets/transformer-16.svg'
import { ReactComponent as Line } from '../images/assets/line-16.svg'
import { ReactComponent as Bus } from '../images/assets/busbar-16.svg'
import {
  SKETCHING_MODE_ADD,
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

function SketchAssetToolbar(props) {
  const classes = useStyles()
  const {
    isSketching,
    sketchingMode,
    sketchingAssetType,
    setSketchingAssetType,
    setSelectedFeatureIndexes,
  } = props
  // console.log('a', sketchingAssetType)
  // console.log('s', isSketching)
  return (
    <Paper
      className={clsx(classes.root, {
        poof: !isSketching || sketchingMode !== SKETCHING_MODE_ADD,
      })}
    >
      <List 
        component='nav'
        subheader={
          <ListSubheader component='div'>
            {/*'Add Asset List'.toUpperCase()*/}
          </ListSubheader>
        }>

        <Tooltip title="Add Line" placement='right' aria-label="Add Line">
          <ListItem
            classes={{selected: classes.selected}}
            button
            selected={sketchingAssetType === 'l'}
            onClick={() => {
              if (sketchingAssetType !== 'l') {
                setSelectedFeatureIndexes([])
              }
              setSketchingAssetType('l')
            }}
          >
            <SvgIcon fontSize='large' viewBox='0 0 17 17' component={Line} />
            {/*<ListItemText primary='Line' />*/}
          </ListItem>
        </Tooltip>

      </List>
    </Paper>
  )
}

export default SketchAssetToolbar
