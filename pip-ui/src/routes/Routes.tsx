import { Route, Switch } from "react-router-dom";
import { useAppSelector } from "src/common/hooks/hooks";
import { RC } from "src/common/types/types";
import { ContactUsPage } from "src/features/contactUs/components/ContactUsPage";
import { CorrelationsPage } from "src/features/correlations/components/CorrelationsPage";
import ManagersPage from "src/features/managers/components/ManagersPage";
import { OrdersPage } from "src/features/orders/components/OrdersPage";
import { ParametersPage } from "src/features/parameters/components/ParametersPage";
import { ProfilePage } from "src/features/profile/ProfilePage";
import { RequestedAccountsPage } from "src/features/requestedAccount/components/RequestedAccountsPage";
import { SubscribersPage } from "src/features/subscribers/components/SubscribersPage";
import {
  contactUsRoute,
  correlationsRoute,
  managersRoute,
  ordersRoute,
  parametersRoute,
  profileRoute,
  requestedAccountsRoute,
  subscribersRoute,
} from "./routePaths";

export function Routes(): RC {
  const user = useAppSelector((state) => state.login.currentUser);

  return (
    <Switch>
      {user?.role === "sadmin" ? (
        <>
          <Route path={managersRoute}>
            <ManagersPage />
          </Route>
          <Route path={subscribersRoute}>
            <SubscribersPage />
          </Route>
          <Route exact path={requestedAccountsRoute}>
            <RequestedAccountsPage />
          </Route>
          <Route exact path={parametersRoute}>
            <ParametersPage />
          </Route>
          <Route path={correlationsRoute}>
            <CorrelationsPage />
          </Route>
          <Route path={ordersRoute}>
            <OrdersPage />
          </Route>
          <Route path={profileRoute}>
            <ProfilePage />
          </Route>
          <Route exact path={contactUsRoute}>
            <ContactUsPage />
          </Route>
        </>
      ) : user?.role === "admin" ? (
        <>
          <Route path={subscribersRoute}>
            <SubscribersPage />
          </Route>
          <Route exact path={requestedAccountsRoute}>
            <RequestedAccountsPage />
          </Route>
          <Route exact path={parametersRoute}>
            <ParametersPage />
          </Route>
          <Route path={correlationsRoute}>
            <CorrelationsPage />
          </Route>
          <Route path={ordersRoute}>
            <OrdersPage />
          </Route>
          <Route path={profileRoute}>
            <ProfilePage />
          </Route>
          <Route exact path={contactUsRoute}>
            <ContactUsPage />
          </Route>
        </>
      ) : (
        <>
          <Route path={ordersRoute}>
            <OrdersPage />
          </Route>
          <Route path={profileRoute}>
            <ProfilePage />
          </Route>
          <Route exact path={contactUsRoute}>
            <ContactUsPage />
          </Route>
        </>
      )}
    </Switch>
  );
}
