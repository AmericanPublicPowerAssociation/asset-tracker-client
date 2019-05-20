import React, { PureComponent } from 'react'
import TextField from '@material-ui/core/TextField'


class AssetName extends PureComponent {

  onChange = event => {
    const { onChange } = this.props
    onChange && onChange({name: event.target.value})
  }

  onBlur = event => {
    const { onBlur } = this.props
    onBlur && onBlur({name: event.target.value})
  }

  render = () => {
    const {
      name,
      errorText,
      className,
    } = this.props
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
