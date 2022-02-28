import DeleteIcon from "@mui/icons-material/Delete";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { httpPostRequest } from "src/common/helpers/httpHelper";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import { correlationsRoute } from "src/routes/routePaths";

type CorrelationDeleteButtonProps = {
  correlationId: string;
};
export function CorrelationDeleteButton({
  correlationId,
}: CorrelationDeleteButtonProps) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.login.currentUser);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteCorrelation = async (correlationId: string) => {
    var response = await httpPostRequest(
      "api/correlation/delete/" + correlationId,
      "GET",
      user?.token,
      undefined
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
        history.push(correlationsRoute);
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
      <Tooltip title="Supprimer">
        <Fab
          size="medium"
          color="inherit"
          aria-label="Supprimer"
          onClick={() => setOpenDialog(true)}
        >
          <DeleteIcon color="primary" />
        </Fab>
      </Tooltip>

      <Dialog fullWidth={true} open={openDialog}>
        <DialogTitle id="alert-dialog-title">
          <Typography>Confirmez-vous la demande de suppression ?</Typography>
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Annuler
          </Button>
          <Button onClick={() => handleDeleteCorrelation(correlationId)}>
            Confirmer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
