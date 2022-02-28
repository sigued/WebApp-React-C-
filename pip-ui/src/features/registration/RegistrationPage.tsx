import {
  Box,
  Button,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { httpPostRequest } from "src/common/helpers/httpHelper";
import { User } from "src/features/login/state/types";
import { Banner } from "src/features/registration/Banner";
import Image from "src/images/logoPIP.png";
import { loginRoute, ordersRoute, serverBaseUrl } from "src/routes/routePaths";

export default function RegistrationPage() {
  const history = useHistory();
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const userValidated: any = history.location.state;

  if (!userValidated) return null;

  const handleRegistrationForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let registeredUser = {
      id: userValidated.response.id,
      username: data.get("username") as string,
      password: data.get("password") as string,
      email: data.get("email") as string,
    };

    if (data.get("password") !== data.get("passwordRepeated")) {
      setError(true);
      setErrorMsg("Les mots de passe ne sont pas similaires");
      return;
    }

    var response: Response | string = await httpPostRequest(
      "api/account/register",
      "POST",
      userValidated.response.token,
      registeredUser
    );

    if (typeof response === "string") {
      setError(true);
      setErrorMsg(
        "Un problème du serveur s'est produit. Veuillez réessayer svp."
      );
    } else {
      if (response?.ok) {
        setError(false);
        setRegistered(true);
        setTimeout(() => {
          login(registeredUser.username, registeredUser.password);
        }, 4000);
      }
    }
  };

  const login = async (username: string, password: string) => {
    let currentUser = {
      username: username,
      password: password,
    };

    try {
      const response: Response = await fetch(
        serverBaseUrl + "api/account/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentUser),
        }
      );

      if (!response.ok) {
        throw new Error("Server responds with error");
      }

      var content: User = await response.json();
      localStorage.removeItem("pip-user");
      localStorage.setItem("pip-user", JSON.stringify(content));
      history.push(ordersRoute);
    } catch (err) {
      localStorage.removeItem("pip-user");
      history.push(loginRoute);
      console.log(err);
    }
  };

  return (
    <>
      {registered === true ? (
        <Banner />
      ) : (
        <Grid
          container
          flexDirection="column"
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
            <Box component="form" onSubmit={handleRegistrationForm}>
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
                Formulaire d'inscription
              </Typography>
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Courriel"
                type="email"
                fullWidth
                variant="standard"
                autoFocus
                required
              />
              <TextField
                margin="dense"
                id="username"
                name="username"
                label="Nom d'utilisateur"
                type="text"
                fullWidth
                variant="standard"
                required
              />
              <TextField
                margin="dense"
                id="password"
                name="password"
                label="Mot de passe"
                type="password"
                fullWidth
                variant="standard"
                required
                onChange={() => setError(false)}
              />
              <TextField
                margin="dense"
                id="passwordRepeated"
                name="passwordRepeated"
                label="Répéter votre mot de passe"
                type="password"
                fullWidth
                variant="standard"
                required
                onChange={() => setError(false)}
              />
              {error && (
                <FormHelperText error={error}>
                  {error && errorMsg}
                </FormHelperText>
              )}
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ marginTop: "32px" }}
              >
                Soumettre
              </Button>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
