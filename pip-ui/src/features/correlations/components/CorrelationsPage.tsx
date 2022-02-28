import { Grid } from "@mui/material";
import React from "react";
import ContentHeader from "src/common/components/ContentHeader";
import { CorrelationAddButton } from "src/features/correlations/components/CorrelationAddButton";
import { CorrelationList } from "src/features/correlations/components/CorrelationList";

export function CorrelationsPage() {
  return (
    <Grid
      sx={{
        "@media (min-width:900px)": {
          gridRow: "left",
          gridColumn: "left",
        },
        "@media (max-width:900px)": {
          gridRow: "main",
          gridColumn: "main",
        },
        padding: "16px",
      }}
    >
      <ContentHeader
        mainText="Corrélations"
        secondaryText="Une liste des corrélations"
        button={<CorrelationAddButton />}
      />
      <CorrelationList />
    </Grid>
  );
}
