import { Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { httpPostRequest } from "src/common/helpers/httpHelper";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import { profileRoute } from "src/routes/routePaths";

export function ProfilePageUpdate() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.login.currentUser);
  const [email, setEmail] = useState<string>("");
  const [profession, setProfession] = useState<string | undefined>("");
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>("");

  const handleUpdateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let updatedUser = {
      username: user?.username,
      email: data.get("email") as string,
      profession: data.get("profession") as string,
      phoneNumber: data.get("phoneNumber") as string,
    };

    console.log(updatedUser);

    var response: Response | string = await httpPostRequest(
      "api/account/user/" + user?.id,
      "POST",
      user?.token,
      updatedUser
    );

    if (typeof response === "string") {
      dispatch(
        alertActions.createAlert({
          message: response,
          type: "error",
        })
      );
    } else {
      if (response?.ok) {
        history.push(profileRoute);
        dispatch(
          alertActions.createAlert({
            message: await response.text(),
            type: "success",
          })
        );
      }
    }
  };

  useEffect(() => {
    if (user?.email !== undefined) {
      setEmail(user.email);
    }

    if (user?.profession !== undefined) {
      setProfession(user?.profession);
    }

    if (user?.phoneNumber !== undefined) {
      setPhoneNumber(user?.phoneNumber);
    }
  }, [user, user?.email]);

  return (
    <Grid
      container
      flexDirection="column"
      flexWrap="nowrap"
      sx={{
        "@media (min-width:900px)": {
          gridRow: "right",
          gridColumn: "right",
        },
        "@media (max-width:900px)": {
          display: "none",
        },
      }}
    >
      <Grid item sx={{ margin: "16px" }}>
        <Paper elevation={8} sx={{ paddingX: "16px", paddingY: "16px" }} square>
          <Grid container>
            <Grid item>
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                Mettre à jour votre profil d'utilisateur
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Box component="form" onSubmit={handleUpdateUser}>
        <Grid item sx={{ margin: "16px" }}>
          <Paper
            elevation={8}
            sx={{ paddingX: "16px", paddingY: "16px" }}
            square
          >
            <Grid container flexDirection="column">
              <Grid item>
                <TextField
                  margin="dense"
                  id="email"
                  name="email"
                  label="Courriel"
                  type="email"
                  fullWidth
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
                <TextField
                  margin="dense"
                  id="profession"
                  name="profession"
                  label="Profession"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />
                <TextField
                  margin="dense"
                  id="phone"
                  name="phoneNumber"
                  label="Numéro de téléphone"
                  type="number"
                  fullWidth
                  variant="standard"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sx={{ margin: "16px" }}>
          <Grid container>
            <Grid item md={6} sm={6}>
              <Button
                variant="outlined"
                size="large"
                sx={{ width: "100%" }}
                onClick={() => history.push(profileRoute)}
              >
                Annuler
              </Button>
            </Grid>
            <Grid item md={6} sm={6}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "100%", marginLeft: "2px" }}
              >
                Confirmer la mise à jour
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}
