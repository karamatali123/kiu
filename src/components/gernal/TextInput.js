import { FormControl, TextField } from '@material-ui/core'
import React from 'react'

export const TextInput = ({label,placeholder,value,}) => {
  return (
    <>
    <FormControl>
    <TextField label={label} placeholder={placeholder} value={value}/>
    </FormControl>
    

    
    </>
  )
}
