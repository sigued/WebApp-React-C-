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

type ElementDeleteButtonProps = {
  path: string;
  requestPath: string;
  variant: string | undefined;
};
export function ElementDeleteButton({
  path,
  requestPath,
  variant,
}: ElementDeleteButtonProps) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.login.currentUser);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDeleteElement = async () => {
    var response = await httpPostRequest(
      requestPath,
      "DELETE",
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
        history.push(path);
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
      {variant === "outlined" ? (
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          onClick={() => setOpenDialog(true)}
          size="small"
        >
          delete
        </Button>
      ) : (
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
      )}

      <Dialog fullWidth={true} open={openDialog}>
        <DialogTitle id="alert-dialog-title">
          <Typography>Confirmez-vous la demande de suppression ?</Typography>
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenDialog(false)}>
            Annuler
          </Button>
          <Button onClick={handleDeleteElement}>Confirmer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
