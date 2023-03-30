import { Button } from "@mui/material";
import * as React from "react";

export default function MyButton({ variant, text, style, size, onClick }) {
  return (
    <Button variant={variant} sx={style} size={size} onClick={onClick}>
      {text}
    </Button>
  );
}
