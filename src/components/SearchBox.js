import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import Box from '@material-ui/core/Box'
import ClearIcon from '@material-ui/icons/Clear'
import IconButton from '@material-ui/core/IconButton'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles(theme => ({
  search: {
    display: 'flex',
    flexGrow: 1,
  },
  input: {
    marginLeft: theme.spacing(1),
    flexGrow: 1,
  },
  iconButton: {
    padding: 0,
    margin: 0,
    color: theme.palette.action.disabled,
  },
}))

export default function SearchBox(props) {
  const classes = useStyles()
  const {
    updateInputTextFunc,
    input = '',
    isShowBackButton,
    onBackButtonClick,
  } = props

  function clearInput(e) {
    input && updateInputTextFunc('')
  }
  return (
    <Box display='flex' flexDirection='row' alignItems='center' pr={1} pl={1} pt={1}>
      {
        isShowBackButton && 
          <IconButton className={classes.iconButton} onClick={onBackButtonClick}>
            <ArrowBackIosIcon />
          </IconButton>
      }
      <Paper variant='outlined' className={classes.search}>
        <InputBase
          value={input}
          placeholder='Search…'
          className={classes.input}
          onChange={(e) => updateInputTextFunc(e.target.value)}
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton className={classes.iconButton} onClick={clearInput}>
        { input ? <ClearIcon /> : <SearchIcon /> }
        </IconButton>
      </Paper>
    </Box>
  )
}
