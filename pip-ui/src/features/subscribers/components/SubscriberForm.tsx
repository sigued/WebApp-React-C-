import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { httpPostRequest } from "src/common/helpers/httpHelper";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import { SubscriptionDuration } from "src/features/subscribers/state/types";
import { subscribersRoute } from "src/routes/routePaths";

export function SubscriberForm() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.login.currentUser);
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<
    SubscriptionDuration | string
  >(SubscriptionDuration.OneMonth);

  const handleAddNewSubscriber = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let d = data.get("subscriptionPeriod") as unknown as SubscriptionDuration;

    let newSubscriber = {
      email: data.get("email") as string,
      duration: parseInt(d?.toString()),
      description: data.get("description") as string,
      role: "member",
      createdBy: user?.username,
    };

    var response: Response | string = await httpPostRequest(
      "api/admin/create-account",
      "POST",
      user?.token,
      newSubscriber
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
        history.push(subscribersRoute);
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
                Ajouter un nouveau abonné
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Box component="form" onSubmit={handleAddNewSubscriber}>
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
                />
                <FormControl
                  variant="standard"
                  fullWidth={true}
                  required
                  sx={{ marginTop: "16px" }}
                >
                  <InputLabel id="subscriptionPeriod">
                    Période d'abonnement
                  </InputLabel>
                  <Select
                    labelId="subscriptionPeriod"
                    id="subscriptionPeriod"
                    name="subscriptionPeriod"
                    value={subscriptionPeriod}
                    onChange={(event) =>
                      setSubscriptionPeriod(event.target.value)
                    }
                    label="Période d'abonnement"
                  >
                    <MenuItem value={SubscriptionDuration.OneMonth}>
                      Un mois
                    </MenuItem>
                    <MenuItem value={SubscriptionDuration.towMonth}>
                      Deux mois
                    </MenuItem>
                    <MenuItem value={SubscriptionDuration.SixMonth}>
                      Six mois
                    </MenuItem>
                    <MenuItem value={SubscriptionDuration.OneYear}>
                      Douze mois
                    </MenuItem>
                  </Select>
                </FormControl>
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
