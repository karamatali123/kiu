// import React from 'react'
import footer from "../assests/Images/footerlogo.png"
// import FacebookIcon from '@mui/icons-material/Facebook';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import { Box, Container, Divider, Grid, makeStyles, Typography } from '@material-ui/core';
// import { color, height } from '@mui/system';
// import { Twitter } from '@material-ui/icons';

import { Box, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { Facebook, Instagram, Twitter } from "@material-ui/icons";

const Footer = () => {
  const useStyles = makeStyles((theme) => ({
    footer: {
   background:"#2D2D2D",
   padding:theme.spacing(5),
    },
   linkBox:{
    display:"flex",
    flexDirection:"column",
    color:"#fff",
   },
   divider:{
    background:"#f5f5f5",
    height:"6px",
    margin:theme.spacing(2,6)
   }
  }));
  const classes = useStyles();
  return (
    <div className={classes.footer}>
    <Container>
      <Grid container spacing={1}>
        <Grid md={6} sm={6} xm={12}>
          <img src={footer}></img>
        </Grid>
        <Grid md={2} sm={6} xm={12}>
         <Box className={classes.linkBox}>
          <Typography variant='h3'>
          Useful Links
          </Typography>
          <br/>
          <Typography variant='subtitle1'>Lounge A Complaint</Typography>
          <Typography variant='subtitle1'>Lounge A Complaint</Typography>
          <Typography variant='subtitle1'>Lounge A Complaint</Typography>
         </Box>
        </Grid>
        <Grid md={2} sm={6} xm={12}>
         <Box className={classes.linkBox}>
          <Typography variant='h3'>
          Contact Us
          </Typography>
          <br/>
          <Typography variant='subtitle1'>Lounge A Complaint</Typography>
          <Typography variant='subtitle1'>Lounge A Complaint</Typography>
          <Typography variant='subtitle1'>Lounge A Complaint</Typography>
         </Box>
        </Grid>
        <Grid md={2} sm={6} xm={12}>
         <Box className={classes.linkBox}>
          <Typography variant='h3'>
          Social Links  
          </Typography>
          <br/>
          {/* <FacebookIcon/>
          <InstagramIcon/>
          <Twitter/> */}
          <Facebook/>
          <Instagram/>
          <Twitter/>
         </Box>
         
        </Grid>
        
      </Grid>
      <Divider className={classes.divider}/>
    </Container>

    </div>
  )
}

export default Footer