import React from "react";
import {
  Select,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Stack,
} from "@mui/material";

const BasicDropdown = ({
  title,
  label,
  options,
  item,
  onChange,
  disabled,
  size,
  sx = {},
}) => {
  return (
    <Stack mt="14px">
      {title && (
        <Typography variant="subtitle 2" fontSize={"20px"} fontWeight={"400"}>
          {title}
        </Typography>
      )}
      <FormControl sx={{ m: 0, minWidth: "400px" }} size={size}>
        {label && (
          <InputLabel
            id="select-label"
            sx={{
              fontSize: "18px",
              lineHeight: 1.32,
              fontWeight: 400,
              color: "#666666",
              zIndex: 0,
            }}
          >
            {label}
          </InputLabel>
        )}
        <Select
          labelId="select-label"
          value={item}
          label={label}
          onChange={onChange}
          sx={{
            borderRadius: "8px",
            border: "1px solid gray",
            height: "55px",
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiList-root": {
              display: "flex",
              flexDirection: "column",
            },
            ...sx,
          }}
          disabled={disabled}
          inputProps={{
            variant: "outlined",
          }}
        >
          {options.map((option) => (
            <MenuItem value={option} key={option}>
              {`${option.firstName} ${option.lastName}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default BasicDropdown;
