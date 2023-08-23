// import React from 'react'
import footer from "../assests/Images/footerlogo.png";

import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";

const Footer = () => {
  const footer = {
    background: "#2D2D2D",
    padding: "40px",
  };
  const linkBox = {
    display: "flex",
    flexDirection: "column",
    color: "#fff",
  };
  const divider = {
    background: "#f5f5f5",
    height: "6px",
    margin: "16px 40px",
  };

  return (
    <div style={footer}>
      <Container>
        <Grid container spacing={1}>
          <Grid md={6} sm={6} xm={12}>
            <img src={footer}></img>
          </Grid>
          <Grid md={2} sm={6} xm={12}>
            <Box sx={linkBox}>
              <Typography variant="h3">Useful Links</Typography>
              <br />
              <Typography variant="subtitle1">Lounge A Complaint</Typography>
              <Typography variant="subtitle1">Lounge A Complaint</Typography>
              <Typography variant="subtitle1">Lounge A Complaint</Typography>
            </Box>
          </Grid>
          <Grid md={2} sm={6} xm={12}>
            <Box sx={linkBox}>
              <Typography variant="h3">Contact Us</Typography>
              <br />
              <Typography variant="subtitle1">Lounge A Complaint</Typography>
              <Typography variant="subtitle1">Lounge A Complaint</Typography>
              <Typography variant="subtitle1">Lounge A Complaint</Typography>
            </Box>
          </Grid>
          <Grid md={2} sm={6} xm={12}>
            <Box sx={linkBox}>
              <Typography variant="h3">Social Links</Typography>
              <br />
              {/* <FacebookIcon/>
          <InstagramIcon/>
          <Twitter/> */}
              <Facebook />
              <Instagram />
              <Twitter />
            </Box>
          </Grid>
        </Grid>
        <Divider style={divider} />
      </Container>
    </div>
  );
};

export default Footer;
