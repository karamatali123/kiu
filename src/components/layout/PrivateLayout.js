import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import SideNav from "../SideNav";
import Header from '../Header';
import { Slideshow } from "@material-ui/icons";
import DesktopMenu from "./MobileSideNav";

const useStyles = makeStyles((theme) => ({

  [theme.breakpoints.down('md')]: {
    display:"block" ,
    gridTemplateColumns: "unset",   
},
 icon:{
  display:"none",
  [theme.breakpoints.down('md')]: {
    display:"block" ,
    
},
 }
}));

const PrivateLayout = ({ children }) => {
  const classes=useStyles()
  const [isOpen,setIsOpen]=useState(false)
  return (
    <Container maxWidth={false} disableGutters>
      <Header />

      <Box
        sx={{  display: {lg:"grid",md:"flex"},
        gridTemplateColumns: {lg:"304px 1fr",md:"30px 1fr"},
        height: "calc(100vh - 70px)",
        overflowY:"hidden",
        columnGap: "10px",
        padding: "10px",
        background:"#f1f1f1",}}
      >
        <div>
        {isOpen && <DesktopMenu isOpen={isOpen} setIsOpen={setIsOpen}/>}
        <div onClick={()=>{
          setIsOpen(true)
        }}>
       <Slideshow className={classes.icon}/>
        </div>
        <SideNav />
        </div>
        
        
        <Box>{children}</Box>
      </Box>
    </Container>
  );
};

export default PrivateLayout;
