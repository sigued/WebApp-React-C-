import SendIcon from "@mui/icons-material/Send";
import { Fab, Grid, TableCell, TableRow, Tooltip } from "@mui/material";
import React from "react";
import { formatDate } from "src/common/helpers/dateHelper";
import { httpPostRequest } from "src/common/helpers/httpHelper";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import {
  AppEmailStatus,
  AppEmailType,
  EmailInvitation,
} from "src/features/requestedAccount/state/types";

type RequestedAccountTableRowProps = {
  requestedElement: EmailInvitation;
};
export function RequestedAccountTableRow({
  requestedElement,
}: RequestedAccountTableRowProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login.currentUser);

  const handleResend = async () => {
    var response: Response | string = await httpPostRequest(
      "api/admin/resend-email/" + requestedElement.id,
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
        dispatch(
          alertActions.createAlert({
            message: await response.text(),
            type: "success",
          })
        );
      }
    }
  };

  const getEmailStatusText = (emailStatus: AppEmailStatus): string => {
    switch (emailStatus) {
      case AppEmailStatus.Active:
        return "Actif";
      case AppEmailStatus.Expired:
        return "Expiré";
      case AppEmailStatus.Inactive:
        return "Inactif";
    }
  };
  const getEmailTypeText = (emailType: AppEmailType): string => {
    switch (emailType) {
      case AppEmailType.AccountCreation:
        return "Création du compte";
      case AppEmailType.PasswordRecovery:
        return "Récupération du mot de passe";
      case AppEmailType.UserIdRecovery:
        return "Récupération de l'id";
      case AppEmailType.Confirmation:
        return "Confirmation";
    }
  };

  return (
    <TableRow
      key={requestedElement.id}
      sx={{
        "&:nth-of-type(odd)": {
          backgroundColor: "action.hover",
        },
      }}
    >
      <TableCell>{requestedElement.receiverEmail}</TableCell>
      <TableCell>{getEmailStatusText(requestedElement.status)}</TableCell>
      <TableCell>{getEmailTypeText(requestedElement.type)}</TableCell>
      {/* <TableCell>{AppEmailType[requestedElement.type]}</TableCell> */}
      <TableCell>{requestedElement.description}</TableCell>
      <TableCell>
        {formatDate(requestedElement.creationDate.toString())}
      </TableCell>

      <TableCell>{formatDate(requestedElement.endDate.toString())}</TableCell>
      <TableCell>
        <Grid item md={2} sm={2} sx={{ textAlign: "right" }}>
          {requestedElement.status !== AppEmailStatus.Inactive && (
            <Tooltip title="Réenvoyer">
              <Fab
                size="small"
                color="inherit"
                aria-label="send"
                onClick={handleResend}
              >
                <SendIcon color="primary" />
              </Fab>
            </Tooltip>
          )}
        </Grid>
      </TableCell>
    </TableRow>
  );
}
