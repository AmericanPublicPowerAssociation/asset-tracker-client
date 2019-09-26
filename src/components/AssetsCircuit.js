import React from 'react'
import { find_path as findPath } from 'dijkstrajs'
import { combination } from 'js-combinatorics'
import debounce from 'lodash/debounce'
import { Set, fromJS } from 'immutable'
import { makeStyles } from '@material-ui/core/styles'
import CytoscapeComponent from 'react-cytoscapejs'


const useStyles = makeStyles(theme => ({
  circuit: {
    height: '100%',
    width: '100%',
  }
}))

export default function AssetsCircuit(props) {
  const classes = useStyles()
  
  const onCy = cy => {
    const refreshLayout = debounce(() => {
      const { focusingAssetId } = props
      cy.style().fromJson([
        {
          selector: 'node',
          style: {
            'label': 'data(label)',
            "text-valign": "center",
            "text-halign": "center",
            'font-size': '2px',
          }
        },
        {
          selector: 'edge',
          style: {
            'label': 'data(label)',
            'edge-text-rotation': 'autorotate',
            'font-size': '2px',
          },
        },
      ]).update()
      cy.nodes().filter( (ele) => {
        return ele.data('id') === focusingAssetId
      }).style('background-color', 'red');
       
      cy.nodes().filter( (ele) => {
        return ele.data('id') !== focusingAssetId
      }).style('background-color', 'lightgray');
      cy.layout({name: 'cose'} ).run()
    }, 1000)
    refreshLayout()
  }

  const getElements = () => {
    const { 
      selectedAssets, 
      assetById, 
      focusingAssetId, 
      connectionGraph } = props
    const elements = []
    let assets = selectedAssets
    
    if (focusingAssetId && !selectedAssets.has(focusingAssetId)) {
      const focusingAsset = assetById.get(focusingAssetId)
      assets = selectedAssets.set(focusingAssetId, focusingAsset)
    }

    const selectedAssetNoLineIds = assets.reduce( 
      (assetsNoLineIds, asset, id) => {
        const label = asset.get('name')
        const typeId = asset.get('typeId')
        if ( typeId  !== 'l'){
          elements.push( {'data': {id, label}})
          assetsNoLineIds.push(id)
        }
        return assetsNoLineIds
    }, [])

    const idPairs = []
    if (selectedAssetNoLineIds.length > 1) {
      const cmbPairs = combination(selectedAssetNoLineIds, 2)
      let idPair = cmbPairs.next()
      while(idPair){ 
        idPair.sort()
        const source = idPair[0]
        const target = idPair[1]
        try{
          const pathAssetIds = findPath(connectionGraph, source, target)
          let pushAsset = true
          const lineConns = []
          for (let i=0; i < pathAssetIds.length; i++){
            const curAssetId = pathAssetIds[i]
            const curAsset = assetById.get(curAssetId)
            const curType = curAsset.get('typeId')
            const curName = curAsset.get('name')
            if ( curAssetId === target || curAssetId === source){
              continue
            } 
            if ( curType === 'l') {
              lineConns.push(curName)
            }
            if (selectedAssetNoLineIds.includes(curAssetId)){
              pushAsset = false
              break
            }
          }
          if (pushAsset){
           idPairs.push(fromJS({idPair, lineConns}))
          }
        }
        catch(error){
        }
        idPair = cmbPairs.next()
      }
    }

    Set(idPairs).forEach( (pair) => {
      const [ source, target ] = pair.get('idPair')
      const lineConns = pair.get('lineConns')
      const label = lineConns.reduce( (str, lineName) => {
        return `${str} ${lineName} `  
      }, '')
      elements.push(
        {'data': {source, target, label}}
      )
    })

    return elements
  }

  const elements = getElements()

  return (
    <CytoscapeComponent 
      elements={elements}
      layout={ {name: 'cose'} }
      className={classes.circuit} 
      cy={onCy}/>
  )
}
