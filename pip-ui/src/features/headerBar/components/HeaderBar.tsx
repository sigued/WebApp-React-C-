import { Box, CssBaseline } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/common/hooks/hooks";
import { AccountSettings } from "src/features/headerBar/components/HeaderSettings";

const drawerWidth = 200;

export function HeaderBar() {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.login.currentUser);
  const getFirstLetter = (): string | undefined => {
    return user?.username?.charAt(0).toUpperCase();
  };

  return (
    <Box
      sx={{
        zIndex: 4000,
        height: "64px",
        width: "auto",
        display: "flex",
        gridRow: "header",
        gridColumn: "header",
      }}
    >
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          // height: "72px",
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {t("dashboard")}
          </Typography>
          <Typography variant="h6">{user?.username ?? "No user"}</Typography>
          <AccountSettings letter={getFirstLetter()} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
