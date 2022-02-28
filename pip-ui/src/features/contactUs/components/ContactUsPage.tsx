import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import ContentHeader from "src/common/components/ContentHeader";

export function ContactUsPage() {
  return (
    <Grid
      sx={{
        "@media (min-width:900px)": {
          gridRow: "left",
          gridColumn: "left / right",
        },
        "@media (max-width:900px)": {
          gridRow: "main",
          gridColumn: "main",
        },
        padding: "16px",
      }}
    >
      <ContentHeader
        mainText="Contactez-nous"
        secondaryText=""
        button={undefined}
      />
      <Paper elevation={8} square sx={{ padding: "16px" }}>
        <Typography>
          Pour toute demande relative au service Corrélations géotechnique,
          veuillez nous contacter par courriel à <b>pip@polymtl.ca</b> ou par
          téléphone au <b>(514) 340 - 3286</b>.
        </Typography>
      </Paper>
    </Grid>
  );
}
