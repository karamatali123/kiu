import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
// import theme from "../../theme";
import { Box } from "@mui/system";

const useStyles = makeStyles(() => ({
  container: {
    alignSelf: "center",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "1px solid #d5d5d5",
      borderRadius: "4px",
      height: "60px",
    },
  },
  outlined: {},
}));

const SubmitTo = (props) => {
  const {
    options,
    value,
    selectlabel,
    error = false,
    onChange,
    error_message = "",
    onBlur,
  } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography
        // color={theme.palette.black}
        fontSize={16}
        paddingLeft={0.5}
        paddingBottom={0}
        textAlign={"left"}
      >
        {selectlabel}
      </Typography>
      <FormControl fullWidth>
        {/* <InputLabel id="demo-simple-select-label">Age</InputLabel> */}
        <Select
          value={value}
          classes={classes}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          size="small"
          defaultValue={options[0]}
          onChange={onChange}
          {...props}
        >
          {options.map((option, index) => {
            return (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            );
          })}
        </Select>
        {error && (
          <Box
            sx={{
              color: "#CF5951",
              textAlign: "left",
              margin: "21px 0",
              fontSize: " 0.75rem",
              fontWeight: 400,
            }}
          >
            {error_message}
          </Box>
        )}
      </FormControl>
    </div>
  );
};

export default SubmitTo;
