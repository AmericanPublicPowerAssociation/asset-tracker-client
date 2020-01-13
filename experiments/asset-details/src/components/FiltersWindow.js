import React from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CloseButton from './CloseButton'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(29),
    left: theme.spacing(1),
    bottom: theme.spacing(38),
    width: theme.spacing(30),
    padding: theme.spacing(1),
  },
}))

function FiltersWindow(props) {
  const classes = useStyles()
  const { isSketching, isWithFilters, setIsWithFilters } = props
  return (
    <Paper
      className={clsx(classes.root, {
        poof: isSketching || !isWithFilters,
      })}
    >
      <CloseButton onClick={() => setIsWithFilters(false)} />
      <Typography>
        Filters
      </Typography>
    </Paper>
  )
}

export default FiltersWindow
