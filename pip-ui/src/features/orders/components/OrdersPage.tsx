import { Grid } from "@mui/material";
import ContentHeader from "src/common/components/ContentHeader";
import { RC } from "src/common/types/types";
import { OrderForm } from "src/features/orders/components/OrderForm";
import { OrderList } from "src/features/orders/components/OrderList";

export function OrdersPage(): RC {
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
        mainText="Requêtes"
        secondaryText="Une liste des requêtes enregistrés dans le système"
        button={<OrderForm />}
      />
      <OrderList />
    </Grid>
  );
}
