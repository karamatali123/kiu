import React from "react";
import Header from "../../components/Header";
import kiulogo from "../../assests/Images/kiu.png";
import Button from "../../components/gernal/Button";
import bgimg from "../../assests/Images/bg img.png";
import logo from "../../assests/Images/logo.svg";
import { makeStyles } from "@material-ui/styles";
import MyButton from "../../components/gernal/Button";
import UseCard from "../../components/Cards";
import { Box, Card, Container, Grid, Typography } from "@material-ui/core";
import girl from "../../assests/Images/girl.png";
import { SuggestionForm } from "./suggestionForm";
import Footer from "../../components/Footer";
import SignUp from "../../components/gernal/Popup";
import SignIn from "../../components/gernal/SignInPopUp";
const useStyles = makeStyles((theme) => ({
  home: {
    padding: theme.spacing(13, 2),
    margin: "auto",
  },
  cards: {
    marginTop: theme.spacing(8),
    position: "relative",
    [theme.breakpoints.down("md")]: {},
  },
  home_left: {
    display: "flex",
    flexDirection: "column",
    alignItems: "left",
    fontFamily: "'Mohave', sans-serif",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
  content: {
    fontFamily: "'Mohave', sans-serif !important",
    fontWeight: "500 !important",
    fontSize: "38px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  subContent: {
    fontFamily: "'Mohave', sans-serif !important",
    fontWeight: "400 !important",
    fontSize: "18px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  subheading: {
    margin: theme.spacing(0, 0, 5, 0),
  },
  box: {
    marginTop: theme.spacing(8),
  },
  logo: {
    width: "350px",
    maxWidth: "350px",
    height: "350px",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  imgMobile: {
    width: "100px",
    maxWidth: "100px",
    height: "150px",
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  acknowledgment: {
    padding: theme.spacing(5, 5),
  },
  girl: {
    width: "330px",
    maxWidth: "330px",
    height: "330px",
  },
  counter: {
    width: "100%",
    backgroundColor: "#003A91",
    padding: theme.spacing(7, 0),
  },
  counterBox: {
    backgroundColor: "#fff",
    border: "1px slid #fff",
    borderRadius: "10px",
    height: "145px",
    fontFamily: "'Mohave', sans-serif",
    fontWeight: "500",
  },
  counterButton: {
    width: "98% !important",
    height: "60px",
    margin: "auto",
    paddingTop: theme.spacing(2),
    backgroundColor: "#003A91",
    color: "#fff",
    borderBottomLeftRadius: theme.spacing(1),
    borderBottomRightRadius: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
  suggestion: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "50px",
  },
  card: {
    padding: theme.spacing(6, 0, 0.5, 0),
    margin:theme.spacing(1)
  },
}));
const countingDetails = [
  { title: "Registered Candidates", count: 3333 },
  { title: "Total Complains", count: 3333 },
  { title: "Resolved Complains", count: 3333 },
];
const LandingPage = () => {
  const classes = useStyles();
 

  return (
    <>
      <Header />
      <Container className={classes.home}>
        <Grid container spacing={5}>
          <Grid md={8} sm={12} item>
            <Box className={classes.home_left}>
              <Box className="kiu-logo">
                <img src={kiulogo} alt="kiulogo" />
              </Box>
              <Box className={classes.content}>
                <Typography variant="h1" color="secondary">
                  Submit Your Complains <br />
                  Regarding KIU
                </Typography>
                <Typography
                  className={classes.subContent}
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
            <Box className={classes.logo}>
              <img src={bgimg} alt="bgimage" className={classes.logo} />
            </Box>
          </Grid>
        </Grid>

        <Box className={classes.box}>
          <Grid container spacing={12}>
            <Grid item md={5} sm={12}>
              <Box sx={{ display: { xs: "none", md: "block" } }}>
                <img src={logo} alt="circle img" className={classes.logo} />
              </Box>
            </Grid>
            <Grid md={7} sm={12} item spacing={12}>
              <Box className={classes.scmpText}>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent="space-between"
                >
                  <Typography variant="h3" color="secondary">
                    What Is SCMP?
                  </Typography>
                  <Box className={classes.imgMobile}>
                    <img
                      src={logo}
                      alt="circle img"
                      className={classes.imgMobile}
                    />
                  </Box>
                </Box>
                

                <Typography variant="subtitle1" className={classes.subheading}>
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

        <Box className={classes.box}>
          <Typography variant="h2" align="center" color={"secondary"}>
            How to use SCMP
          </Typography>
        </Box>
        <Box className={classes.cards}>
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

        <Box className={classes.box}>
          <Typography variant={"h2"} color="secondary" align="center">
            How SCMP Works?
          </Typography>
          <Box className={classes.acknowledgment}>
            <Grid container spacing={2} alignItems="start">
              <Grid md={4} sm={2}>
                <Box className={classes.img}>
                  <img src={girl} className={classes.girl}></img>
                </Box>
              </Grid>
              <Grid md={8} sm={2}>
                <Box padding={"30px"}>
                  <Typography variant="h3" color="secondary">
                    Acknowledgment
                  </Typography>
                  <Typography className={classes.subText}>
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

      <Box className={classes.counter}>
        <Container>
          <Grid container spacing={6} alignItems="center">
            {countingDetails.map((data)=>(
              <CounterBox heading={data.title} number={data.count} />
            ))}
          </Grid>
        </Container>
      </Box>
     
<Container>
      <Box className={classes.home}>
 <Box className={classes.suggestion}>
  <Grid spacing={3} container alignItems="center">
  <Grid md={6} sm={12}>
    <Typography variant="h2" className={classes.subheading}>
    Have A Query Or Want To Suggest Something To Us?
    </Typography>
    <Typography variant="p" className={classes.subContent}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
    do eiusmod tempor incididunt ut labore 
    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
    </Typography>
  </Grid>
  <Grid md={6} sm={12} >
    <SuggestionForm/>
  </Grid>
  </Grid>


 </Box>
      </Box> 
      </Container>
      <Footer/>
    </>
  );
};

export default LandingPage;
const CounterBox = ({ heading, number }) => {
  const classes = useStyles();
  return (
    <>
      <Grid md={4} sm={6} xs={12}>
        <Card className={classes.card}>
          <Typography
            variant="h3"
            color="primary"
            className={classes.cardHeading}
            align="center"
          >
            {heading}
          </Typography>
          <Box className={classes.counterButton}>
            <Typography variant="subtitle1" align="center">
              {number}
            </Typography>{" "}
          </Box>
        </Card>
      </Grid>
    </>
  );
};
