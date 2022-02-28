import { Language, Logout } from "@mui/icons-material";
import ContactSupportRoundedIcon from "@mui/icons-material/ContactSupportRounded";
import {
  Avatar,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import { useAppDispatch } from "src/common/hooks/hooks";
import { RC } from "src/common/types/types";
import { alertActions } from "src/features/alert/state/alertSlice";
import {
  contactUsRoute,
  loginRoute,
  profileRoute,
} from "src/routes/routePaths";

type AccountSettingsProps = {
  letter: string | undefined;
};

export function AccountSettings({ letter }: AccountSettingsProps): RC {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(i18n.language);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("pip-user");
    dispatch(alertActions.resetAlertState());
    history.push(loginRoute);
  };

  const handleChangeLanguage = () => {
    if (language === "fr") {
      setLanguage("en-US");
      i18n.changeLanguage("en-US");
    } else {
      setLanguage("fr");
      i18n.changeLanguage("fr");
    }
  };

  // const handleGoToPage = (path: string) => {
  //   dispatch(navigationActions.selectPath({ path }));
  //   history.push(profileRoute);
  // };

  return (
    <>
      <Tooltip title="Paramètres du compte">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ width: 32, height: 32, backgroundColor: "#717171" }}>
            {letter}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => history.push(profileRoute)}>
          <Avatar /> {t("my_account")}
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => history.push(contactUsRoute)}>
          <ContactSupportRoundedIcon
            sx={{ fontSize: "40px", marginLeft: "-8px" }}
            color="disabled"
          />
          Contactez-nous
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleChangeLanguage}>
          <ListItemIcon>
            <Language fontSize="small" sx={{ color: "inherit" }} />
          </ListItemIcon>
          {i18n.language === "fr" ? "Anglais" : "French"}
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t("logout")}
        </MenuItem>
      </Menu>
    </>
  );
}
