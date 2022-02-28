import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EmailIcon from "@mui/icons-material/Email";
import FunctionsIcon from "@mui/icons-material/Functions";
import GroupsIcon from "@mui/icons-material/Groups";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import { Drawer } from "@mui/material";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import { Box } from "@mui/system";
import * as React from "react";
import { useAppSelector } from "src/common/hooks/hooks";
import { NavigationListElement } from "src/features/navigation/components/NavigationListElement";
import Image from "src/images/logoPIP.png";
import {
  correlationsRoute,
  managersRoute,
  ordersRoute,
  parametersRoute,
  requestedAccountsRoute,
  subscribersRoute,
} from "src/routes/routePaths";

const drawerWidth = 202;

export function NavigationList() {
  const user = useAppSelector((state) => state.login.currentUser);

  return (
    <Box
      sx={{
        gridRow: "sideMenu",
        gridColumn: "sideMenu",
        width: "auto",
        display: "flex",
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        anchor="left"
      >
        <img src={Image} alt="logo" width="200px" />
        <Divider />
        <List disablePadding={true}>
          {user?.role === "sadmin" ? (
            <NavigationListElement
              key={managersRoute}
              path={managersRoute}
              text="Gestionnaires"
              icon={
                <AdminPanelSettingsIcon
                  key={managersRoute}
                  sx={{ fontSize: "32px" }}
                />
              }
            />
          ) : null}
          {user?.role === "sadmin" || user?.role === "admin" ? (
            <>
              <NavigationListElement
                key={subscribersRoute}
                path={subscribersRoute}
                text="Abonnés"
                icon={
                  <GroupsIcon
                    key={subscribersRoute}
                    sx={{ fontSize: "32px" }}
                  />
                }
              />
              <NavigationListElement
                key={requestedAccountsRoute}
                path={requestedAccountsRoute}
                text="Invités"
                icon={<EmailIcon key={ordersRoute} sx={{ fontSize: "32px" }} />}
              />
              <NavigationListElement
                key={parametersRoute}
                path={parametersRoute}
                text="Paramètres"
                icon={
                  <PermDataSettingIcon
                    key={parametersRoute}
                    sx={{ fontSize: "32px" }}
                  />
                }
              />
              <NavigationListElement
                key={correlationsRoute}
                path={correlationsRoute}
                text="Corrélations"
                icon={
                  <FunctionsIcon
                    key={correlationsRoute}
                    sx={{ fontSize: "32px" }}
                  />
                }
              />
            </>
          ) : null}
          <Divider />
          {user?.role === "sadmin" ||
          user?.role === "admin" ||
          user?.role === "member" ? (
            <NavigationListElement
              key={ordersRoute}
              path={ordersRoute}
              text="Requêtes"
              icon={
                <AssignmentIcon key={ordersRoute} sx={{ fontSize: "32px" }} />
              }
            />
          ) : null}
        </List>
      </Drawer>
    </Box>
  );
}
