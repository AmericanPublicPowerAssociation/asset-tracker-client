import React, { PureComponent } from 'react'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import InputLabel from '@material-ui/core/InputLabel'
import Input from '@material-ui/core/Input'
import { ASSET_TYPE_BY_ID } from '../constants'

class AssetTypeSelect extends PureComponent {
	render() {
		const {
			value,
			onChange,
		} = this.props
		return (
			<FormControl>
			  <InputLabel htmlFor='asset-type-select'>Asset Type</InputLabel>
				<NativeSelect
					value={value}
					onChange={onChange}
					input={<Input id='asset-type-select' />}
				>
				{Object.entries(ASSET_TYPE_BY_ID).map(([id, {name}]) =>
					<option key={id} value={id}>{name}</option>
				)}
				</NativeSelect>
			</FormControl>
		)
	}
}

export default AssetTypeSelect
