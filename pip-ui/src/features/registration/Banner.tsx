import { Alert, AlertTitle, Grid, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export function Banner() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "action.hover",
      }}
    >
      <Grid item>
        <Alert
          severity="success"
          sx={{
            fontSize: "24px",
            border: "2px solid",
            borderColor: "inherit",
            borderBottomRightRadius: "0px",
            borderBottomLeftRadius: "0px",
            borderBottom: "none",
            width: "100%",
            "div > svg": {
              width: "48px",
              height: "48px",
            },
          }}
        >
          <AlertTitle sx={{ fontSize: "24px" }}>Succès</AlertTitle>
          Votre compte a été enregistré avec succès. —{" "}
          <strong>Nous vous redirigeons vers votre compte..</strong>
        </Alert>
        <Box sx={{ width: "100%", marginLeft: "16px" }}>
          <LinearProgress />
        </Box>
      </Grid>
    </Grid>
  );
}
