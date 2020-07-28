import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  searchContainer: {
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.action.disabled}`,
    width: '100%',
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    right: 0,
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.action.disabled,
  },
  inputRoot: {
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 1),
    paddingRight: `calc(1em + ${theme.spacing(1)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}))

export default function SearchBox(props) {
  const classes = useStyles()
  const { updateFunc } = props

  return (
    <div className={classes.searchContainer}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder='Search…'
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </div>
  )
}
