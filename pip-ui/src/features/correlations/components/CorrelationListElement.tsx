import {
  Dialog,
  DialogContent,
  Divider,
  Grid,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { ElementDeleteButton } from "src/common/components/ElementDeleteButton";
import { httpPostRequest } from "src/common/helpers/httpHelper";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import { CorrelationDetails } from "src/features/correlations/components/CorrelationDetails";
import { correlationsActions } from "src/features/correlations/state/correlationsSlice";
import {
  Correlation,
  CorrelationDetailsProps,
} from "src/features/correlations/state/types";
import { correlationsRoute } from "src/routes/routePaths";

type CorrelationListElementProps = {
  correlation: Correlation;
};

export function CorrelationListElement({
  correlation,
}: CorrelationListElementProps) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.login.currentUser);
  const isSelected = useAppSelector(
    (state) => state.correlations.selectedCorrelation?.id === correlation.id
  );
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickCorrelation = async (correlationId: string) => {
    if (window.innerWidth <= 900) {
      setOpenDialog(true);
      await getCorrelationById(correlationId);
    } else {
      await getCorrelationById(correlationId);
    }
  };

  const getCorrelationById = async (correlationId: string) => {
    var response = await httpPostRequest(
      "api/correlation/get-correlation-details/" + correlation.id,
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
        const content: CorrelationDetailsProps = await response.json();
        dispatch(
          correlationsActions.selectCorrelation({ correlation: content })
        );
        history.push(correlationsRoute + "/" + correlationId);
      }
    }
  };

  return (
    <>
      <ListItemButton
        selected={isSelected}
        onClick={() => handleClickCorrelation(correlation.id)}
      >
        <Grid
          custom-attribute="test"
          container
          wrap="nowrap"
          sx={{ paddingY: "16px" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography>{correlation.description}</Typography>
          </Grid>
          <Grid item>
            <ElementDeleteButton
              path={correlationsRoute}
              requestPath={"api/correlation/delete/" + correlation.id}
              variant={undefined}
            />
          </Grid>
        </Grid>
      </ListItemButton>
      <Divider />

      <Dialog
        fullWidth={true}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        disableEscapeKeyDown={false}
        sx={{ paddingY: "50px" }}
      >
        <DialogContent
          sx={{
            padding: "0px",
            "& > div": {
              display: "flex",
            },
          }}
        >
          <CorrelationDetails />
        </DialogContent>
      </Dialog>
    </>
  );
}
