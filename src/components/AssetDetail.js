import React, { useEffect } from 'react'
import clsx from 'clsx'
import { Map } from 'immutable'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import {
  VendorName,
  ProductName,
  ProductVersion,
} from 'asset-report-risks'
import AssetName from './AssetName'
import AssetTasks from './AssetTasks'
import AssetLocation from '../containers/AssetLocation'
import AssetRelationChips from '../containers/AssetRelationChips'


const useStyles = makeStyles(theme => ({
  leadAttribute: {
    margin: `${theme.spacing(6)}px 0 0 0`,
  },
  nextAttribute: {
    margin: `${theme.spacing(3)}px 0 0 0`,
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
    openTaskAddDialog,
    setAddingTaskValue,
    taskById,
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

  const id = focusingAsset.get('id')

  useEffect(() => {
    refreshAssetTasks({id})
  }, [refreshAssetTasks, id])

  if (!id) {
    return null
  }

  const typeId = focusingAsset.get('typeId')
  const name = focusingAsset.get('name')

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
        className={clsx(classes.attribute, {
          [classes.vanish]: !locatable,
        })}
      />

      <AssetTasks
        className={classes.leadAttribute}
        assetId={id}
        taskById={taskById}
        setAddingTaskValue={setAddingTaskValue}
        openTaskAddDialog={openTaskAddDialog}
      />

    {/*
      <AssetCircuit />
    */}

          <VendorName
            className={classes.leadAttribute}
            typeId={typeId}
            vendorName={vendorName}
            trackChanges={trackChanges}
            saveChanges={saveChanges}
          />
          <ProductName
            className={clsx(classes.nextAttribute, {
              [classes.vanish]: unique,
            })}
            typeId={typeId}
            vendorName={vendorName}
            productName={productName}
            trackChanges={trackChanges}
            saveChanges={saveChanges}
          />
          <ProductVersion
            className={clsx(classes.nextAttribute, {
              [classes.vanish]: unique,
            })}
            typeId={typeId}
            vendorName={vendorName}
            productName={productName}
            productVersion={productVersion}
            trackChanges={trackChanges}
            saveChanges={saveChanges}
          />

    {inputTypeByAttribute.entrySeq().map(([attribute, inputType]) => {
      const value = focusingAsset.get(attribute, '')
      return (
          <TextField
            value={value}
            className={classes.nextAttribute}
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

      <AssetRelationChips
        className={classes.leadAttribute}
        label='Connections'
        assetKey='connectedIds'
        relatedAssets={connectedAssets}
      />
      <AssetRelationChips
        className={classes.nextAttribute}
        label='Parents'
        assetKey='parentIds'
        relatedAssets={parentAssets}
      />
      <AssetRelationChips
        className={classes.nextAttribute}
        label='Children'
        assetKey='childIds'
        relatedAssets={childAssets}
      />

    </>
  )
}
