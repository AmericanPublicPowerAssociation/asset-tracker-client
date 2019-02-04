import React from 'react'
import AssetDetailFieldsContainer from '../containers/AssetDetailFieldsContainer'
import AssetRelationChipsContainer from '../containers/AssetRelationChipsContainer'

const AssetDetail = () => (
  <form onSubmit={event => event.preventDefault()}>
    <AssetDetailFieldsContainer />
    <AssetRelationChipsContainer
      label='Connections'
      assetKey='connectedIds'
    />
    <AssetRelationChipsContainer
      label='Parents'
      assetKey='parentIds'
    />
    <AssetRelationChipsContainer
      label='Children'
      assetKey='childIds'
    />
  </form>
)

export default AssetDetail
