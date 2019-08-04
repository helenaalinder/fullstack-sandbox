import React from 'react'
import { FormControl, InputLabel, Input } from '@material-ui/core'
import Checkcircle from '@material-ui/icons/CheckCircle'
import CheckcircleOutline from '@material-ui/icons/CheckCircleOutline'

export const TextField = ({ value, onChange, label, className }) => {
  return (
    <FormControl className={className}>
      <InputLabel>{label}</InputLabel>
      <Input value={value} onChange={onChange} />
    </FormControl>
  )
}

export const CheckCircle = () => {
  return <Checkcircle color='primary'/>
}

export const CheckCircleOutline = () => {
  return <CheckcircleOutline color='disabled'/>
}