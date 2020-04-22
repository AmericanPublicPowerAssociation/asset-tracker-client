import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import Typography from "@material-ui/core/Typography"
import Uppy from '@uppy/core'
import { DragDrop, ProgressBar } from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/drag-drop/dist/style.css'
import '@uppy/progress-bar/dist/style.css'

import {
  getAssetById,
  getAssetTypeByCode,
} from '../selectors'
import {Checkbox} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";


export default function DownloadManager(props) {
  const {
    open,
    onClose,
    onCancel,
    onOk,
    uppy
  } = props;

  const [powerId, setPowerId] = useState('')
  const [action, setAction] = useState('download')
  const [format, setFormat] = useState('dss')
  const [overwriteRecords, setOverwriteRecords] = useState(false)
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
                <Typography component='p'>What i want to do?</Typography>
                <FormControl fullWidth>
                  <NativeSelect
                    onChange={(e) => setAction(e.target.value)} value={action}
                    input={<Input id='asset-type-select' />}
                  >
                    <option value='download'>Download Assets</option>
                    <option value='upload'>Upload Assets</option>
                  </NativeSelect>
                  { action === 'download' ?
                    <>
                    <Typography component='p'>Select the format</Typography>
                    <NativeSelect
                      onChange={(e) => setFormat(e.target.value)} value={format}
                      input={<Input id='asset-type-select' />}>
                      <option value='dss'>DSS</option>
                      <option value='csv'>CSV</option>
                    </NativeSelect> </>: <>
                      <DragDrop
                      uppy={uppy}
                      locale={{
                        strings: {
                          // Text to show on the droppable area.
                          // `%{browse}` is replaced with a link that opens the system file selection dialog.
                          dropHereOr: 'Drop here or %{browse}',
                          // Used as the label for the link that opens the system file selection dialog.
                          browse: 'browse'
                        }
                      }}
                    />
                      <FormControlLabel control={
                        <Checkbox checked={overwriteRecords}  onChange={() => setOverwriteRecords(!overwriteRecords)} />
                      } label='Overwrite existing records'/>
                    </>
                  }
                  { action === 'download' && format === 'dss' ?
                    <>
                      <Typography component='p'>Select the power source</Typography>
                      <NativeSelect
                        onChange={(e) => setPowerId(e.target.value)} value={powerId}
                        input={<Input id='asset-type-select' />}
                      >
                        {data.map((asset) => <option value={asset.id} key={asset.id}>{asset.name}</option>)}
                      </NativeSelect></> : <></>
                  }
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={() => onOk(action, format, powerId, {
                  files: uppy.getFiles(),
                  overwrite: overwriteRecords
                })} color='primary'>Ok</Button>
            </DialogActions>
	    </Dialog>)
}
