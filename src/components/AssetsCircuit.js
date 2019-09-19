import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CytoscapeComponent from 'react-cytoscapejs'


const useStyles = makeStyles(theme => ({
  circuit: {
    height: '100%',
    width: '100%',
  }
}))

export default function AssetsCircuit() {
  const classes = useStyles()
  
  const getElements = () => {
    const elements = [
         { data: { id: 'one', label: 'Node 1' }, position: { x: 0, y: 0 } },
         { data: { id: 'two', label: 'Node 2' }, position: { x: 100, y: 0 } },
         { data: { source: 'one', target: 'two', label: 'Edge from Node1 to Node2' } }]
    return elements
  }

  return (
    <CytoscapeComponent 
      elements={getElements()}
      layout={ {name: 'preset'} }
      className={classes.circuit} />
  )
}
