import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  root: {
    height: "100%",
    display: "grid",
    position: "relative",
    "@media (min-width:900px)": {
      gridTemplateAreas: `'header header header'
     'sideMenu left right'
     'footer footer footer '`,
      gridTemplateRows: "auto 1fr auto",
      gridTemplateColumns: "auto 1fr 1fr",
    },

    "@media (max-width:900px)": {
      gridTemplateAreas: `'header header'
     'sideMenu main'
     'footer footer '`,
      gridTemplateRows: "auto 1fr auto",
      gridTemplateColumns: "auto 1fr",
    },
  },
});
