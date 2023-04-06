import { CircularProgress, Stack } from "@mui/material";

import React from "react";

const Loading = () => {
  return (
    <Stack
      display={"flex"}
      alignItems="center"
      justifyContent={"center"}
      height={"400px"}
    >
      <CircularProgress />
    </Stack>
  );
};

export default Loading;
