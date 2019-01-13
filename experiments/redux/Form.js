import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addAsset } from '../actions'

const mapDispatchToProps = dispatch => ({
  addAsset: asset => dispatch(addAsset(asset))
})

class ConnectedForm extends Component {
  constructor() {
    super()
    this.state = {
      title: ''
    }
    this.i = 0;
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    const x = { [event.target.id]: event.target.value }
    console.log(x)
    this.setState(x)
  }
  handleSubmit(event) {
    event.preventDefault()
    const { title } = this.state
    const id = this.i++;
    this.props.addAsset({ title, id })
    this.setState({ title: '' })
  }
  render() {
    const { title } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          id="title"
          value={title}
          onChange={this.handleChange}
        />
        <button type="submit">Save</button>
      </form>
    )
  }
}

const Form = connect(null, mapDispatchToProps)(ConnectedForm)

export default Form
