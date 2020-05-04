import React from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import {
  setAssetValue,
} from '../actions'
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

const useStyles = makeStyles(theme => ({
  input: {
    lineHeight: 1.5,
    padding: '0 !important',
  },
  inline: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))

export default function AssetName(props) {
  const theme = useTheme();
  const {
    asset,
    isEditing,
    setExpand,
    expand
  } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  const assetId = asset.id
  const isMobileView = useMediaQuery(theme.breakpoints.down('sm'));
  const assetName = asset.name

  function handleChange(event) {
    dispatch(setAssetValue(assetId, 'name', event.target.value))
  }

  const expandIcon = (expand ?
    <ExpandMore onClick={() => setExpand(false)} /> :
    <ExpandLess onClick={() => setExpand(true)} />)

  return (isEditing ?
    <><TextField
      onChange={handleChange}
      value={assetName}
      multiline={true}
      variant='filled'
      InputProps={{
        className: classes.input,
      }}
    /> {isMobileView ? expandIcon : <></>}
    </>:
    <div className={classes.inline}>
      <Typography>
      {assetName}
    </Typography>
      { isMobileView ? expandIcon : <></>}
      </div>
  )
}
