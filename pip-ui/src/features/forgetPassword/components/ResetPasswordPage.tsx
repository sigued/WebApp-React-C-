import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { httpPostRequest } from "src/common/helpers/httpHelper";
import Image from "src/images/logoPIP.png";
import { loginRoute } from "src/routes/routePaths";

export function ResetPasswordPage() {
  const location = useLocation();
  const history = useHistory();
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const handleResetAccount = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const newPassword = data.get("newPassword") as string;
    const confirmedPassword = data.get("newPasswordRepeated") as string;

    if (newPassword !== confirmedPassword) {
      setError(true);
      setErrorMsg("Les mots de passe ne sont pas similaires");
      return;
    }

    let currentUser = {
      email: email,
      password: newPassword,
      confirmPassword: confirmedPassword,
      token: token,
    };

    var response: Response | string = await httpPostRequest(
      "api/account/password-reset",
      "POST",
      "",
      currentUser
    );

    if (typeof response === "string") {
      setError(true);
      setErrorMsg("Un problème s'est produit. Veuillez réessayer svp.");
    } else {
      if (response?.ok) {
        history.push(loginRoute);
      }
    }
  };

  useEffect(() => {
    const array = location.search.split("&Token=");
    setToken(array[1]);
    setEmail(array[0].split("email=")[1]);
  }, [location.search]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "action.hover",
      }}
    >
      <Grid
        item
        sx={{
          border: "3px solid",
          borderColor: "primary.main",
          borderRadius: "4px",
          padding: "16px",
          width: "45%",
          backgroundColor: "background.paper",
        }}
      >
        <Box component="form" onSubmit={handleResetAccount}>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <img src={Image} alt="logo" width="150px" />
            </Grid>
          </Grid>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "text.secondary",
            }}
          >
            Réinitialiser votre mot de passe
          </Typography>
          <TextField
            margin="dense"
            id="newPassword"
            name="newPassword"
            label="Saisir votre nouveau mot de passe"
            type="password"
            fullWidth
            variant="standard"
            autoFocus
            required
            error={error}
            onChange={() => setError(false)}
          />
          <TextField
            margin="dense"
            id="newPasswordRepeated"
            name="newPasswordRepeated"
            label="Répéter votre nouveau mot de passe"
            type="password"
            fullWidth
            variant="standard"
            required
            error={error}
            helperText={error && errorMsg}
            onChange={() => setError(false)}
          />

          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{ marginTop: "32px" }}
          >
            Réinitialiser
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
