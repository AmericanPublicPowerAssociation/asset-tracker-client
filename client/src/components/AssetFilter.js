import React, { PureComponent } from 'react'
import classNames from 'classnames'
import Chip from '@material-ui/core/Chip'
import FormControl from '@material-ui/core/FormControl'
import Checkbox from '@material-ui/core/Checkbox'
import ListItemText from '@material-ui/core/ListItemText'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import { ASSET_TYPE_BY_ID } from '../constants'

const styles = theme => ({
})

class AssetFilter extends PureComponent {

	state = {
    assetTypeId: [],
	}

  handleChangeMultiple = event => {
    const { options } = event.target
    const value = []
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value)
      }
    }
    this.setState({
      assetTypeId: value,
    })
  }

	render() {
		const {
			selectedAssetTypeIds,
			onAssetTypeClick,
		} = this.props
		return (
      <FormControl>
				<Select
					multiple
					value={this.state.assetTypeId}
          onChange={event => this.setState({assetTypeId: event.target.value})}
					// value={selectedAssetTypeIds.toJS()}
					// onChange={event => onAssetTypeClick({id: event.target.value})}

					renderValue={selected => (
						// <div className={classes.chips}>
						<div>
							{selected.map(value => {
								return (
								<Chip key={value} label={ASSET_TYPE_BY_ID[value]['name']}
									// className={classes.chip}
								/>
							)})}
						</div>
					)}

				>
				{Object.entries(ASSET_TYPE_BY_ID).map(([id, {name}]) =>
          <MenuItem key={id} value={id}>
						<Checkbox checked={this.state.assetTypeId.indexOf(id) > -1} />
						{/*
						<Checkbox checked={selectedAssetTypeIds.toJS().indexOf(id) > -1} />
						*/}
							<ListItemText primary={name} />
					</MenuItem>
				)}
				</Select>
      </FormControl>
		)
	}
}


export default AssetFilter

/*
					renderValue={selected => (
						<div className={classes.chips}>
							{selected.map(value => (
								<Chip key={value} label={value}  />
							))}
						</div>
					)}
					MenuProps={MenuProps}
*/

