import { Box, Grid } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Image from "src/images/coverPhoto.png";

export const StyledGridItemImage = styled(Grid)(({ theme }) => ({
  background: `url(${Image})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundColor: alpha(theme.palette.background.default, 1),
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
}));

// my: 8, mx: 4 --> 1=8px
export const StyledBoxSignIn = styled(Box)({
  margin: "64px 32px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
