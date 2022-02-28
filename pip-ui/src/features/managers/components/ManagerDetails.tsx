import { Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useAppSelector } from "src/common/hooks/hooks";
import { ManagerForm } from "src/features/managers/components/ManagerForm";
import { AppUserStatus } from "src/features/managers/state/types";

export function ManagerDetails() {
  const selectedManager = useAppSelector(
    (state) => state.managers.selectedManager
  );

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
      {selectedManager === undefined ? (
        <ManagerForm />
      ) : (
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
                    {selectedManager?.username}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">Statut:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    sx={{
                      color:
                        selectedManager?.status === AppUserStatus.Active
                          ? "success.main"
                          : "error.main",
                      marginLeft: "4px",
                    }}
                  >
                    {AppUserStatus[selectedManager?.status]}
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
                    {selectedManager?.email}
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
                    {selectedManager?.mainRole}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">Profession:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", marginLeft: "4px" }}
                  >
                    {selectedManager?.profession}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="button">Numéro de téléphone:</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", marginLeft: "4px" }}
                  >
                    {selectedManager?.phoneNumber}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </>
      )}
    </Grid>
  );
}
