import React, { PureComponent } from 'react'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'


class AssetTypeSelect extends PureComponent {
  render() {
    const {
      assetTypeById,
      ...props
    } = this.props
    return (
      <FormControl fullWidth>
			  <InputLabel htmlFor='asset-type-select'>Asset Type</InputLabel>
        <NativeSelect {...props} input={<Input id='asset-type-select' />} >
        {assetTypeById.entrySeq().map(([id, type]) =>
          <option value={id} key={id}>{type.get('name')}</option> 
        )}
        </NativeSelect>
      </FormControl>
    )
  }
}


export default AssetTypeSelect
