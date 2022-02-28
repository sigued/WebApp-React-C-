import { Grid } from "@mui/material";
import React from "react";
import ContentHeader from "src/common/components/ContentHeader";
import { ParameterForm } from "src/features/parameters/components/ParameterForm";
import { ParameterList } from "src/features/parameters/components/ParameterList";

export function ParametersPage() {
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
        mainText="Paramètres"
        secondaryText="Une lsite des paramètres pour chaque catégorie"
        button={<ParameterForm />}
      />
      <ParameterList />
    </Grid>
  );
}
