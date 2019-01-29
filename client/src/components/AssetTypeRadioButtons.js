import React from 'react'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { ASSET_TYPES } from '../constants'

const AssetTypeRadioButtons = props => {
  const { selectedAssetTypeId } = props
  const { onAssetTypeClick } = props

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
        disabled={!['0', '1', '5', '7'].includes(x.id)}
      />
    ))}
    </RadioGroup>
  )
}

export default AssetTypeRadioButtons
