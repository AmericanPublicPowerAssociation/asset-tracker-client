import React, { PureComponent } from 'react'
import { List } from 'immutable'
import CytoscapeComponent from 'react-cytoscapejs'
import { debounce } from 'lodash'
import {
  CIRCUIT_DEPTH,
  CYTOSCAPE_LAYOUT,
  DEBOUNCE_THRESHOLD_IN_MILLISECONDS,
} from '../constants'

const getElements = (assetId, assetById, maximumDepth) => {
  let idPairs = new Set()
  let seenIds = new Set()
  let nextIds = assetId ? new Set([assetId]) : new Set()
  for (let depth = 0; depth < maximumDepth; depth++) {
    let nextNextIds = new Set()
    for (const id of nextIds) {
      const connectedIds = assetById.get(id).get('connectedIds', List())
      for (const connectedId of connectedIds) {
        const ids = [id, connectedId]
        ids.sort()
        idPairs.add(ids.join(' '))
        !seenIds.has(connectedId) && nextNextIds.add(connectedId)
      }
      seenIds.add(id)
    }
    nextIds = nextNextIds
  }
  let elements = []
  let nodeIds = [...seenIds, ...nextIds]
  for (const id of nodeIds) {
    elements.push({data: {id, label: assetById.get(id).get('name')}})
  }
  for (const idPair of idPairs) {
    const [id1, id2] = idPair.split(' ')
    elements.push({data: {source: id1, target: id2}})
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
      assetById,
    } = this.props
    if (!focusingAssetId) return null
    return (
      <CytoscapeComponent
        elements={getElements(focusingAssetId, assetById, CIRCUIT_DEPTH)}
        layout={CYTOSCAPE_LAYOUT}
        style={{height: '100%', width: '100%'}}
        cy={this.onCy}
      />
    )
  }
}

export default AssetCircuit
