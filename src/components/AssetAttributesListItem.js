// TODO: Review from scratch

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import CollapsibleListItem from './CollapsibleListItem'
import AttributeFields from './AttributeFields'
import {
  isNotNull,
} from '../macros'
import {
  getAssetTypeByCode,
} from '../selectors'

const theme = createMuiTheme({
  overrides: {
    MuiListItem: {
      root: {
        paddingLeft: '10px',
        paddingLeft: '10px',
      },
    },
  },
})

export default function AssetAttributesListItem({ asset, isEditing, styling }) {
  const [isOpen, setIsOpen] = useState(false)
  const assetTypeByCode = useSelector(getAssetTypeByCode)
  const assetId = asset.id
  const assetTypeCode = asset.typeCode
  const attributeValueByKey = asset.attributes || {}
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name

  let attributeKeyTypes = assetType.assetAttributes || []
  if (!isEditing) {
    attributeKeyTypes = attributeKeyTypes.filter(([
      attributeKey, attributeType,
    ]) => isNotNull(attributeValueByKey[attributeKey]))
  }

  return attributeKeyTypes.length > 0 ?
    <ThemeProvider theme={theme}>
      <CollapsibleListItem
        title={assetTypeName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <AttributeFields
          assetId={assetId}
          assetTypeCode={assetTypeCode}
          attributeKeyTypes={attributeKeyTypes}
          attributeValueByKey={attributeValueByKey}
          isEditing={isEditing}
        />
      </CollapsibleListItem>
    </ThemeProvider> :
    <ListItem disableGutters component='div' className={styling}>
      <ListItemText primary={assetTypeName} />
    </ListItem>
}
