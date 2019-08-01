import React, { PureComponent } from 'react'
import clsx from 'clsx'
import { Map } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import {
  VendorName,
  ProductName,
  ProductVersion,
} from 'asset-vulnerability-report'
import AssetName from './AssetName'
import AssetLocation from '../containers/AssetLocation'
import AssetRelationChips from '../containers/AssetRelationChips'


const styles = theme => ({
  attribute: {
    margin: `${theme.spacing(3)}px 0 0 0`,
  },
  vanish: {
    display: 'none',
  },
})


class AssetDetail extends PureComponent {

  trackChanges = attributes => {
    const { focusingAsset, mergeAsset } = this.props
    const id = focusingAsset.get('id')
    mergeAsset({id, ...attributes})
  }

  saveChanges = attributes => {
    let { focusingAsset, changeAsset } = this.props
    const id = focusingAsset.get('id')
    changeAsset({id, ...attributes})
  }

  render() {
    const {
      classes,
      focusingAsset,
      focusingAssetType,
      connectedAssets,
      parentAssets,
      childAssets,
    } = this.props
    const id = focusingAsset.get('id')
    if (!id) {
      return null
    }

    const name = focusingAsset.get('name')
    const typeId = focusingAsset.get('typeId')
    const vendorName = focusingAsset.get('vendorName', '')
    const productName = focusingAsset.get('productName', '')
    const productVersion = focusingAsset.get('productVersion', '')

    const unique = focusingAssetType.get('unique', false)
    const locatable = focusingAssetType.get('locatable', false)
    const errors = focusingAsset.get('errors', Map())

    return (
      <>
        <AssetName
          name={name}
          errorText={errors.get('name')}
          inputProps={{
            style: {fontSize: '2rem'},
          }}
          onChange={event => this.trackChanges({name: event.target.value})}
          onBlur={() => this.saveChanges({name})}
        />
        {/* <AssetCircuit /> */}
        <VendorName
          className={classes.attribute}
          typeId={typeId}
          vendorName={vendorName}
          trackChanges={this.trackChanges}
          saveChanges={this.saveChanges}
        />
        <ProductName
          className={clsx(classes.attribute, {
            [classes.vanish]: unique,
          })}
          typeId={typeId}
          vendorName={vendorName}
          productName={productName}
          trackChanges={this.trackChanges}
          saveChanges={this.saveChanges}
        />
        <ProductVersion
          className={clsx(classes.attribute, {
            [classes.vanish]: unique,
          })}
          typeId={typeId}
          vendorName={vendorName}
          productName={productName}
          productVersion={productVersion}
          trackChanges={this.trackChanges}
          saveChanges={this.saveChanges}
        />
        <AssetLocation
          className={clsx(classes.attribute, {
            [classes.vanish]: !locatable,
          })}
        />
        <AssetRelationChips
          className={classes.attribute}
          label='Connections'
          assetKey='connectedIds'
          relatedAssets={connectedAssets}
        />
        <AssetRelationChips
          className={classes.attribute}
          label='Parents'
          assetKey='parentIds'
          relatedAssets={parentAssets}
        />
        <AssetRelationChips
          className={classes.attribute}
          label='Children'
          assetKey='childIds'
          relatedAssets={childAssets}
        />
      </>
    )
  }
}


export default withStyles(styles)(AssetDetail)
