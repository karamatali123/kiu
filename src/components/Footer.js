// import React from 'react'
import footerImg from "../assests/Images/footerlogo.png";

import {
  Box,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  LocationCity,
  LocationOn,
  Phone,
  Twitter,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

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
  const linkStyles = {
    fontSize: "17px",
    textDecoration: "none",
    color: "#fff",
  };

  return (
    <div style={footer}>
      <Container>
        <Grid container spacing={1}>
          <Grid md={6} sm={6} xm={12}>
            <img src={footerImg} width="100px" height={"100px"}></img>
          </Grid>
          <Grid md={2} sm={6} xm={12}>
            <Stack sx={linkBox} gap="10px">
              <Typography variant="h3">Useful Links</Typography>

              <a
                href="https://www.kiu.edu.pk/"
                target={"_blank"}
                style={linkStyles}
              >
                KIU Official Website
              </a>
              <a
                href="https://lms.kiu.edu.pk/"
                target={"_blank"}
                style={linkStyles}
              >
                KIU LMS
              </a>
            </Stack>
          </Grid>
          <Grid md={2} sm={6} xm={12}>
            <Box sx={linkBox}>
              <Typography variant="h3">Contact Us</Typography>

              <Stack gap="10px" mt="10px">
                <Stack direction="row" alignItems={"center"} gap="8px">
                  <Phone sx={{ width: "20px", height: "20px" }} />
                  <Typography variant="subtitle1">05814-345078</Typography>
                </Stack>
                <Stack direction="row" alignItems={"center"} gap="8px">
                  <LocationOn sx={{ width: "20px", height: "20px" }} />
                  <Typography variant="subtitle1">
                    KIU Road Konodas Gilgit
                  </Typography>
                </Stack>
              </Stack>
            </Box>
          </Grid>
          <Grid md={2} sm={6} xm={12}>
            <Box sx={linkBox}>
              <Typography variant="h3">Social Links</Typography>

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
