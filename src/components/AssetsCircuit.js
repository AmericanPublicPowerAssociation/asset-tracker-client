import React from 'react'
import { find_path as findPath } from 'dijkstrajs'
import { combination } from 'js-combinatorics'
import debounce from 'lodash/debounce'
import { Set } from 'immutable'
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
          cy.layout({name: 'cose'} ).run()
        }, 1000)
    refreshLayout()
  }

  const getElements = () => {
    const { selectedAssets, connectionGraph } = props
    const elements = []
    if (!selectedAssets.size) return []
    const selectedAssetNoLineIds = selectedAssets.reduce( 
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
          for (let i=0; i < pathAssetIds.length; i++){
            const assetId = pathAssetIds[i]
            if ( assetId === target || assetId === source){
              continue
            }
            if (selectedAssetNoLineIds.includes(assetId)){
              pushAsset = false
              break
            }
          }
          if (pushAsset){
           idPairs.push(idPair)
          }
        }
        catch(error){
        }
        idPair = cmbPairs.next()
      }
    }
    
    Set(idPairs).forEach( (idPair) => {
      const [ source, target ] = idPair
      elements.push(
        {'data': {source, target}}
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
