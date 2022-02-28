import { Grid, Paper, Typography } from "@mui/material";
import React, { ReactElement } from "react";

type ContentHeaderProps = {
  mainText: string;
  secondaryText: string;
  button: ReactElement | undefined;
};

export default function ContentHeader({
  mainText,
  secondaryText,
  button,
}: ContentHeaderProps) {
  return (
    <Paper elevation={8} square sx={{ marginBottom: "16px" }}>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        sx={{ paddingX: "16px", paddingY: "24px" }}
      >
        <Grid item>
          <Grid container wrap="nowrap" direction="column">
            <Grid item>
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", color: "text.secondary" }}
              >
                {mainText}
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="caption">{secondaryText}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>{button}</Grid>
      </Grid>
    </Paper>
  );
}
