import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Collapse from '@material-ui/core/Collapse'
import ExpandMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'

export default function AssetConnectionList(props) {
  const {
    asset
  } = props
  return (
    <List disablePadding>
      { [1,2,3].map( (i) => (
        <AssetConnectionItem name={i}/>
      ))} 
    </List>
  )
}


function AssetConnectionItem(props) {
  const [isWithExpandConnect, setIsWithExpandConnect] = useState(true)
  const {name} = props
  const arrowComponent = (
    isWithExpandConnect ?
    <ExpandLess /> :
    <ExpandMore />
  )

  return (
    <>
      <ListItem
        disableGutters
        onClick={ () => setIsWithExpandConnect(!isWithExpandConnect)}>
        <h1>{name}</h1>
        { arrowComponent } 
      </ListItem>
      <Collapse in={isWithExpandConnect}>
        <h1>testing</h1>
      </Collapse>
    </>
  )
}
