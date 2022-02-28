import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { UiApp } from "src/common/components/UiApp";
import { UiAside } from "src/common/components/UiAside";
import { UiMain } from "src/common/components/UiMain";
import { history } from "src/common/helpers/historyHelper";
import { theme } from "src/common/styles/theme";
import { RC } from "src/common/types/types";
import { ForgetPasswordPage } from "src/features/forgetPassword/components/ForgetPasswordPage";
import { ResetPasswordPage } from "src/features/forgetPassword/components/ResetPasswordPage";
import { LoginPage } from "src/features/login/components/LoginPage";
import { EmailValidationPage } from "src/features/registration/EmailValidationPage";
import RegistrationPage from "src/features/registration/RegistrationPage";
import {
  dashboardRoute,
  emailValidationRoute,
  forgetPasswordRoute,
  loginRoute,
  registrationRoute,
  resetPasswordRoute,
} from "src/routes/routePaths";
import { Routes } from "src/routes/Routes";
import { SideRoutes } from "src/routes/SideRoutes";
import { store } from "src/state/store";
import "src/translations/i18n";

export function App(): RC {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path={loginRoute} component={() => <LoginPage />} />
            <Route
              exact
              path={forgetPasswordRoute}
              component={() => <ForgetPasswordPage />}
            />
            <Route
              path={`${resetPasswordRoute}`}
              component={() => <ResetPasswordPage />}
            />
            <Route
              exact
              path={`${emailValidationRoute}/:emailId`}
              component={() => <EmailValidationPage />}
            />
            <Route path={registrationRoute}>
              <RegistrationPage />
            </Route>
            <Route path={dashboardRoute}>
              <UiApp>
                <UiAside>
                  <SideRoutes />
                </UiAside>
                <UiMain>
                  <Routes />
                </UiMain>
              </UiApp>
            </Route>
          </Switch>
        </ThemeProvider>
      </Router>
    </Provider>
  );
}

export default App;
