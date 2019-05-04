import React, { PureComponent } from 'react'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import { ASSET_TYPE_BY_ID } from '../constants'

class AssetFilter extends PureComponent {
	render() {
		const {
			selectedAssetTypeIds,
			setSelectedAssetTypes,
		} = this.props
		return (
      <FormControl>
				<Select
					fullWidth
					multiple
          value={selectedAssetTypeIds.toJS()}
          onChange={event => setSelectedAssetTypes({ids: event.target.value})}
					renderValue={selected => (
						<div>
            {selected.map(value =>
              <Chip key={value} label={ASSET_TYPE_BY_ID[value]['name']} 
								style={{ marginLeft: '4px' }}
							/>
            )}
						</div>
					)}
				>
				{Object.entries(ASSET_TYPE_BY_ID).map(([id, {name}]) =>
          <MenuItem key={id} value={id}>
						<Checkbox checked={selectedAssetTypeIds.toJS().indexOf(id) > -1} />
							<ListItemText primary={name} />
					</MenuItem>
				)}
				</Select>
      </FormControl>
		)
	}
}


export default AssetFilter
