import React, { Component } from 'react'
import CytoscapeComponent from 'react-cytoscapejs'
import { debounce } from 'lodash'
import { DEBOUNCE_THRESHOLD_IN_MILLISECONDS } from '../constants'

const cytoscapeLayout = {
  'name': 'cose',
}

const getElements = (assetId, assetById, maximumDepth) => {
  let idPairs = new Set()
  let seenIds = new Set()
  let nextIds = assetId ? new Set([assetId]) : new Set()
  for (let depth = 0; depth < maximumDepth; depth++) {
    let nextNextIds = new Set()
    for (const id of nextIds) {
      const connectedIds = assetById[id].connectedIds || []
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
    elements.push({data: {id, label: assetById[id].name}})
  }
  for (const idPair of idPairs) {
    const [id1, id2] = idPair.split(' ')
    elements.push({data: {source: id1, target: id2}})
  }
  return elements
}

class AssetCircuit extends Component {

  handleCy = cy => {
    const {
      setHighlightedAsset,
    } = this.props

    const refreshLayout = debounce(() => {
      cy.layout(cytoscapeLayout).run()
    }, DEBOUNCE_THRESHOLD_IN_MILLISECONDS)

    const showAsset = e => {
      let assetId = e.target.id()
      setHighlightedAsset({id: assetId})

      // !!! Find out why this gets called twice
      // alert('tapped ' + node.id())
    }

    cy.on('add remove', refreshLayout)
    cy.on('tap', 'node', showAsset)
  }

  render() {
    let {
      highlightedAssetId,
      assetById,
    } = this.props
    return (
      <CytoscapeComponent
        elements={getElements(highlightedAssetId, assetById, 2)}
        layout={cytoscapeLayout}
        style={{
          height: '100%',
          width: '100%',
        }}
        cy={this.handleCy}
      />
    )
  }
}

export default AssetCircuit
