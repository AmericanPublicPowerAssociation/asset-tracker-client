import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import { ASSET_TYPE_BY_ID } from '../constants'
import AssetName from './AssetName'
import AssetLocationContainer from '../containers/AssetLocationContainer'
import AssetRelationChips from './AssetRelationChips'

const styles = theme => ({
  attribute: {
    margin: `${theme.spacing.unit * 3}px 0 0 0`,
  },
})

class AssetDetail extends PureComponent {
  onSubmit = event => event.preventDefault()

  state = {
    vendorNameInput: '',
    vendorSearchHints: [],
    productNameInput: '',
    productSearchHints: [],
    versionInput: '',
    versionSearchHints: [],
  }

  componentDidUpdate(prevProps, prevState) {
    const {vendorNameInput, productNameInput, versionInput} = this.state;
    const {focusingAsset} = this.props;
    const focusingAssetTypeId = focusingAsset.get('typeId')
    if (!focusingAssetTypeId) return null
    const type = ASSET_TYPE_BY_ID[focusingAssetTypeId]
    if (focusingAsset.get('vendorName', null) !== null && prevProps.focusingAsset.get('vendorName', null) === null) {
      this.setState({
        vendorNameInput: focusingAsset.get('vendorName'),
        productNameInput: focusingAsset.get('productName'),
        versionInput: focusingAsset.get('productVersion'),
      })
    } else if (vendorNameInput !== prevState.vendorNameInput && vendorNameInput !== '') {
      fetch(`http://18.206.94.219:5000/vendor_search?type=${type}&vendor=${vendorNameInput}`)
          .then((response)=> {
            response.json()
              .then((hints) => {
                this.setState({
                  vendorSearchHints: hints
                })
              })
          })
    } else if (productNameInput !== prevState.productNameInput && productNameInput !== '') {
      fetch(`http://18.206.94.219:5000/product_search?type=${type}&vendor=${vendorNameInput}&product=${productNameInput}`)
          .then((response)=> {
            response.json()
              .then((hints) => {
                this.setState({
                  productSearchHints: hints
                })
              })
          })
    } else if (versionInput !== prevState.versionInput && versionInput !== '') {
      fetch(`http://18.206.94.219:5000/version_search?type=${type}&vendor=${vendorNameInput}&product=${productNameInput}&version=${versionInput}`)
          .then((response)=> {
            response.json()
              .then((hints) => {
                this.setState({
                  versionSearchHints: hints
                })
              })
          })
    }
  }

  render() {
    const {
      vendorNameInput,
      vendorSearchHints,
      productNameInput,
      productSearchHints,
      versionInput,
      versionSearchHints
    } = this.state;
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
    } = this.props;
    const focusingAssetTypeId = focusingAsset.get('typeId');
    if (!focusingAssetTypeId) return null;
    const focusingAssetType = ASSET_TYPE_BY_ID[focusingAssetTypeId];
    const locatable = focusingAssetType['locatable'] || false;
    const assetRelationChipsProps = {
      focusingAsset: focusingAsset,
      relatingAssetId: relatingAssetId,
      relatingAssetKey: relatingAssetKey,
      setRelatingAsset: setRelatingAsset,
    };

    const focusingAssetId = focusingAsset.get('id');

    return (
      <form onSubmit={this.onSubmit}>
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
        <TextField
          label='Vendor Name'
          value={vendorNameInput}
          fullWidth
          className={classes.attribute}
          onChange={event => {
              this.setState({
                vendorNameInput: event.target.value,
              })
              /*
              updateAsset({
                id: focusingAssetId,
                vendorName: event.target.value,
              })
              */
            }
          }/>
        <TextField
          label='Product Name'
          value={productNameInput}
          fullWidth
          className={classes.attribute}
          onChange={event => {
              this.setState({
                productNameInput: event.target.value,
              })
              /*
              updateAsset({
                id: focusingAssetId,
                productName: event.target.value,
              })
              */
            }
          }/>
        <TextField
          label='Product Version'
          value={versionInput}
          fullWidth
          className={classes.attribute}
          onChange={event => {
              this.setState({
                versionInput: event.target.value,
              })
              /*
              updateAsset({
                id: focusingAssetId,
                productVersion: event.target.value,
              })
              */
            }
          }/>
        <TextField
          label='kW'
          value={focusingAsset.get('kW')}
          type='number'
          fullWidth
          className={classes.attribute}
          onChange={event => updateAsset({
            id: focusingAssetId,
            kW: event.target.value,
          })}
          />
      </form>
    )
  }
}

export default withStyles(styles)(AssetDetail)
