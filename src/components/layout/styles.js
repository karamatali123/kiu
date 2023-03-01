import { styled } from "@mui/system";

export const StyledNavItem = styled("div")(({ theme }) => ({
  textAlign: "initial",
  padding: "15px",
  fontSize: "18px",
  color: "#3a3a3a",
  cursor: "pointer",
  borderRadius: "0.375rem",
  display: "flex",
  alignItems: "center",
  columnGap: "10px",
  width: "240px",
  "&:hover": {
    backgroundColor: "#00000011",
    padding: "15px 10px",
  },
}));
