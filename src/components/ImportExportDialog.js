import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Typography from '@material-ui/core/Typography'
import { DropzoneArea } from 'material-ui-dropzone'
import ImportResponseDialog from './ImportResponseDialog'
import { uploadAssetsCsv } from '../actions'
import { ASSET_TYPE_CODE_TRANSFORMER } from '../constants'
import {
  getAssetById,
  getAssetTypeByCode,
} from '../selectors'

const uploaderProps = {
  acceptedFiles: [
    '.csv',
    'text/csv',
    'application/vnd.ms-excel',
    'application/csv',
    'text/x-csv',
    'application/x-csv',
    'text/comma-separated-values',
    'text/x-comma-separated-values',
  ],
  filesLimit: 1,
  showPreviewsInDropzone: true,
  showFileNamesInPreview: true,
  showFileNames: true,
  dropzoneText: 'Drag and drop a file or click here',
  useChipsForPreview: true,
  clearOnUnmount: false,
  getDropRejectMessage: (rejectedFile, acceptedFiles, maxFileSize) => {
    return `File ${rejectedFile.name} was rejected. Only supports CSV files.`
  },
}

export default function ImportExportDialog({
  isOpen,
  onClose,
  onCancel,
}) {
  const dispatch = useDispatch()
  const [action, setAction] = useState('download')
  const [sourceId, setSourceId] = useState('')
  const [downloadFormat, setDownloadFormat] = useState('csv')
  const [overwriteRecords, setOverwriteRecords] = useState(false)
  const [assetCSVFile, setAssetCSVFile] = useState(null)
  const [
    loadingFileIndicator,
    // setLoadingFileIndicator,
  ] = useState(false)
  const [confirmOverwriteRecords, setConfirmOverwriteRecords] = useState(false)
  const [uploadResponse, setUploadResponse] = useState()
  const assetById = useSelector(getAssetById)
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const data = Object.entries(assetById)
    .reduce((assetArray, [assetId, asset]) => {
      const assetType = asset['typeCode']
      const attributes = asset['attributes']
      const vendorName = attributes ? attributes['vendorName'] : ''
      assetArray.push({
        ...asset,
        id: assetId,
        vendorName,
        type: assetTypeByCode[assetType]['name'],
      })
      return assetArray
    }, [])
    .filter(asset => asset['typeCode'] === ASSET_TYPE_CODE_TRANSFORMER)

  if (data !== null && data !== undefined && data.length > 0 && sourceId === '') {
    setSourceId(data[0].id)
  }

  
  function selectAction() {
    if (action === 'download') {
      if (downloadFormat === 'dss') {
        window.location = `/assets.dss?sourceId=${sourceId}`
      } else if (downloadFormat === 'csv') {
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
          onClose: (response) => {
            setAssetCSVFile(null)
            setOverwriteRecords(false)
            setConfirmOverwriteRecords(false)
            setUploadResponse(response)
            // onClose()
          },
        }))
      }
    }
  }

  const OverwriteConfirmationDialog = (
    <Dialog
      open={confirmOverwriteRecords}
      disableBackdropClick 
      onClose={() => setConfirmOverwriteRecords(false)} >
      <DialogTitle>Overwrite all existing assets?</DialogTitle>
      <DialogContent>
        <Typography component='h3'>
          The existing assets will be replaced and it cannot be undone.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setConfirmOverwriteRecords(false)}>
          Cancel
        </Button>
        <Button color='primary'
          onClick={() => selectAction()} >
          Yes, overwrite them
        </Button>
      </DialogActions>
    </Dialog>
  )


  const SelectDownloadFormatComponent = (
    <>
      <Typography component='p'>Select the format</Typography>
      <Select value={downloadFormat}
        onChange={e => setDownloadFormat(e.target.value)}
        input={<Input id='asset-type-select' />}>
        <MenuItem value='csv'>CSV</MenuItem>
        <MenuItem value='dss'>DSS</MenuItem>
      </Select>
    </>
  )

  const DropzoneInstance = (
    <DropzoneArea {...uploaderProps} onChange={(file) => setAssetCSVFile(file[0])} />
  )

  const UploadFileComponent = (
    <>
      {DropzoneInstance}
      {loadingFileIndicator && 
        <Grid container align="center" justify="center" direction="column"
          style={{ marginTop: '20px' }} >
          <CircularProgress  size={20} />
          <p>Wait patiently, this could take a while! </p>
        </Grid>
      }
      <FormControlLabel label='Overwrite existing records'
        control={
          <Checkbox checked={overwriteRecords}
            onChange={() => setOverwriteRecords(!overwriteRecords)} />
        }
      />
    </>
  )

  const SelectDssPowerSource = (
    <>
      <Typography component='p'>Select the power source</Typography>
      <Select
        onChange={e => setSourceId(e.target.value)} value={sourceId}
        input={<Input id='asset-type-select' />} >
        { data.map(asset => <MenuItem value={asset.id} key={asset.id}>{asset.name}</MenuItem>) }
      </Select>
    </>
  )

  const ActionSelectorDialog =  (
    <Dialog
      open={isOpen && !confirmOverwriteRecords && !uploadResponse}
      onClose={onClose}
      disableBackdropClick >
      <DialogTitle>Download Manager</DialogTitle>
      <DialogContent>
        <Typography component='p'>What I want to do?</Typography>
        <FormControl fullWidth>
          <Select
            onChange={(e) => setAction(e.target.value)} value={action}
            input={<Input id='asset-type-select' />} >
            <MenuItem value='download'>Download Assets</MenuItem>
            <MenuItem value='upload'>Upload Assets</MenuItem>
          </Select>
          { action === 'download' ?
            SelectDownloadFormatComponent :
            UploadFileComponent
          }
          { action === 'download' && downloadFormat === 'dss' ? SelectDssPowerSource : <></> }
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button disabled={loadingFileIndicator} onClick={onCancel}>Cancel</Button>
        <Button disabled={loadingFileIndicator} onClick={selectAction} color='primary'>Ok</Button>
      </DialogActions>
	  </Dialog>
  )

    return (
      <>
        { ActionSelectorDialog }
        { OverwriteConfirmationDialog }
        { uploadResponse && 
          <ImportResponseDialog
            open={true}
            response={uploadResponse}
            onClose={(() => {
              setUploadResponse()
              onClose()
            })}
          />
        }
      </>
    )
}
