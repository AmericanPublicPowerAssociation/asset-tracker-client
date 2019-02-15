import React, { PureComponent } from 'react'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { ASSET_TYPE_BY_ID } from '../constants'

class AssetTypeRadioButtons extends PureComponent {
  handleChange = event => {
    const { onAssetTypeClick } = this.props
    onAssetTypeClick({id: event.target.value})
  }

  render() {
    const {
      selectedAssetTypeId,
    } = this.props
    return (
      <RadioGroup
        value={selectedAssetTypeId}
        onChange={this.handleChange}
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
}

export default AssetTypeRadioButtons
