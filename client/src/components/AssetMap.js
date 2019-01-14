import React, { Component } from 'react'

class AssetMap extends Component {
  state = {
    count: 0,
  }

  render() {
    const { count } = this.state
    return (
      <button onClick={() => this.setState({count: count + 1})}>
        Clicked {count} times!
      </button>
    )
  }
}

export default AssetMap
