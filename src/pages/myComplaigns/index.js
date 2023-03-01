import { Card, Typography } from '@material-ui/core'
import React from 'react'
import ComplaintCard from '../../components/complaints/ComplaintCard'
import Header from '../../components/Header'

import { useAuth } from '../../provider/AuthProvider'

const MyComplaints = () => {
  const {uid,user}=useAuth()
  console.log(uid,user,"ud")
  return (
   <>
   <Card style={{ height: "calc(100vh - 150px)",padding:"2rem",overflowY:"scroll"}}>
    <Typography variant='h3'>My Complaints</Typography>
    <ComplaintCard/>
    <ComplaintCard/>
   </Card>
   </>
  )
}

export default MyComplaints