import { PropsWithChildren, useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { useStyles } from "src/common/styles/layout";
import { HeaderBar } from "src/features/headerBar/components/HeaderBar";
import { loginActions } from "src/features/login/state/loginSlice";
import { loginRoute } from "src/routes/routePaths";

export const UiApp = ({ children }: PropsWithChildren<{}>) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [localUser] = useState(localStorage.getItem("pip-user"));
  dispatch(loginActions.setUser({ user: localUser }));
  const user = useAppSelector((state) => state.login.currentUser);

  if (user?.token === undefined) {
    history.push(loginRoute);
    return null;
  }

  return (
    <>
      <HeaderBar />
      <div className={classes.root}>{children}</div>
    </>
  );
};
