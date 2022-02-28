import AddIcon from "@mui/icons-material/Add";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormHelperText,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { httpPostRequest } from "src/common/helpers/httpHelper";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import { parametersRoute } from "src/routes/routePaths";

export function ParameterForm() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login.currentUser);
  const [openCreateParameterForm, setOpenCreateParameter] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddParameter = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    let newParameter = {
      category: data.get("category") as string,
      name: data.get("parameterName") as string,
      symbole: data.get("symbole") as string,
      unit: data.get("unit") as string,
    };

    var response = await httpPostRequest(
      "api/parameter/add",
      "POST",
      user?.token,
      newParameter
    );

    if (typeof response === "string") {
      setErrorMsg(response);
    } else {
      if (response?.ok) {
        setOpenCreateParameter(false);
        setErrorMsg("");
        history.push("");
        history.push(parametersRoute);
        dispatch(
          alertActions.createAlert({
            message: await response.text(),
            type: "success",
          })
        );
      }
    }
  };

  const handleOpenCreateParameterForm = () => {
    setOpenCreateParameter(true);
  };

  return (
    <>
      <Tooltip title="Ajouter un nouveau paramètre">
        <Fab
          size="medium"
          color="inherit"
          aria-label="register"
          onClick={handleOpenCreateParameterForm}
        >
          <AddIcon color="primary" />
        </Fab>
      </Tooltip>

      <Dialog
        open={openCreateParameterForm}
        maxWidth="lg"
        disableEscapeKeyDown={true}
      >
        <DialogTitle>Formulaire d'ajout d'un nouveau paramètre</DialogTitle>
        <Box component="form" onSubmit={handleAddParameter}>
          <DialogContent>
            <DialogContentText>
              Pour ajouter un nouveau paramètre, veuillez fournir les
              informations suivantes.
            </DialogContentText>
            <TextField
              margin="dense"
              id="category"
              name="category"
              label="Catégorie"
              type="text"
              fullWidth
              variant="standard"
              required
              autoFocus
            />
            <TextField
              margin="dense"
              id="parameterName"
              name="parameterName"
              label="Nom du paramètre"
              type="text"
              fullWidth
              variant="standard"
              required
            />
            <TextField
              margin="dense"
              id="symbole"
              name="symbole"
              label="Symbole"
              type="text"
              fullWidth
              variant="standard"
              required
            />
            <TextField
              margin="dense"
              id="unit"
              name="unit"
              label="Unité"
              type="text"
              fullWidth
              variant="standard"
            />
            {errorMsg !== "" && (
              <FormHelperText error={errorMsg !== "" ? true : false}>
                {errorMsg}
              </FormHelperText>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenCreateParameter(false);
                setErrorMsg("");
              }}
            >
              Annuler
            </Button>
            <Button type="submit">Envoyer</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
