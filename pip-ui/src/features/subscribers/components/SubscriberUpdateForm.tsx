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
import React, { useEffect, useState } from "react";
import { httpPostRequest } from "src/common/helpers/httpHelper";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import { subscribersActions } from "src/features/subscribers/state/subscribersSlice";
import { SubscriptionDuration } from "src/features/subscribers/state/types";

export function SubscriberUpdateForm() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login.currentUser);
  const selectedSubscriber = useAppSelector(
    (state) => state.subscribers.selectedSubscriber
  );
  const [email, setEmail] = useState<string | undefined>("");
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<
    SubscriptionDuration | string
  >(SubscriptionDuration.OneMonth);

  const handleUpdateSubscriber = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let d = data.get("subscriptionPeriod") as unknown as SubscriptionDuration;

    let updatedSubscriber = {
      email: data.get("email") as string,
      duration: parseInt(d?.toString()),
      description: data.get("description") as string,
      role: "member",
      createdBy: user?.username,
    };

    var response: Response | string = await httpPostRequest(
      "api/admin/update-subscriber",
      "POST",
      user?.token,
      updatedSubscriber
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
        dispatch(subscribersActions.toUpdate({ toUpdate: false }));
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
    setEmail(selectedSubscriber?.email);
  }, [selectedSubscriber?.email]);

  return (
    <>
      <Grid item sx={{ margin: "16px" }}>
        <Paper elevation={8} sx={{ paddingX: "16px", paddingY: "16px" }} square>
          <Grid container>
            <Grid item>
              <Typography variant="h6" sx={{ color: "text.secondary" }}>
                Mettre à jour l'abonné "{selectedSubscriber?.username}"
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Box component="form" onSubmit={handleUpdateSubscriber}>
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
            <Grid item md={6} sm={6}>
              <Button
                variant="outlined"
                size="large"
                sx={{ width: "100%" }}
                onClick={() =>
                  dispatch(subscribersActions.toUpdate({ toUpdate: false }))
                }
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
    </>
  );
}
