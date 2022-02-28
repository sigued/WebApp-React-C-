import AddIcon from "@mui/icons-material/Add";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  TextField,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import { OrderSelectGroupParameters } from "src/features/orders/components/OrderSelectGroupParameters";
import { ordersActions } from "src/features/orders/state/ordersSlice";
import {
  Parameter,
  ReceivedOrderFormContent,
} from "src/features/orders/state/types";
import { ordersRoute, serverBaseUrl } from "src/routes/routePaths";

export function OrderForm() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.login.currentUser);
  let parameters = useAppSelector((state) => state.orders.parameters);
  const selectedParametersId = useAppSelector(
    (state) => state.orders.selectedParametersId
  );
  const [categories, setCategories] = useState<ReceivedOrderFormContent[]>([]);
  const [openOrderForm, setOpenOrderForm] = useState(false);

  const handleOpenOrderForm = () => {
    handleGetParameters();
    setOpenOrderForm(true);
  };

  const handleCloseOrderForm = () => {
    dispatch(ordersActions.clearSelectedParameters());
    setOpenOrderForm(false);
  };

  const handleGetParameters = async () => {
    try {
      const response: Response = await fetch(
        serverBaseUrl + "api/parameter/get-parameters",
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + user?.token,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Server responds with error");
      }

      const content: ReceivedOrderFormContent[] = await response.json();
      setCategories(content);
      const array: Parameter[] = [];
      content.forEach((c) => {
        c.parameterList.forEach((p) => {
          array.push(p);
        });
      });
      dispatch(ordersActions.setAllParameters({ parameters: array }));
    } catch (err) {}
  };

  const handleCreateOrder = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const array: Parameter[] = [];
    selectedParametersId?.forEach((id) => {
      array.push(parameters[id]);
    });

    let newOrder = {
      userId: user?.id,
      description: data.get("description") as string,
      parameters: array,
    };

    try {
      const response = await fetch(serverBaseUrl + "api/order/add-order", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + user?.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error("Server responds with error");
      }

      setOpenOrderForm(false);
      dispatch(ordersActions.clearSelectedParameters());
      dispatch(
        alertActions.createAlert({
          message:
            "La création d'une nouvelle requête a été effectué avec succés.",
          type: "success",
        })
      );
      history.push("");
      history.push(ordersRoute);
    } catch (err) {
      dispatch(
        alertActions.createAlert({
          message: "La création d'une nouvelle requête a échoué.",
          type: "error",
        })
      );
    }
  };

  const handleParamRightValues = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const id = event.target.id as string;
    const value = event.target.value as string;
    const intValue = parseInt(value);

    dispatch(ordersActions.updateParameter({ id, value: intValue }));
  };

  return (
    <>
      <Tooltip title="Ajouter une nouvelle requête">
        <Fab
          size="medium"
          color="inherit"
          aria-label="add"
          onClick={handleOpenOrderForm}
        >
          <AddIcon color="primary" />
        </Fab>
      </Tooltip>

      <Dialog
        open={openOrderForm}
        fullWidth
        disableEscapeKeyDown={true}
        maxWidth="md"
      >
        <DialogTitle>Ajouter une requête</DialogTitle>
        <Box component="form" onSubmit={handleCreateOrder}>
          <DialogContent>
            <DialogContentText>
              Pour ajouter une nouvelle requête, veuillez fournir les
              informations suivantes.
            </DialogContentText>

            <Grid container>
              <Grid item md={6} sm={6}>
                <Grid container flexDirection="column">
                  <Grid item>
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
                  </Grid>
                  <Grid item>
                    <OrderSelectGroupParameters categories={categories} />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={false} md={1}>
                <Divider
                  orientation="vertical"
                  textAlign="center"
                  sx={{ marginTop: "24px" }}
                >
                  .
                </Divider>
              </Grid>
              <Grid item md={5} sm={5}>
                {selectedParametersId?.map((id) =>
                  id === undefined ? null : (
                    <TextField
                      key={parameters[id].id}
                      margin="dense"
                      id={parameters[id].id}
                      name={parameters[id].id}
                      label={parameters[id].name}
                      type="text"
                      fullWidth
                      variant="standard"
                      required
                      onChange={handleParamRightValues}
                    />
                  )
                )}
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseOrderForm}>Annuler</Button>
            <Button type="submit">Passer la requête</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
