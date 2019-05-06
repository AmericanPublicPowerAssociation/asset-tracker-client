import React, { PureComponent } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { debounce } from 'lodash'
import {
  // CIRCUIT_DEPTH,
  CYTOSCAPE_LAYOUT,
  DEBOUNCE_THRESHOLD_IN_MILLISECONDS,
} from '../constants'

const getElements = (assetIdPairs, focusingAssetId, assetById) => {
  const elements = []
  for (const idPair of assetIdPairs) {
    const [id1, id2] = idPair
    idPair.forEach(id => {
      const asset = assetById.get(id)
      elements.push({data: {id, label: asset.get('name')}})
    })
    if (id1 !== id2) {
      elements.push({data: {source: id1, target: id2}})
    }
  }
  if (focusingAssetId && !elements.length) {
    const asset = assetById.get(focusingAssetId)
    elements.push({data: {
      id: focusingAssetId, label: asset.get('name')}})
  }
  return elements
}

class AssetCircuit extends PureComponent {
  onCy = cy => {
    const {
      assetById,
      addSelectedAssetType,
      setFocusingAsset,
    } = this.props

    const containerStyle = cy.container().style

    const refreshLayout = debounce(() => {
      cy.layout(CYTOSCAPE_LAYOUT).run()
    }, DEBOUNCE_THRESHOLD_IN_MILLISECONDS)

    const showAsset = e => {
      const assetId = e.target.id()
      const assetTypeId = assetById.get(assetId).get('typeId')

      addSelectedAssetType({id: assetTypeId})
      setFocusingAsset({id: assetId})
      console.log("Asset: ", assetById.get(assetId));
    }

    cy.off('add remove tap')
    cy.on('add remove', refreshLayout)
    cy.on('tap', 'node', showAsset)

    cy.on('mouseover', 'node', () => {
      containerStyle['cursor'] = 'pointer'})
    cy.on('mouseout', 'node', () => {
      containerStyle['cursor'] = 'all-scroll'})
  }

  render() {
    const {
      focusingAssetId,
      circuitAssetIdPairs,
      assetById,
    } = this.props
    return (
      <CytoscapeComponent
        elements={getElements(
          circuitAssetIdPairs,
          focusingAssetId,
          assetById)}
        layout={CYTOSCAPE_LAYOUT}
        style={{height: '100%', width: '100%'}}
        cy={this.onCy}
      />
    )
  }
}

export default AssetCircuit
