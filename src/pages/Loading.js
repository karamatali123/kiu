import { CircularProgress } from '@material-ui/core'
import React from 'react'

const Loading = () => {
  return (
    <div><CircularProgress variant="determinate" value={100} /></div>
  )
}

export default Loading