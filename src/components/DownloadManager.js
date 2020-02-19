import React, { useState } from 'react'
import { useSelector } from 'react-redux'
// import { withStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel"
// import CircularProgress from "@material-ui/core/CircularProgress";
// import Grid from "@material-ui/core/Grid";
// import {TextField} from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
//import InputLabel from '@material-ui/core/InputLabel'
import Typography from "@material-ui/core/Typography"

import {
  getAssetById,
  // getAssetTableData,
  // getAssetsGeoJson,
  getAssetTypeByCode,
} from '../selectors'


export default function DownloadManager(props) {
  const {
    open,
    onClose,
    onCancel,
    onOk
  } = props;

  const [powerId, setPowerId] = useState(null)
  // const { head, data, name } = useSelector(getAssetTableData)
  const assetById = useSelector(getAssetById)
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const data = Object.values(assetById).map(
    asset => {
      const assetType = asset['typeCode']
      const attributes = asset['attributes']
      const vendorName = attributes ? attributes['vendorName'] : ''
      return {
        ...asset,
        vendorName,
        type: assetTypeByCode[assetType]['name'],
      }
  })
    
    return (<Dialog
        open={open}
        onClose={onClose}
        disableBackdropClick>
            <DialogTitle>Download Manager</DialogTitle>
	    
            <DialogContent>
            <Typography component='p'>Select the power source</Typography>
	    <FormControl fullWidth>

	    <NativeSelect
	    onChange={(e) => setPowerId(e.target.value)} value={powerId}
        input={<Input id='asset-type-select' />}
	    >
	    {data.map((asset) => <option value={asset.id} key={asset.id}>{asset.name}</option>)}
       </NativeSelect>
    </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={onCancel}>Cancel</Button>
            <Button onClick={() => onOk(powerId)} color='primary'>Ok</Button>
        </DialogActions>
	    </Dialog>)
}
