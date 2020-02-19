/*
import {
  setAssetConnectionAttribute
} from '../actions'

function AssetConnectionItem(props) {
  const {
    connection,
    itemKey,
    connectionIndex,
    assetId,
    disableInput,
  } = props
  const {
    // busId,
    attributes,
  } = connection

  const handleChange = (e, key) => {
    const value = e.target.value
    dispatch(setAssetConnectionAttribute(assetId, connectionIndex, key, value)
    )
  }

  const getKeyLabel = (key) => {
    return key.replace( /([A-Z])/g, ' $1' ).toLowerCase()
  }

  !attributes ?
  <Typography display='block' align='center' variant='caption'>
    Attributes are not available
  </Typography> :

  <TextField
    fullWidth
    label={getKeyLabel(key)}
    value={attributes[key]}
    onChange={ (e) => handleChange(e, key)}
    disabled={disableInput}
  />
*/
