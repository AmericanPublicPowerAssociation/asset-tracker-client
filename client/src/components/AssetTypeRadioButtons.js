import React from 'react'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { ASSET_TYPE_BY_ID } from '../constants'

const AssetTypeRadioButtons = ({
  selectedAssetTypeId,
  onAssetTypeClick,
}) => {
  return (
    <RadioGroup
      value={selectedAssetTypeId}
      onChange={event => onAssetTypeClick({id: event.target.value})}
    >
    {Object.entries(ASSET_TYPE_BY_ID).map(([id, {name}]) =>
      <FormControlLabel
        control={<Radio />}
        value={id}
        label={name}
      />
    )}
    </RadioGroup>
  )
}

export default AssetTypeRadioButtons
