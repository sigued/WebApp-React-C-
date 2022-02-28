import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { sortDate } from "src/common/helpers/dateHelper";
import { useFetchRequest } from "src/common/hooks/fetchHook";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { OrderListElement } from "src/features/orders/components/OrderListElement";
import { ordersActions } from "src/features/orders/state/ordersSlice";
import { Order } from "src/features/orders/state/types";
import { ordersRoute } from "src/routes/routePaths";

export function OrderList() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.login.currentUser);
  const ordersId = useAppSelector((state) => state.orders.ordersId);
  const selectedOrder = useAppSelector((state) => state.orders.selectedOrder);
  const { response }: { response: Response | undefined } = useFetchRequest(
    "api/order/" + user?.id,
    "GET"
  );

  useEffect(() => {
    if (selectedOrder === undefined) {
      history.push(ordersRoute);
    }

    const handleGetAllOrders = async () => {
      if (response?.ok) {
        var content: Order[] = await response.clone().json();
        content = sortDate(content);
        dispatch(ordersActions.setAllOrders({ orders: content }));
      }
    };
    handleGetAllOrders();
  }, [dispatch, history, response, selectedOrder]);

  return (
    <Grid>
      <Paper elevation={8} square>
        {ordersId.map((id) => (
          <OrderListElement key={id} orderId={id} />
        ))}
      </Paper>
    </Grid>
  );
}
