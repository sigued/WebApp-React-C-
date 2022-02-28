import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { formatDate } from "src/common/helpers/dateHelper";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { AppUserStatus } from "src/features/managers/state/types";
import { SubscriberForm } from "src/features/subscribers/components/SubscriberForm";
import { SubscriberUpdateForm } from "src/features/subscribers/components/SubscriberUpdateForm";
import { subscribersActions } from "src/features/subscribers/state/subscribersSlice";

export function SubscriberDetails() {
  const dispatch = useAppDispatch();
  const selectedSubscriber = useAppSelector(
    (state) => state.subscribers.selectedSubscriber
  );
  const isToUpdate = useAppSelector((state) => state.subscribers.isToUpdate);

  const getAccountStatusText = (accountStatus: AppUserStatus): string => {
    switch (accountStatus) {
      case AppUserStatus.Active:
        return "Actif";
      case AppUserStatus.Inactive:
        return "Inactif";
    }
  };

  const getRoleText = (role: string): string => {
    switch (role) {
      case "member":
        return "Membre";
      case "admin":
        return "Administrateur";
      case "sadmin":
        return "Super Administrateur";
      default:
        return "";
    }
  };

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
      {selectedSubscriber === undefined ? (
        <SubscriberForm />
      ) : isToUpdate === false ? (
        <>
          <Grid item sx={{ margin: "16px" }}>
            <Paper
              elevation={8}
              sx={{ paddingX: "16px", paddingY: "16px" }}
              square
            >
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">Nom d'utilisateur:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", marginLeft: "4px" }}
                  >
                    {selectedSubscriber?.username}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">Statut du compte:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    sx={{
                      color:
                        selectedSubscriber?.userStatusAccount ===
                        AppUserStatus.Active
                          ? "success.main"
                          : "error.main",
                      marginLeft: "4px",
                    }}
                  >
                    {getAccountStatusText(
                      selectedSubscriber?.userStatusAccount
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item sx={{ margin: "16px" }}>
            <Paper
              elevation={8}
              sx={{ paddingX: "16px", paddingY: "16px" }}
              square
            >
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">Courriel:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", marginLeft: "4px" }}
                  >
                    {selectedSubscriber?.email}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">Rôle:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", marginLeft: "4px" }}
                  >
                    {getRoleText(selectedSubscriber?.mainRole)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">Créé par:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", marginLeft: "4px" }}
                  >
                    {selectedSubscriber?.createdBy}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">Date de début:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", marginLeft: "4px" }}
                  >
                    {formatDate(selectedSubscriber?.startDate.toString())}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">Date de fin:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", marginLeft: "4px" }}
                  >
                    {formatDate(selectedSubscriber?.endDate.toString())}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            <Grid sx={{ marginTop: "16px" }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ width: "100%" }}
                onClick={() =>
                  dispatch(subscribersActions.toUpdate({ toUpdate: true }))
                }
              >
                Mettre à jour
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (
        <SubscriberUpdateForm />
      )}
    </Grid>
  );
}
