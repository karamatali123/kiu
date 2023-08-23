import React from "react";
import Header from "../../components/Header";
import kiulogo from "../../assests/Images/kiu.png";
import bgimg from "../../assests/Images/bg img.png";
import logo from "../../assests/Images/logo.svg";

import MyButton from "../../components/gernal/Button";
import UseCard from "../../components/Cards";
import girl from "../../assests/Images/girl.png";
import { SuggestionForm } from "./suggestionForm";
import Footer from "../../components/Footer";
import { Box, Card, Container, Grid, Typography } from "@mui/material";

const countingDetails = [
  { title: "Registered Candidates", count: 3333 },
  { title: "Total Complains", count: 3333 },
  { title: "Resolved Complains", count: 3333 },
];
const LandingPage = () => {
  return (
    <>
      <Header />
      <Container style={{ padding: "99px 18px", margin: "auto" }}>
        <Grid container spacing={5}>
          <Grid md={8} sm={12} item>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",

                fontFamily: "'Mohave', sans-serif",
                alignItems: { sm: "center", md: "left" },
              }}
            >
              <Box
                sx={{
                  width: "350px",
                  maxWidth: "350px",
                  height: "350px",
                  display: { xs: "none", md: "block" },
                }}
              >
                <img src={kiulogo} alt="kiulogo" />
              </Box>
              <Box
                sx={{
                  fontFamily: "'Mohave', sans-serif !important",
                  fontWeight: "500 !important",
                  fontSize: "38px",
                }}
              >
                <Typography variant="h1" color="secondary">
                  Submit Your Complains <br />
                  Regarding KIU
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "'Mohave', sans-serif !important",
                    fontWeight: "400 !important",
                    fontSize: "18px",
                  }}
                  variant={"subtitle1"}
                >
                  No need to worry about the long lines and save
                  <br /> your precious time, and submit your complains on <br />{" "}
                  your finger tips.
                </Typography>
                <Box>
                  <MyButton
                    text={"Submit Know"}
                    variant={"contained"}
                    style={{ backgroundColor: "#003A91", color: "#fff" }}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid sm={12} md={4} item>
            <Box
              sx={{
                width: "350px",
                maxWidth: "350px",
                height: "350px",
                display: { xs: "none", md: "block" },
              }}
            >
              <img
                src={bgimg}
                alt="bgimage"
                sx={{
                  width: "350px",
                  maxWidth: "350px",
                  height: "350px",
                  display: { xs: "none", md: "block" },
                }}
              />
            </Box>
          </Grid>
        </Grid>

        <Box mt={"40px"}>
          <Grid container spacing={12}>
            <Grid item md={5} sm={12}>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <img
                  src={logo}
                  alt="circle img"
                  sx={{
                    width: "350px",
                    maxWidth: "350px",
                    height: "350px",
                    display: { xs: "none", md: "block" },
                  }}
                />
              </Box>
            </Grid>
            <Grid md={7} sm={12} item spacing={12}>
              <Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent="space-between"
                >
                  <Typography variant="h3" color="secondary">
                    What Is SCMP?
                  </Typography>
                  <Box>
                    <img
                      src={logo}
                      alt="circle img"
                      sx={{
                        width: "100px",
                        maxWidth: "100px",
                        height: "150px",
                        display: { sm: "none" },
                      }}
                    />
                  </Box>
                </Box>

                <Typography variant="subtitle1" margin="0 0 30px 0">
                  Smart Complaint Management Portal
                </Typography>
                <Typography variant="subtitle1">
                  Smart complaint Management Portal is an AI (Artificial
                  Intelligence) based Web Application or online complaint cell.
                  Complaining against a problem is the only solution to get rid
                  of the problem next time, instead of ignoring or hiding the
                  problem. Every institution must have a complaint and
                  suggestion cell to improve and enhance its system. KIU do not
                  have any platform where the students can submit their
                  complaints due to which students starts protests, strikes and
                  other illegal, unprofessional and unethical ways of
                  complaining. Such unprofessional and unethical way of
                  complaining could harm the reputation and peaceful environment
                  of the university and may also cause political and sectarian
                  issues in the university or in the region.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box mt={"60px"}>
          <Typography variant="h2" align="center" color={"secondary"}>
            How to use SCMP
          </Typography>
        </Box>
        <Box marginTop={"60px"} position="relative">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <UseCard
                heading={"Register Yourself"}
                icon={"register"}
                number={1}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UseCard heading={"Lodge your complaint"} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UseCard heading={"Track your complaint"} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UseCard heading={"Get Your results"} />
            </Grid>
          </Grid>
        </Box>

        <Box mt={"60px"}>
          <Typography variant={"h2"} color="secondary" align="center">
            How SCMP Works?
          </Typography>
          <Box padding={"60px 60px"}>
            <Grid container spacing={2} alignItems="start">
              <Grid md={4} sm={2}>
                <Box>
                  <img
                    src={girl}
                    style={{
                      width: "330px",
                      maxWidth: "330px",
                      height: "330px",
                    }}
                  ></img>
                </Box>
              </Grid>
              <Grid md={8} sm={2}>
                <Box padding={"30px"}>
                  <Typography variant="h3" color="secondary">
                    Acknowledgment
                  </Typography>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

      <Box
        sx={{
          width: "100%",
          backgroundColor: "#003A91",
          padding: "50px 0px",
        }}
      >
        <Container>
          <Grid container spacing={6} alignItems="center">
            {countingDetails.map((data) => (
              <CounterBox heading={data.title} number={data.count} />
            ))}
          </Grid>
        </Container>
      </Box>

      <Container>
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "50px",
            }}
          >
            <Grid spacing={3} container alignItems="center">
              <Grid md={6} sm={12}>
                <Typography variant="h2">
                  Have A Query Or Want To Suggest Something To Us?
                </Typography>
                <Typography
                  variant="p"
                  sx={{
                    fontFamily: "'Mohave', sans-serif !important",
                    fontWeight: "400 !important",
                    fontSize: "18px",
                  }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation
                </Typography>
              </Grid>
              <Grid md={6} sm={12}>
                <SuggestionForm />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default LandingPage;
const CounterBox = ({ heading, number }) => {
  return (
    <>
      <Grid md={4} sm={6} xs={12}>
        <Card sx={{ padding: "40px 0 4px 0", margin: "8px" }}>
          <Typography variant="h3" color="primary" align="center">
            {heading}
          </Typography>
          <Box
            sx={{
              width: "98% !important",
              height: "60px",
              margin: "auto",
              paddingTop: "16px",
              backgroundColor: "#003A91",
              color: "#fff",
              borderBottomLeftRadius: "8px",
              borderBottomRightRadius: "8px",
              marginTop: "8px",
            }}
          >
            <Typography variant="subtitle1" align="center">
              {number}
            </Typography>{" "}
          </Box>
        </Card>
      </Grid>
    </>
  );
};
