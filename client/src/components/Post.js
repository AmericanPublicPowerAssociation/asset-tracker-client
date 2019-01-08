import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getData } from '../actions'

export class Post extends Component {
  componentDidMount() {
    this.props.getData()
  }
  render() {
    return (
      <ul>
        {this.props.assets.map(el => (
          <li key={el.id}>
            {el.title}
          </li>
        ))}
      </ul>
    )
  }
}

function mapStateToProps(state) {
  return {
    assets: state.remoteAssets.slice(0, 10)
  }
}

export default connect(
  mapStateToProps,
  { getData }
)(Post);
