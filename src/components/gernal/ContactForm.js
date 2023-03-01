import { Paper, TextField } from '@material-ui/core'
import React from 'react'

const ContactForm = () => {
  return (
    <div>
      <Paper>
        <form>
          <TextField variant='standard' placeholder='First Name'></TextField>
        </form>
      </Paper>
    </div>
  )
}

export default ContactForm