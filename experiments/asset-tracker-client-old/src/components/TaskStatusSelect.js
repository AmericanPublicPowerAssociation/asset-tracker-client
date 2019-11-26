import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import NativeSelect from '@material-ui/core/NativeSelect'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import { TASK_STATUS_BY_ID } from '../constants'


export default function TaskStatusSelect(props) {
  const { className, ...selectProps } = props
  return (
    <FormControl fullWidth className={className}>
      <InputLabel htmlFor='task-status-select'>Task Status</InputLabel>
      <NativeSelect
        {...selectProps}
        input={<Input id='task-status-select' />}
      >
      {TASK_STATUS_BY_ID.entrySeq().map(([id, name]) =>
        <option value={id} key={id}>{name}</option>)}
      </NativeSelect>
    </FormControl>
  )
}
