import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import shortid from "shortid";
import { formatDate } from "src/common/helpers/dateHelper";
import { useAppSelector } from "src/common/hooks/hooks";
import { OrderDetailsListElement } from "src/features/orders/components/OrderDetailsListElement";
import { OrderDownloadButton } from "src/features/orders/components/OrderDownloadButton";
import OrderStatusStepper from "src/features/orders/components/OrderStepBarStatus";

export function OrderDetails() {
  const selectedOrder = useAppSelector((state) => state.orders.selectedOrder);
  const { t } = useTranslation();
  const dateOrder = selectedOrder?.creationDate.toString()
    ? formatDate(selectedOrder?.creationDate.toString())
    : "Not defined";

  return (
    <Grid
      container
      flexDirection="column"
      flexWrap="nowrap"
      sx={{
        "@media (min-width:900px)": {
          gridRow: "right",
          gridColumn: "right",
        },
        "@media (max-width:900px)": {
          display: "none",
        },
      }}
    >
      <Grid item sx={{ margin: "16px" }}>
        <Paper elevation={8} sx={{ paddingX: "16px", paddingY: "16px" }} square>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="button"> {t("order_number")} :</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {selectedOrder?.id}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="button">{t("order_date")} : </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {dateOrder}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid
        item
        sx={{ width: "100%", paddingX: "16px", paddingBottom: "16px" }}
      >
        <OrderStatusStepper orderStatus={selectedOrder?.status} />
      </Grid>
      <Grid item sx={{ marginX: "16px" }}>
        <Paper elevation={8} square>
          <Grid container flexDirection="column">
            {selectedOrder?.parameterList.map(
              (param) =>
                param && (
                  <OrderDetailsListElement
                    key={param.id !== undefined ? param.id : shortid()}
                    param={param}
                  />
                )
            )}
          </Grid>
        </Paper>
      </Grid>
      <Grid item sx={{ margin: "16px" }}>
        <Grid container>
          <Grid item md={12} sm={12} sx={{ padding: "2px" }}>
            <OrderDownloadButton orderId={selectedOrder?.id} type="button" />
          </Grid>
          {/* <Grid item md={6} sm={12} sx={{ padding: "2px" }}>
            <Button variant="contained" size="large" sx={{ width: "100%" }}>
              {t("send_by_email")}
            </Button>
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
}
