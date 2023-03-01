import * as React from "react";
import PersonIcon from '@material-ui/icons/Person';

import { Card, CardActions, CardContent, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { PersonAdd, PublicOutlined } from "@material-ui/icons";
import PublishIcon from '@material-ui/icons/Publish';



export default function UseCard({ heading, icon,number }) {

const useStyles = makeStyles((theme) => ({
btnround:{
  borderRadius:"50%",
  width:"30px",
  height:"30px",
  position: "absolute !important",
  left: "17%",
  backgroundColor:"blue"
},
icon:{
position:"absolute",
top:"-13%",
[theme.breakpoints.down('md')]: {
    display:"none"    
},
}

}));
const classes=useStyles()
  return (
    <Card sx={{ minWidth: 200,marginBottom:"10px" ,}} className={classes.borderRt}>
      <CardContent
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        
        }}
      >
         
        {icon === "register" ? (
          <PersonAdd
            style={{ width: "40px", height: "54px",color:"#1976d2" }}
            className={classes.icon}
            
          />
        ) : (
          <PublicOutlined style={{ width: "40px", height: "54px",color:"#1976d2"}} className={classes.icon}/>
        )}
        <Typography variant="h6" component="div">
          {heading}
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </CardContent>
    </Card>
  );
}
