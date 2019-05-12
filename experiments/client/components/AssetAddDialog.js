import { ASSET_TYPE_BY_ID } from '../constants'
import { getRandomString } from '../macros'

  state = {
    assetName: ASSET_TYPE_BY_ID[DEFAULT_ASSET_TYPE_ID]['name']+ ' - ' + getRandomString(7),
    isAssetNameEmpty : false
  }

  onAssetTypeChange = event => {
      const assetTypeName = ASSET_TYPE_BY_ID[assetTypeId]['name']
      this.setState({
        assetName: assetTypeName + ' - ' + getRandomString(7),
    })
  }

  onAssetNameChange = event => {
    if (event.target.value === ""){
      this.setState({isAssetNameEmpty : true })
    } else {
        this.setState({isAssetNameEmpty : false })
    }
  }

  onOk = () => {
    const {
      addSelectedAssetType,
      addAsset,
      setFocusingAsset,
      onClose,
    } = this.props
    const {
      assetTypeId,
      assetName,
      vendorName,
    } = this.state
      if (assetName === ""){
        alert('The Asset Name is empty, add a name to save.')
      }
      else {
          const assetId = getRandomString(7)
          addSelectedAssetType({id: assetTypeId})
          addAsset({
              id: assetId,
              typeId: assetTypeId,
              name: assetName,
              vendorName: vendorName,
          })
          setFocusingAsset({id: assetId})
          onClose()
      }

  }

  const { isAssetNameEmpty } = this.state
  let assetNameField;
  if (isAssetNameEmpty) {
    assetNameField = <TextField
        error
        helperText="Name should not be empty"
    />
