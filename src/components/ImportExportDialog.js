import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'

import {
  getAssetById,
  getAssetTypeByCode,
} from '../selectors'


export default function ImportExportDialog(props) {
  const {
    open,
    onClose,
    onCancel,
    onOk,
  } = props

  const [powerId, setPowerId] = useState('')
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
  if (data !== null && data !== undefined && data.length > 0 && powerId === '') {
    setPowerId(data[0].id)
  }
    
	
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
