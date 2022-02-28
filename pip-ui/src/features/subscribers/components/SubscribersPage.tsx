import { Grid } from "@mui/material";
import ContentHeader from "src/common/components/ContentHeader";
import { SubscriberAddButton } from "src/features/subscribers/components/SubscriberAddButton";
import { SubscriberList } from "src/features/subscribers/components/SubscriberList";

export function SubscribersPage() {
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
        mainText="Abonnés"
        secondaryText="Une liste des abonnés enregistrés dans le système"
        button={<SubscriberAddButton />}
      />
      <SubscriberList />
    </Grid>
  );
}
