import React, { useEffect } from 'react'
import clsx from 'clsx'
import { Map } from 'immutable'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {
  ProductName,
  ProductVersion,
  VendorName,
} from 'asset-report-risks'
import AssetName from './AssetName'
import AssetTasks from './AssetTasks'
import AssetLocation from '../containers/AssetLocation'
import AssetRelationChips from '../containers/AssetRelationChips'
import Button from '@material-ui/core/Button'
import FormLabel from "@material-ui/core/FormLabel"
import Link from "@material-ui/core/Link"
import FormControl from "@material-ui/core/FormControl"

const useStyles = makeStyles(theme => ({
  singleSpacing: {
    margin: `${theme.spacing(3)}px 0 0 0`,
  },
  doubleSpacing: {
    margin: `${theme.spacing(6)}px 0 0 0`,
  },
  vanish: {
    display: 'none',
  },
}))


export default function AssetDetail(props) {
  const classes = useStyles()
  const {
    focusingAsset,
    focusingAssetType,
    connectedAssets,
    parentAssets,
    childAssets,
    refreshAssetTasks,
    openTaskEditDialog,
    setEditingTaskValues,
    taskById,
    updateShape,
  } = props

  function trackChanges(attributes) {
    const { focusingAsset, mergeAsset } = props
    const id = focusingAsset.get('id')
    mergeAsset({id, ...attributes})
  }

  function saveChanges(attributes) {
    let { focusingAsset, changeAsset } = props
    const id = focusingAsset.get('id')
    changeAsset({id, ...attributes})
  }

  function saveShape(event) {
    let { focusingAsset, changeAsset } = props
    const id = focusingAsset.get('id')
    if (event.target.files.length > 0)
      updateShape({id, file: event.target.files[0]})
  }

  const id = focusingAsset.get('id')

  useEffect(() => {
    refreshAssetTasks({id})
  }, [refreshAssetTasks, id])

  if (!id) {
    return null
  }

  const typeId = focusingAsset.get('typeId')
  const name = focusingAsset.get('name')
  const shape = focusingAsset.get('shape')

  const vendorName = focusingAsset.get('vendorName', null)
  const productName = focusingAsset.get('productName', null)
  const productVersion = focusingAsset.get('productVersion', null)

  const unique = focusingAssetType.get('unique', false)
  const locatable = focusingAssetType.get('locatable', false)
  const inputTypeByAttribute = focusingAssetType.get(
    'inputTypeByAttribute', Map())
  const errors = focusingAsset.get('errors', Map())

  return (
    <>
      <AssetName
        name={name}
        errorText={errors.get('name')}
        inputProps={{
          style: {fontSize: '2rem'},
        }}
        onChange={event => trackChanges({name: event.target.value})}
        onBlur={() => saveChanges({name})}
      />

      <AssetLocation
        className={clsx(classes.doubleSpacing, {
          [classes.vanish]: !locatable,
        })}
      />

      <AssetTasks
        className={classes.doubleSpacing}
        assetId={id}
        taskById={taskById}
        setEditingTaskValues={setEditingTaskValues}
        openTaskEditDialog={openTaskEditDialog}
      />

    {/*
      <AssetCircuit />
    */}

      <div className={classes.singleSpacing}>
        <VendorName
          className={classes.singleSpacing}
          typeId={typeId}
          vendorName={vendorName}
          trackChanges={trackChanges}
          saveChanges={saveChanges}
        />
        <ProductName
          className={clsx(classes.singleSpacing, {
            [classes.vanish]: unique,
          })}
          typeId={typeId}
          vendorName={vendorName}
          productName={productName}
          trackChanges={trackChanges}
          saveChanges={saveChanges}
        />
        <ProductVersion
          className={clsx(classes.singleSpacing, {
            [classes.vanish]: unique,
          })}
          typeId={typeId}
          vendorName={vendorName}
          productName={productName}
          productVersion={productVersion}
          trackChanges={trackChanges}
          saveChanges={saveChanges}
        />
      </div>

      <div className={classes.singleSpacing}>
  {inputTypeByAttribute.entrySeq().map(([attribute, inputType]) => {
    const value = focusingAsset.get(attribute, '')
    return (
        <TextField
          fullWidth
          value={value}
          className={classes.singleSpacing}
          label={attribute}
          type={inputType}
          key={attribute}
          onChange={event => {
            let v = event.target.value
            if (inputType === 'number') {
              v = parseFloat(v)
            }
            trackChanges({[attribute]: v})
          }}
          onBlur={() => saveChanges({
            [attribute]: value})}
        />
    )
  })}
      </div>

      <div className={classes.singleSpacing}>
        <AssetRelationChips
          className={classes.singleSpacing}
          label='Connections'
          assetKey='connectedIds'
          relatedAssets={connectedAssets}
        />
        <AssetRelationChips
          className={classes.singleSpacing}
          label='Parents'
          assetKey='parentIds'
          relatedAssets={parentAssets}
        />
        <AssetRelationChips
          className={classes.singleSpacing}
          label='Children'
          assetKey='childIds'
          relatedAssets={childAssets}
        />
        <FormControl fullWidth className={classes.singleSpacing}>
          <FormLabel>Load shape</FormLabel>
          {shape ? <Link href={`/assets/${id}/shape.csv`} >
            shapefile.csv
          </Link> : <></>}
          <div>
            <Button variant="contained"
                    containerElement='label' // <-- Just add me!
                    label='My Label'>
              <input type="file" onChange={saveShape} />
            </Button>
          </div>
        </FormControl>
      </div>

    </>
  )
}
