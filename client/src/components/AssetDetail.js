import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import FormLabel from '@material-ui/core/FormLabel'
import Input from '@material-ui/core/Input'
import Downshift from 'downshift'
import deburr from 'lodash/deburr'
import { ASSET_TYPE_BY_ID } from '../constants'
import AssetName from './AssetName'
import AssetLocationContainer from '../containers/AssetLocationContainer'
import AssetRelationChips from './AssetRelationChips'

const styles = theme => ({
  attribute: {
    margin: `${theme.spacing.unit * 3}px 0 0 0`,
  },
})

const vendorNameSuggestions = [
  {label: 'Schneider Electric'},
  {label: 'Schweitzer Engineering Laboratories'},
]

class AssetDetail extends PureComponent {
  state = {
    vendorNameValue: '',
  }

  render() {
    const {
      classes,
      focusingAsset,
      relatingAssetId,
      relatingAssetKey,
      connectedAssets,
      parentAssets,
      childAssets,
      setRelatingAsset,
      updateAsset,
    } = this.props
    const {
      vendorNameValue,
    } = this.state
    const focusingAssetId = focusingAsset.get('id');
    if (!focusingAssetId) return null
    const focusingAssetTypeId = focusingAsset.get('typeId')
    const focusingAssetType = ASSET_TYPE_BY_ID[focusingAssetTypeId]
    const locatable = focusingAssetType['locatable'] || false
    const vendorName = focusingAsset.get('vendorName', '')

    const assetRelationChipsProps = {
      focusingAsset: focusingAsset,
      relatingAssetId: relatingAssetId,
      relatingAssetKey: relatingAssetKey,
      setRelatingAsset: setRelatingAsset,
    }
    return (
      <div>
        <AssetName
          focusingAsset={focusingAsset}
          updateAsset={updateAsset}
        />
        {locatable && <AssetLocationContainer />}
        <AssetRelationChips
          label='Connections'
          assetKey='connectedIds'
          relatedAssets={connectedAssets}
          {...assetRelationChipsProps}
        />
        <AssetRelationChips
          label='Parents'
          assetKey='parentIds'
          relatedAssets={parentAssets}
          {...assetRelationChipsProps}
        />
        <AssetRelationChips
          label='Children'
          assetKey='childIds'
          relatedAssets={childAssets}
          {...assetRelationChipsProps}
        />
        <Downshift
          inputValue={vendorNameValue || vendorName}
          onChange={value => updateAsset({
            id: focusingAssetId,
            vendorName: value,
          })}
          onInputValueChange={value => this.setState({vendorNameValue: value})}
        >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          inputValue,
          isOpen,
        }) => (
          <div className={classes.attribute}>
            <FormLabel {...getLabelProps()}>Vendor Name</FormLabel>
            <Input fullWidth {...getInputProps()} />
            <div {...getMenuProps()}>
            {isOpen &&
              <Paper square>
              {
                vendorNameSuggestions
                  .filter(suggestion => !inputValue || suggestion.label.toLowerCase().includes(
                    deburr(inputValue.trim()).toLowerCase()))
                  .map((suggestion, index) => {
                    const label = suggestion.label
                    return (
                      <MenuItem
                        {...getItemProps({item: label})}
                        key={label}
                      >{label}</MenuItem>
                    )
                  })
              }
              </Paper>}
            </div>
          </div>
        )}
        </Downshift>

        {/*
          label='Product Name'
          label='Product Version'
        */}
      </div>
    )
  }
}

export default withStyles(styles)(AssetDetail)
