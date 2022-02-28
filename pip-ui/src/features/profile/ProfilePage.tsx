import { Grid } from "@mui/material";
import React from "react";
import ContentHeader from "src/common/components/ContentHeader";
import { ProfileDetails } from "src/features/profile/ProfileDetails";

export function ProfilePage() {
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
        mainText="Profil D'utilisateur"
        button={undefined}
        secondaryText={""}
      />
      <ProfileDetails />
    </Grid>
  );
}
