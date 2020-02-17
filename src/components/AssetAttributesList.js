import React from 'react'
import CollapsibleList from './CollapsibleList'

export default function AssetAttributesList(props) {
  const {
    asset,
    isEditing,
  } = props
  const [isOpen, setIsOpen] = useState(false)
  const assetTypeByCode = useSelector(getAssetTypeByCode)

  const assetTypeCode = asset.typeCode
  const assetType = assetTypeByCode[assetTypeCode]
  const assetTypeName = assetType.name

  let assetTypeAttributes = assetType.assetAttributes || []
  if (!isEditing) {
    assetTypeAttributes = assetTypeAttributes.filter(([attributeKey, attributeType]))
  }

  const assetAttributePacks = assetTypeAttributes.map(([
    attributeKey, attributeType,
  ]) => {
  })

  return (

    <CollapsibleList
      title={assetTypeName}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      {attributeFields}
    </CollapsibleList>

  )
}
