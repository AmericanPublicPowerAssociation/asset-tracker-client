import React, { PureComponent } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { debounce } from 'lodash'
import {
  CIRCUIT_DEPTH,
  CYTOSCAPE_LAYOUT,
  DEBOUNCE_THRESHOLD_IN_MILLISECONDS,
} from '../constants'

const getElements = (assetId, assetById, maximumDepth) => {
  const getConnectedIds = (currentId, pastIds) => {
    let connectedIds = []
    const badIds = new Set([...pastIds, currentId])
    for (const connectedId of assetById.get(currentId).get('connectedIds', [])) {
      if (badIds.has(connectedId)) continue
      // const isLine = assetById.get(connectedId).get('typeId') === 'l'
      // if (!isLine) {
      connectedIds.push(connectedId)
      // }
      // else {
      // connectedIds = connectedIds.concat(getConnectedIds(connectedId, badIds))
      // }
    }
    return connectedIds
  }

  const seenIds = new Set()
  const idPairs = new Set()
  let nextIds = assetId ? new Set([assetId]) : new Set()
  for (let depth = 0; depth < maximumDepth; depth++) {
    let nextNextIds = new Set()
    for (const nextId of nextIds) {
      const connectedIds = getConnectedIds(nextId, seenIds)
      for (const connectedId of connectedIds) {
        const ids = [nextId, connectedId]
        ids.sort()
        idPairs.add(ids.join(' '))
        nextNextIds.add(connectedId)
      }
      seenIds.add(nextId)
    }
    nextIds = nextNextIds
  }
  const elements = []
  const nodeIds = [...seenIds, ...nextIds]
  for (const id of nodeIds) {
    const asset = assetById.get(id)
    elements.push({data: {id, label: asset.get('name')}})
  }
  for (const idPair of idPairs) {
    const [id1, id2] = idPair.split(' ')
    if (id1 !== id2) {
      elements.push({data: {source: id1, target: id2}})
    }
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
