import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00695c",
      light: "#4db6ac",
      dark: "#004d40",
    },
    secondary: {
      main: "#c62828",
      light: "#f44336",
      dark: "#b71c1c",
    },
    background: {
      paper: "#eeeeee",
    },
    action: {
      // hover: "#e0f2f1",
      selectedOpacity: 0.45,
    },
  },
});
