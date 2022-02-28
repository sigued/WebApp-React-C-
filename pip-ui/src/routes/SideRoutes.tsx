import { Route, Switch } from "react-router-dom";
import { useAppSelector } from "src/common/hooks/hooks";
import { RC } from "src/common/types/types";
import { CorrelationDetails } from "src/features/correlations/components/CorrelationDetails";
import { ManagerDetails } from "src/features/managers/components/ManagerDetails";
import { OrderDetails } from "src/features/orders/components/OrderDetails";
import { ProfilePageUpdate } from "src/features/profile/ProfilePageUpdate";
import { SubscriberDetails } from "src/features/subscribers/components/SubscriberDetails";
import {
  correlationsRoute,
  managersRoute,
  ordersRoute,
  profileRoute,
  subscribersRoute,
} from "./routePaths";

export function SideRoutes(): RC {
  const user = useAppSelector((state) => state.login.currentUser);

  return (
    <Switch>
      {user?.role === "sadmin" ? (
        <>
          <Route path={[`${managersRoute}/:managerId`]}>
            <ManagerDetails />
          </Route>
          <Route path={[`${subscribersRoute}/:subscriberId`]}>
            <SubscriberDetails />
          </Route>
          <Route path={[`${correlationsRoute}/:correlationId`]}>
            <CorrelationDetails />
          </Route>
          <Route path={[`${ordersRoute}/:orderId`]}>
            <OrderDetails />
          </Route>
          <Route path={[`${profileRoute}/:userId`]}>
            <ProfilePageUpdate />
          </Route>
        </>
      ) : user?.role === "admin" ? (
        <>
          <Route path={[`${subscribersRoute}/:subscriberId`]}>
            <SubscriberDetails />
          </Route>
          <Route path={[`${correlationsRoute}/:correlationId`]}>
            <CorrelationDetails />
          </Route>
          <Route path={[`${ordersRoute}/:orderId`]}>
            <OrderDetails />
          </Route>
          <Route path={[`${profileRoute}/:userId`]}>
            <ProfilePageUpdate />
          </Route>
        </>
      ) : (
        <>
          <Route path={[`${ordersRoute}/:orderId`]}>
            <OrderDetails />
          </Route>
          <Route path={[`${profileRoute}/:userId`]}>
            <ProfilePageUpdate />
          </Route>
        </>
      )}
    </Switch>
  );
}
