import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'


class AssetName extends PureComponent {

  state = {
    name: '',
  }

  componentWillReceiveProps(nextProps) {
    const name = nextProps.name
    this.setState({
      name,
      oldName: name,
    })
  }

  onChange = event => {
    this.setState({name: event.target.value})
  }

  onBlur = event => {
    const { name, oldName } = this.state
    if (name === oldName) {
      return
    }
    const { onUpdate } = this.props
    onUpdate({name})
  }

  render = () => {
    const { className, errorText } = this.props
    const { name } = this.state
    const errorProps = errorText ? {
      error: true,
      helperText: errorText,
    } : {}
    return (
      <TextField
        label='Asset Name'
        value={name}
        fullWidth
        required
        className={className}
        InputLabelProps={{
          shrink: true,
        }}
        {...errorProps}
        onChange={this.onChange}
        onBlur={this.onBlur}
      />
    )
  }
}


export default AssetName
