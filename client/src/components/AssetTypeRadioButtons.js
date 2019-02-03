import React from 'react'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { ASSET_TYPES } from '../constants'

const AssetTypeRadioButtons = ({
  selectedAssetTypeId,
  onAssetTypeClick,
}) => {
  return (
    <RadioGroup
      value={selectedAssetTypeId}
      onChange={event => onAssetTypeClick(event.target.value)}
    >
    {ASSET_TYPES.map(x => (
      <FormControlLabel
        control={<Radio />}
        value={x.id}
        label={x.name}
      />
    ))}
    </RadioGroup>
  )
}

export default AssetTypeRadioButtons
