import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { httpPostRequest } from "src/common/helpers/httpHelper";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import { managersRoute } from "src/routes/routePaths";

export function ManagerForm() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.login.currentUser);
  const [role, setRole] = useState("");
  const [error, setError] = useState(false);

  const handleAddNewManager = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (role === "") {
      setError(true);
      return;
    }

    let newManager = {
      email: data.get("email") as string,
      description: data.get("description") as string,
      role: role,
      createdBy: user?.username,
    };

    var response: Response | string = await httpPostRequest(
      "api/admin/create-admin",
      "POST",
      user?.token,
      newManager
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
        history.push("");
        history.push(managersRoute);
        dispatch(
          alertActions.createAlert({
            message: await response.text(),
            type: "success",
          })
        );
      }
    }
  };

  return (
    <>
      <Grid item sx={{ margin: "16px" }}>
        <Paper elevation={8} sx={{ paddingX: "16px", paddingY: "16px" }} square>
          <Grid container>
            <Grid item>
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                Ajouter un nouveau gestionnaire
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Box component="form" onSubmit={handleAddNewManager}>
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
                  autoFocus
                  required
                />
                <TextField
                  margin="dense"
                  id="description"
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="standard"
                  required
                />
                <FormControl
                  component="fieldset"
                  variant="standard"
                  sx={{ marginTop: "16px" }}
                  required
                >
                  <FormLabel component="legend">Rôle</FormLabel>
                  <RadioGroup
                    row
                    aria-label="role"
                    name="role"
                    onChange={(event) => setRole(event.target.value)}
                  >
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Administrateur"
                    />
                    <FormControlLabel
                      value="sadmin"
                      control={<Radio />}
                      label="Super Administrateur"
                    />
                  </RadioGroup>
                </FormControl>
                {error && (
                  <FormHelperText error={error}>
                    Veuillez remplir tous les champs.
                  </FormHelperText>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item sx={{ margin: "16px" }}>
          <Grid container>
            <Grid item md={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "100%" }}
              >
                Ajouter
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
