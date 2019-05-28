import deburr from 'lodash/deburr'
import AssetName from './AssetName'
import AssetLocationContainer from '../containers/AssetLocationContainer'

const styles = theme => ({
  attribute: {
    margin: `${theme.spacing.unit * 3}px 0 0 0`,
  },
})

const VENDOR_NAME_SUGGESTIONS = [
  {type: 'x', label: 'Schneider Electric'},
  {type: 'x', label: 'Schweitzer Engineering Laboratories'},
  // {type: 'c', label: 'Schweitzer Engineering Laboratories'},
  // {type: 'X', label: 'Schweitzer Engineering Laboratories'},
]

const PRODUCT_NAME_SUGGESTIONS = [
  {type: 'x', vendor: 'Schweitzer Engineering Laboratories', label: 'SEL-351'},
  {type: 'c', vendor: 'Schweitzer Engineering Laboratories', label: 'SEL-352'},
  {type: 'X', vendor: 'Schweitzer Engineering Laboratories', label: 'SEL-3620'},
]

const PRODUCT_VERSION_SUGGESTIONS = [
  {label: 'R202'},
  {label: 'R203'},
  {label: 'R203-V1'},
  {label: 'R203-V2'},
  {label: 'R204'},
  {label: 'R204-V1'},
  {label: 'R206'},
]

  /*
  state = {
    vendorNameValue: '',
    productNameValue: '',
    // productVersionValue: '',
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.focusingAsset.get('id') !== nextProps.focusingAsset.get('id')) {
      this.setState({
        vendorNameValue: '',
        productNameValue: '',
      })
    }
  }
  */

  render() {
    const {
      classes,
      focusingAsset,
      relatingAssetId,
      relatingAssetKey,
      connectedAssets,
      parentAssets,
      childAssets,
      addSelectedAssetType,
      setFocusingAsset,
      setRelatingAsset,
      updateAsset,
    } = this.props

    const focusingAssetId = focusingAsset.get('id');
    if (!focusingAssetId) return null
    const locatable = focusingAssetType['locatable'] || false
    const vendorName = focusingAsset.get('vendorName', '')
    const productName = focusingAsset.get('productName', '')
    const productVersion = focusingAsset.get('productVersion', '')

    const assetRelationChipsProps = {
      addSelectedAssetType: addSelectedAssetType,
      setFocusingAsset: setFocusingAsset,
      setRelatingAsset: setRelatingAsset,
    }

    const vendorNameSuggestions = VENDOR_NAME_SUGGESTIONS.concat({'label': vendorName})
    const productNameSuggestions = PRODUCT_NAME_SUGGESTIONS.concat({'label': productName})
    const productVersionSuggestions = PRODUCT_VERSION_SUGGESTIONS.concat({'label': productVersion})

    return (
      <div>
        {({
          inputValue,
        }) => (
            {
              vendorNameSuggestions
                .filter(suggestion => inputValue !== '' &&
                  // suggestion.type === focusingAssetTypeId &&
                  suggestion.label.toLowerCase().includes(
                    deburr(inputValue.trim()).toLowerCase()))
            }
        )}
        </Downshift>

        <Downshift
          inputValue={productName}
          onInputValueChange={value => {
            // this.setState({productNameValue: value})
            // console.log('onInputValueChange', value)
            updateAsset({id: focusingAssetId, productName: value})
          }}
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
            <FormLabel {...getLabelProps()}>Product Name</FormLabel>
            <Input
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      updateAsset({id: focusingAssetId, productName: ''})
                    }}
                  ><ClearIcon /></IconButton>
                </InputAdornment>
              }
              {...getInputProps()}
            />
            <div {...getMenuProps()}>
            {isOpen &&
              <Paper square>
              {
                productNameSuggestions
                  .filter(suggestion => inputValue !== '' &&
                    // suggestion.type === focusingAssetTypeId &&
                    // suggestion.vendor === vendorName &&
                    suggestion.label.toLowerCase().includes(deburr(
                      inputValue.trim()).toLowerCase()))
                  .map((suggestion, index) => {
                    const label = suggestion.label
                    const type = suggestion.type
                    return (
                      <MenuItem
                        {...getItemProps({item: label})}
                        key={`${type}-${label}`}
                      >{label}</MenuItem>
                    )
                  })
              }
              </Paper>}
            </div>
          </div>
        )}
        </Downshift>

        <Downshift
          inputValue={productVersion}
          onInputValueChange={value => {
            updateAsset({id: focusingAssetId, productVersion: value})
          }}
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
            <FormLabel {...getLabelProps()}>Product Version</FormLabel>
            <Input
              fullWidth
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      updateAsset({id: focusingAssetId, productVersion: ''})
                    }}
                  ><ClearIcon /></IconButton>
                </InputAdornment>
              }
              {...getInputProps()}
            />
            <div {...getMenuProps()}>
            {isOpen &&
              <Paper square>
              {
                productVersionSuggestions
                  .filter(suggestion => inputValue !== '' &&
                    suggestion.label.toLowerCase().includes(deburr(
                      inputValue.trim()).toLowerCase()))
                  .map((suggestion, index) => {
                    const label = suggestion.label
                    const type = suggestion.type
                    return (
                      <MenuItem
                        {...getItemProps({item: label})}
                        key={`${type}-${label}`}
                      >{label}</MenuItem>
                    )
                  })
              }
              </Paper>}
            </div>
          </div>
        )}
        </Downshift>

        {locatable && <AssetLocationContainer />}
      </div>
    )
  }
