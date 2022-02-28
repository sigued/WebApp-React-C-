import { Grid } from "@mui/material";
import React from "react";
import ContentHeader from "src/common/components/ContentHeader";
import { ManagerAddButton } from "src/features/managers/components/ManagerAddButton";
import ManagerList from "src/features/managers/components/ManagerList";

export default function ManagersPage() {
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
        mainText="Gestionnaires"
        secondaryText="Une liste des gesitonnaires enregistrés dans le système"
        button={<ManagerAddButton />}
      />
      <ManagerList />
    </Grid>
  );
}
