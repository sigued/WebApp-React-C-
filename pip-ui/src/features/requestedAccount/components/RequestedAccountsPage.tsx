import { Grid } from "@mui/material";
import React from "react";
import ContentHeader from "src/common/components/ContentHeader";
import { RequestedAccountTable } from "src/features/requestedAccount/components/RequestedAccountTable";

export function RequestedAccountsPage() {
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
        mainText="Invitations"
        secondaryText="Une liste des courriels qui leur ont envoyé une invitation"
        button={undefined}
      />
      <RequestedAccountTable />
    </Grid>
  );
}
