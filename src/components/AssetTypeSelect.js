import React, { PureComponent } from 'react'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { ASSET_TYPE_BY_ID } from '../constants'


class AssetTypeSelect extends PureComponent {
  render() {
    const {
      ...props
    } = this.props
    return (
      <FormControl fullWidth>
			  <InputLabel htmlFor='asset-type-select'>Asset Type</InputLabel>
        <NativeSelect {...props} input={<Input id='asset-type-select' />} >
        {Object.entries(ASSET_TYPE_BY_ID).map(([id, {name}]) =>
          <option value={id} key={id}>{name}</option> 
        )}
        </NativeSelect>
      </FormControl>
    )
  }
}


export default AssetTypeSelect
