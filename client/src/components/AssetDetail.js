import React, { PureComponent } from 'react'
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormLabel from '@material-ui/core/FormLabel'
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

    if ((focusingAsset.get('vendorName', null) !== null && prevProps.focusingAsset.get('vendorName', null) === null) || focusingAsset.get('id') !== prevProps.focusingAsset.get('id')) {
      this.setState({
        vendorNameInput: focusingAsset.get('vendorName'),
        productNameInput: focusingAsset.get('productName'),
        versionInput: focusingAsset.get('productVersion'),
      })
    } else if (focusingAsset.get('vendorName') !== prevProps.focusingAsset.get('vendorName')) {
      return 1;
    } else if (focusingAsset.get('productName') !== prevProps.focusingAsset.get('productName')) {
      return 1;
    } else if (focusingAsset.get('productVersion') !== prevProps.focusingAsset.get('productVersion')) {
      return 1;
    } else if (vendorNameInput !== prevState.vendorNameInput && vendorNameInput !== '') {
      fetch(`http://18.206.94.219:5000/vendor_search?type=${type}&vendor=${vendorNameInput}`)
          .then((response)=> {
            response.json()
              .then((hints) => {
                this.setState({
                  vendorSearchHints: hints.map(h => {return {'label': h, 'value': h}})
                })
              })
          })
    } else if (productNameInput !== prevState.productNameInput && productNameInput !== '') {
      fetch(`http://18.206.94.219:5000/product_search?type=${type}&vendor=${vendorNameInput}&product=${productNameInput}`)
          .then((response)=> {
            response.json()
              .then((hints) => {
                this.setState({
                  productSearchHints: hints.map(h => {return {'label': h, 'value': h}})
                })
              })
          })
    } else if (versionInput !== prevState.versionInput && versionInput !== '') {
      fetch(`http://18.206.94.219:5000/version_search?type=${type}&vendor=${vendorNameInput}&product=${productNameInput}&version=${versionInput}`)
          .then((response)=> {
            response.json()
              .then((hints) => {
                this.setState({
                  versionSearchHints: hints.map(h => {return {'label': h, 'value': h}})
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
        <FormLabel>Vendor Name
          <Select
            options={vendorSearchHints}
            inputValue={vendorNameInput}
            defaultInputValue={vendorNameInput}
            className={classes.attribute}
            onChange={option =>
                updateAsset({
                  id: focusingAssetId,
                  vendorName: option.value,
                })
            }
            onInputChange={value => {
                this.setState({
                  vendorNameInput: value,
                })
              }
            }/></FormLabel>
        <FormLabel>Product Name
          <Select
            inputValue={productNameInput}
            defaultInputValue={productNameInput}
            options={productSearchHints}
            className={classes.attribute}
            onChange={option =>
                updateAsset({
                  id: focusingAssetId,
                  productName: option.value,
                })
            }
            onInputChange={value => {
                this.setState({
                  productNameInput: value,
                })
              }
            }/></FormLabel>
        <FormLabel>Product Version
          <Select
            inputValue={versionInput}
            defaultInputValue={versionInput}
            options={versionSearchHints}
            className={classes.attribute}
            onChange={option =>
                updateAsset({
                  id: focusingAssetId,
                  productVersion: option.value,
                })
            }
            onInputChange={value => {
                this.setState({
                  versionInput: value,
                })
              }
            }/></FormLabel>
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
