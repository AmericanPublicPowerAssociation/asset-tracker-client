import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
// import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'

import {
  getAssetById,
  getAssetTypeByCode,
} from '../selectors'
import { Checkbox } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CircularProgress from '@material-ui/core/CircularProgress'
import {DropzoneArea} from "material-ui-dropzone"
import Grid from "@material-ui/core/Grid"
import {uploadAssetsCsv} from "../actions"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import {ASSET_TYPE_CODE_TRANSFORMER} from "../constants"

export default function ImportExportDialog({
    open,
    onClose,
    onCancel,
    onOk,
}) {
  const dispatch = useDispatch()
  const uploaderProps = {
    acceptedFiles: ['text/csv'],
    filesLimit: 1,
    showPreviewsInDropzone: true,
    showFileNamesInPreview: true,
    showFileNames: true,
    dropzoneText: 'Drag and drop a file or click here',
    useChipsForPreview: true,
    clearOnUnmount: false,
    getDropRejectMessage: (rejectedFile, acceptedFiles, maxFileSize) => {
      return `File ${rejectedFile.name} was rejected. Only supports CSV files.`
    }
  }

  const [powerId, setPowerId] = useState('')
  const [action, setAction] = useState('download')
  const [format, setFormat] = useState('dss')
  const [overwriteRecords, setOverwriteRecords] = useState(false)
  const [assetCSVFile, setAssetCSVFile] = useState(null)
  const [loadingFileIndicator, setLoadingFileIndicator] = useState(false)
  const [confirmOverwriteRecords, setConfirmOverwriteRecords] = useState(false)
  // const { head, data, name } = useSelector(getAssetTableData)
  const assetById = useSelector(getAssetById)
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const data = Object.values(assetById).filter((asset) => asset['typeCode'] === ASSET_TYPE_CODE_TRANSFORMER).map(
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
  function selectAction() {
    if (action === 'download') {
      if (format === 'dss') {
        window.location = `/assets.dss?source=${powerId}`
      }
      if (format === 'csv') {
        window.location = '/assets.csv'
      }
      onClose()
    } else {
      if (overwriteRecords && !confirmOverwriteRecords) {
        setConfirmOverwriteRecords(true)
        return
      }
      console.log(assetCSVFile)
      if (assetCSVFile) {
        dispatch(uploadAssetsCsv({
          file: assetCSVFile,
          overwrite: overwriteRecords,
          close: () => {
            setAssetCSVFile(null)
            setOverwriteRecords(false)
            setConfirmOverwriteRecords(false)
            onClose()
          }
        }))
      }
    }
  }

  const overwriteConfirmation = (<Dialog
    open={confirmOverwriteRecords}
    onClose={() => setConfirmOverwriteRecords(false)}
    disableBackdropClick>
    <DialogTitle>Overwrite all existing assets?</DialogTitle>
    <DialogContent>
      <Typography component='h3'>The existing assets will be replaced and
        it cannot be undone</Typography>
    </DialogContent>
    <DialogActions>
      <Button onClick={() => setConfirmOverwriteRecords(false)}>Cancel</Button>
      <Button onClick={() => {
        selectAction()
      }} color='primary'>Yes, overwrite them</Button>
    </DialogActions>
  </Dialog>)

  const DropzoneInstance = (<DropzoneArea {...uploaderProps} onChange={(file) => setAssetCSVFile(file[0])}/>)


  const actionSelectorDialog =  (<Dialog
        open={open && !confirmOverwriteRecords}
        onClose={onClose}
        disableBackdropClick>
            <DialogTitle>Download Manager</DialogTitle>
            <DialogContent>
                <Typography component='p'>What i want to do?</Typography>
                <FormControl fullWidth>
                  <Select
                    onChange={(e) => setAction(e.target.value)} value={action}
                    input={<Input id='asset-type-select' />}
                  >
                    <MenuItem value='download'>Download Assets</MenuItem>
                    <MenuItem value='upload'>Upload Assets</MenuItem>
                  </Select>
                  { action === 'download' ?
                    <>
                    <Typography component='p'>Select the format</Typography>
                    <Select
                      onChange={(e) => setFormat(e.target.value)} value={format}
                      input={<Input id='asset-type-select' />}>
                      <MenuItem value='dss'>DSS</MenuItem>
                      <MenuItem value='csv'>CSV</MenuItem>
                    </Select> </>: <>
                      {DropzoneInstance}
                      { loadingFileIndicator ? <Grid style={{ marginTop: '20px' }} container align="center"
                                                     justify="center"
                                                     direction="column">
                        <CircularProgress  size={20} />
                        <p>Wait patiently, this could take a while! </p>
                      </Grid> : null}
                      <FormControlLabel control={
                        <Checkbox checked={overwriteRecords}  onChange={() => setOverwriteRecords(!overwriteRecords)} />
                      } label='Overwrite existing records'/>
                    </>
                  }
                  { action === 'download' && format === 'dss' ?
                    <>
                      <Typography component='p'>Select the power source</Typography>
                      <Select
                        onChange={(e) => setPowerId(e.target.value)} value={powerId}
                        input={<Input id='asset-type-select' />}
                      >
                        {data.map((asset) => <MenuItem value={asset.id} key={asset.id}>{asset.name}</MenuItem>)}
                      </Select></> : <></>
                  }
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button disabled={loadingFileIndicator} onClick={onCancel}>Cancel</Button>
                <Button disabled={loadingFileIndicator} onClick={selectAction} color='primary'>Ok</Button>
            </DialogActions>
	    </Dialog>)

    return <>{actionSelectorDialog}{overwriteConfirmation}</>
}
