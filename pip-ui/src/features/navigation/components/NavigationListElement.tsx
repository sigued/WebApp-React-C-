import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { ReactElement, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useAppDispatch } from "src/common/hooks/hooks";
import { correlationsActions } from "src/features/correlations/state/correlationsSlice";
import { navigationActions } from "src/features/navigation/state/navigationSlice";
import { ordersActions } from "src/features/orders/state/ordersSlice";
import { correlationsRoute, ordersRoute } from "src/routes/routePaths";

type NavigationListElementProps = {
  path: string;
  text: string;
  icon: ReactElement;
};

export function NavigationListElement({
  path,
  text,
  icon,
}: NavigationListElementProps) {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const history = useHistory();
  const [pageSelected, setPageSelected] = useState(false);

  const handleGoToPage = (path: string) => {
    if (path === correlationsRoute) {
      dispatch(correlationsActions.resetCorrelationsState());
    }

    if (path === ordersRoute) {
      dispatch(ordersActions.resetOrderState());
    }

    dispatch(navigationActions.selectPath({ path }));
    history.push(path);
  };

  useEffect(() => {
    setPageSelected(location.pathname.includes(path));
  }, [location.pathname, path]);

  return (
    <ListItem disableGutters={true} disablePadding={true}>
      <ListItemButton
        selected={pageSelected}
        sx={{ height: "80px" }}
        onClick={() => handleGoToPage(path)}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}
