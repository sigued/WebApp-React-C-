import DownloadIcon from "@mui/icons-material/Download";
import { Button, Fab, Tooltip } from "@mui/material";
import React from "react";
import { httpPostRequest } from "src/common/helpers/httpHelper";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import { serverBaseUrl } from "src/routes/routePaths";

type OrderDownloadButtonProps = {
  orderId: string | undefined;
  type: string;
};

export function OrderDownloadButton({
  orderId,
  type,
}: OrderDownloadButtonProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.login.currentUser);

  const handleDownload = async () => {
    var response: Response | string = await httpPostRequest(
      "api/order/download/" + orderId,
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
        window.open(serverBaseUrl + "api/order/download/" + orderId, "_blank");
        dispatch(
          alertActions.createAlert({
            message: "Le fichier a été téléchargé avec succès",
            type: "success",
          })
        );
      }
    }
  };

  return (
    <>
      {type === "Fab" ? (
        <Tooltip title="Télécharger">
          <Fab
            size="medium"
            color="inherit"
            aria-label="download"
            onClick={handleDownload}
          >
            <DownloadIcon color="primary" />
          </Fab>
        </Tooltip>
      ) : (
        <Button
          variant="contained"
          size="large"
          onClick={handleDownload}
          sx={{ width: "100%" }}
        >
          Télécharger
        </Button>
      )}
    </>
  );
}
