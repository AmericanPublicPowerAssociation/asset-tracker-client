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

/*
const getVendorNameSuggestions = value => {
  const inputValue = deburr(value.trim()).toLowerCase()
  const inputLength = inputValue.length
  let count = 0
  return inputLength ? vendorNameSuggestions.filter(suggestion => {
    const keep =
      count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue
    if (keep) {
      count++
    }
    return keep
  }) : []
}
*/
