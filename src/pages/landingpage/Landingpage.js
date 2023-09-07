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
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import { Box, Card, Container, Grid, Stack, Typography } from "@mui/material";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import GetAppIcon from "@mui/icons-material/GetApp";
import { GetApp } from "@mui/icons-material";

const countingDetails = [
  { title: "Registered Candidates", count: 3333 },
  { title: "Total Complains", count: 3333 },
  { title: "Resolved Complains", count: 3333 },
];
const LandingPage = () => {
  const icontStyles = {
    position: "absolute",
    top: "-3%",
    width: "60px",
    height: "54px",
    color: "#1976d2",
  };
  return (
    <>
      <Header />
      <Container style={{ padding: "99px 18px", margin: "auto" }}>
        <Stack
          direction="row"
          gap="250px"
          flexWrap="wrap"
          alignItems={"center"}
        >
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

              <MyButton
                text={"Submit Know"}
                variant={"contained"}
                style={{ backgroundColor: "#003A91", color: "#fff" }}
              />
            </Box>
          </Box>

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
        </Stack>

        <Stack
          mt={"100px"}
          gap="250px"
          direction="row"
          alignItems={"center"}
          sx={{ flexWrap: { xs: "wrap", lg: "nowrap" } }}
          width={"100%"}
        >
          <Box>
            <img
              src={logo}
              alt="circle img"
              style={{
                width: "350px",
                maxWidth: "350px",
                height: "350px",
              }}
            />
          </Box>

          <Box sx={{ width: { xs: "100%", lg: "50%" } }}>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent="space-between"
            >
              <Typography variant="h3" color="secondary">
                What Is SCMP?
              </Typography>
            </Box>

            <Typography variant="subtitle1" margin="0 0 30px 0">
              Smart Complaint Management Portal
            </Typography>
            <Typography variant="subtitle1" fontSize="20px">
              Smart complaint Management Portal is an AI (Artificial
              Intelligence) based Web Application or online complaint cell.
              Complaining against a problem is the only solution to get rid of
              the problem next time, instead of ignoring or hiding the problem.
              Every institution must have a complaint and suggestion cell to
              improve and enhance its system. KIU do not have any platform where
              the students can submit their complaints due to which students
              starts protests, strikes and other illegal, unprofessional and
              unethical ways of complaining. Such unprofessional and unethical
              way of complaining could harm the reputation and peaceful
              environment of the university and may also cause political and
              sectarian issues in the university or in the region.
            </Typography>
          </Box>
        </Stack>
      </Container>
      <Box sx={{ backgroundColor: "#f1f1f1", p: "30px" }}>
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
                number={1}
                description="The first step in a Complaint Management System is to register yourself as a user. This typically involves creating an account with your personal details such as name, contact information, and any necessary identification details. Registering ensures that your complaints are linked to your profile for efficient tracking and communication"
                icon={<HowToRegIcon sx={icontStyles} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UseCard
                heading={"Lodge your complaint"}
                description="After registration, you can lodge your complaint. This step involves providing specific details about the issue you are facing. You'll typically be required to describe the problem, provide relevant documentation or evidence, and specify the desired resolution or outcome. The system may also allow you to categorize your complaint for better organization."
                icon={<NoteAddIcon sx={{ ...icontStyles, color: "#996312" }} />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UseCard
                heading={"Track your complaint"}
                icon={<TrackChangesIcon sx={icontStyles} />}
                description="Once your complaint is submitted, the system provides a tracking mechanism. This feature allows you to monitor the progress of your complaint in real-time. You can check the status, see any updates, and estimate when you can expect a resolution. This transparency helps users stay informed and reduces anxiety associated with unresolved issues."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <UseCard
                heading={"Get Your results"}
                description="As your complaint is being processed, the Complaint Management System will notify you when there are updates or when a resolution has been reached. This step involves receiving feedback, information on any actions taken, or the proposed solutions to your complaint. Users can also use this feature to engage in further communication with the customer support team if needed."
                icon={<GetApp sx={{ ...icontStyles, color: "#996312" }} />}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Box
        sx={{
          width: "100%",
          backgroundColor: "#003A91",
          padding: "50px 0px",
        }}
      >
        <Container>
          <Grid container alignItems="center">
            {countingDetails.map((data) => (
              <Grid item xs={12} sm={12} md={12} lg={4}>
                {" "}
                <CounterBox heading={data.title} number={data.count} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "50px",
          gap: "200px",
          flexWrap: { xs: "wrap", lg: "nowrap" },
        }}
      >
        <Stack sx={{ width: { xs: "100%", lg: "40%" } }}>
          <Typography
            variant="h2"
            width="600px"
            letterSpacing={"3px"}
            lineHeight="50px"
            fontWeight="600"
          >
            Have A Query Or Want To Suggest Something To Us?
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontFamily: "'Mohave', sans-serif !important",
              fontWeight: "400 !important",
              fontSize: "20px",
              mt: "20px",
            }}
          >
            we believe in continuous improvement, and your feedback plays a
            crucial role in helping us enhance our services. We value your input
            and encourage you to share your suggestions, ideas, and
            recommendations with us.
          </Typography>
        </Stack>
        <SuggestionForm />
      </Box>

      <Footer />
    </>
  );
};

export default LandingPage;
const CounterBox = ({ heading, number }) => {
  return (
    <>
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
    </>
  );
};
