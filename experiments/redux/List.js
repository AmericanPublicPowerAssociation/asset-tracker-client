import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  assets: state.assets
})

const ConnectedList = ({ assets }) => (
  <ul>
  {assets.map(el => (
    <li key={el.id}>{el.id} - {el.title}</li>
  ))}
  </ul>
)
const List = connect(mapStateToProps)(ConnectedList)

export default List;
