import {
  Dialog,
  DialogContent,
  Divider,
  Grid,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { ElementDeleteButton } from "src/common/components/ElementDeleteButton";
import { formatDate } from "src/common/helpers/dateHelper";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { RC } from "src/common/types/types";
import { OrderDetails } from "src/features/orders/components/OrderDetails";
import { ordersActions } from "src/features/orders/state/ordersSlice";
import { OrderStatus } from "src/features/orders/state/types";
import { ordersRoute } from "src/routes/routePaths";

type OrderListElementProps = {
  orderId: string;
};

export function OrderListElement({ orderId }: OrderListElementProps): RC {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const order = useAppSelector((state) => state.orders.orders[orderId]);
  const isSelected = useAppSelector(
    (state) => state.orders.selectedOrder?.id === orderId
  );
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOrder = () => {
    if (window.innerWidth <= 900) {
      setOpenDialog(true);
      showDetails();
    } else {
      showDetails();
    }
  };

  const showDetails = () => {
    dispatch(ordersActions.selectOrder({ id: orderId }));
    history.push(`${ordersRoute}/${orderId}`);
  };

  const getOrderStatusColor = (orderStatus: OrderStatus): string => {
    switch (orderStatus) {
      case OrderStatus.Completed:
        return "success.light";
      case OrderStatus.Error:
        return "error.main";
      case OrderStatus.Processing:
        return "info.main";
      case OrderStatus.Pending:
        return "warning.light";
    }
  };

  const getOrderStatusText = (orderStatus: OrderStatus): string => {
    switch (orderStatus) {
      case OrderStatus.Completed:
        return t("completed");
      case OrderStatus.Error:
        return t("error");
      case OrderStatus.Processing:
        return t("processing");
      case OrderStatus.Pending:
        return t("pending");
    }
  };

  return (
    <>
      <ListItemButton selected={isSelected} onClick={handleClickOrder}>
        <Grid
          custom-attribute="test"
          container
          wrap="nowrap"
          sx={{ paddingY: "16px" }}
          alignItems="center"
        >
          <Grid item md={4} sm={4}>
            <Typography>Description</Typography>
            <Typography>{order.description}</Typography>
          </Grid>
          <Grid item md={4} sm={4}>
            <Typography> {t("order_date")} </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {order.creationDate?.toString()
                ? formatDate(order.creationDate?.toString())
                : "Not defined"}
            </Typography>
          </Grid>
          <Grid item md={2} sm={2}>
            <Typography>{t("order_status")}</Typography>
            <Typography sx={{ color: getOrderStatusColor(order.status) }}>
              {getOrderStatusText(order?.status)}
            </Typography>
          </Grid>
          <Grid item md={2} sm={2}></Grid>
          <Grid item>
            <ElementDeleteButton
              path={ordersRoute}
              requestPath={"api/order/delete-order/" + orderId}
              variant={undefined}
            />
          </Grid>
        </Grid>
      </ListItemButton>
      <Divider />

      <Dialog
        fullWidth={true}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        disableEscapeKeyDown={false}
        sx={{ paddingY: "50px" }}
      >
        <DialogContent
          sx={{
            padding: "0px",
            "& > div": {
              display: "flex",
            },
          }}
        >
          <OrderDetails />
        </DialogContent>
      </Dialog>
    </>
  );
}
