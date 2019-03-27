import React, { PureComponent } from 'react'
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import FormLabel from '@material-ui/core/FormLabel'
import { ASSET_TYPE_BY_ID } from '../constants'
import AssetName from './AssetName'
import AssetLocationContainer from '../containers/AssetLocationContainer'
import AssetRelationChips from './AssetRelationChips'
import Downshift from 'downshift';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

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
      console.log('swqitching')
      this.setState({
        vendorNameInput: focusingAsset.get('vendorName', ''),
        productNameInput: focusingAsset.get('productName', ''),
        versionInput: focusingAsset.get('productVersion', ''),
      })
    } else if (focusingAsset.get('vendorName') !== prevProps.focusingAsset.get('vendorName')) {
      this.setState({
        vendorNameInput: focusingAsset.get('vendorName', ''),
      })
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
    console.log(vendorNameInput)
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
<Downshift
  onChange={option =>
      updateAsset({
        id: focusingAssetId,
        vendorName: option.value,
      })
  }
  selectedItem={{value: focusingAsset.get("vendorName"), label: focusingAsset.get("vendorName")}}
  itemToString={item => item.value}
>
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem,
          highlightedIndex,
        }) => (
          <div className={classes.container}>
             <TextField
                InputProps={{
                  ...getInputProps({
                    onChange: event => {
                      if (event.target.value !==  '') {
                        this.setState({
                          vendorNameInput: event.target.value,
                        })
                      }},
                  }),
                }}
                fullWidth={true}
          />
            {isOpen ? (
              <Paper className={classes.paper} square>
                {
                vendorSearchHints.map((suggestion, index) => {
                    const isHighlighted = highlightedIndex === index;
                    const isSelected = (selectedItem.value || '').indexOf(suggestion.label) > -1;
                    return (
                      <MenuItem
                        {...getItemProps({ item: suggestion.label })}
                        key={suggestion.label}
                        selected={isHighlighted}
                        component="div"
                        style={{
                          fontWeight: isSelected ? 500 : 400,
                        }}
                      >
                        {suggestion.label}
                      </MenuItem>
                    )
                  }
                )
                }
              </Paper>
            ) : null}
          </div>
        )}
</Downshift>
        <FormLabel>Product Name
          <Select
            inputValue={productNameInput}
            defaultInputValue={productNameInput}
            options={productSearchHints}
            value={{value: focusingAsset.get("productName"), label: focusingAsset.get("productName")}}
            className={classes.attribute}
            blurInputOnSelect={true}
            onBlur={() => {}}
            onChange={option =>
                updateAsset({
                  id: focusingAssetId,
                  productName: option.value,
                })
            }
            onInputChange={value => {
              if (value !== '') {
                this.setState({
                  productNameInput: value,
                })
              }}
            }/></FormLabel>
        <FormLabel>Product Version
          <Select
            inputValue={versionInput}
            defaultInputValue={versionInput}
            options={versionSearchHints}
            value={{value: focusingAsset.get("productVersion"), label: focusingAsset.get("productVersion")}}
            className={classes.attribute}
            blurInputOnSelect={true}
            onBlur={() => {}}
            onChange={option =>
                updateAsset({
                  id: focusingAssetId,
                  productVersion: option.value,
                })
            }
            onInputChange={value => {
              if (value !==  '') {
                this.setState({
                  versionInput: value,
                })
              }}
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
