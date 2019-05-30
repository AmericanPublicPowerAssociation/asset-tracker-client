import React, { Fragment, PureComponent } from 'react'
import classNames from 'classnames'
import { Map, fromJS } from 'immutable'
import { withStyles } from '@material-ui/core/styles'
import {
  VendorName,
  ProductName,
  ProductVersion,
} from 'asset-vulnerability-report'
import AssetName from './AssetName'
import AssetLocation from '../containers/AssetLocation'
import AssetRelationChips from '../containers/AssetRelationChips'
import { ASSET_TYPE_BY_ID } from '../constants'


const styles = theme => ({
  attribute: {
    margin: `${theme.spacing.unit * 3}px 0 0 0`,
  },
  vanish: {
    display: 'none',
  },
})


class AssetDetail extends PureComponent {

  trackChanges = attributes => {
    const { focusingAsset, replaceAsset } = this.props
    replaceAsset(focusingAsset.merge(fromJS(attributes)))
  }

  saveChanges = attributes => {
    let { focusingAsset, changeAsset } = this.props
    if (attributes && !attributes.target) {
      focusingAsset = focusingAsset.merge(fromJS(attributes))
    }
    changeAsset(focusingAsset)
  }

  render() {
    const {
      classes,
      focusingAsset,
      connectedAssets,
      parentAssets,
      childAssets,
    } = this.props
    const id = focusingAsset.get('id')
    if (!id) {
      return null
    }
    const name = focusingAsset.get('name')
    const assetTypeId = focusingAsset.get('typeId')
    const primaryAssetTypeId = assetTypeId[0]
    const primaryAssetType = ASSET_TYPE_BY_ID[primaryAssetTypeId]

    const vendorName = focusingAsset.get('vendorName', '')
    const productName = focusingAsset.get('productName', '')
    const productVersion = focusingAsset.get('productVersion', '')

    const unique = primaryAssetType.unique || false
    const locatable = primaryAssetType['locatable'] || false
    const errors = focusingAsset.get('errors', Map())
    return (
      <Fragment>
        <AssetName
          name={name}
          errorText={errors.get('name')}
          onChange={event => this.trackChanges({name: event.target.value})}
          onBlur={this.saveChanges}
        />
        <VendorName
          className={classes.attribute}
          typeId={assetTypeId}
          vendorName={vendorName}
          trackChanges={this.trackChanges}
          saveChanges={this.saveChanges}
        />
        <ProductName
          className={classNames(classes.attribute, {
            [classes.vanish]: unique,
          })}
          typeId={assetTypeId}
          vendorName={vendorName}
          productName={productName}
          trackChanges={this.trackChanges}
          saveChanges={this.saveChanges}
        />
        <ProductVersion
          className={classNames(classes.attribute, {
            [classes.vanish]: unique,
          })}
          typeId={assetTypeId}
          vendorName={vendorName}
          productName={productName}
          productVersion={productVersion}
          trackChanges={this.trackChanges}
          saveChanges={this.saveChanges}
        />
        <AssetLocation
          className={classNames(classes.attribute, {
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
      </Fragment>
    )
  }
}


export default withStyles(styles)(AssetDetail)
