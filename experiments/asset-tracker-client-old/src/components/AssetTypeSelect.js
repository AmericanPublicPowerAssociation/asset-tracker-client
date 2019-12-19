import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'


export default function AssetTypeSelect(props) {
  const {
    assetTypeById,
    ...selectProps
  } = props

  let assets = []
  assetTypeById.entrySeq().forEach(([id, type]) => {
    assets.push(<option value={id} key={id}>{type.get('name')}</option>)
    if (type.get('nameById')) {
      type.get('nameById').entrySeq().forEach(([key, text]) => {
        if (key !== 'X') // Omit Other
          assets.push(<option value={id + key} key={id + key}>{`${type.get('name')} - ${text}`}</option>)
      })
    }
  });

  return (
    <FormControl fullWidth>
      <InputLabel htmlFor='asset-type-select'>Asset Type</InputLabel>
      <NativeSelect
        {...selectProps}
        input={<Input id='asset-type-select' />}
      >
        {assets}
      </NativeSelect>
    </FormControl>
  )
}
