import {
  Alert,
  AlertTitle,
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { RC } from "src/common/types/types";
import { User } from "src/features/login/state/types";
import { registrationRoute, serverBaseUrl } from "src/routes/routePaths";

export function EmailValidationPage(): RC {
  const history = useHistory();
  const location = useLocation();
  const [isValidated, setIsValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getUrlGuid = (): string => {
    let guidIndex = location.pathname.lastIndexOf("/");
    return location.pathname.substring(guidIndex + 1);
  };

  const validateEmailGuid = async () => {
    try {
      setIsLoading(true);
      const response: Response = await fetch(
        serverBaseUrl + "api/account/subscriptionCreation/" + getUrlGuid(),
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error("Server responds with error");
      }

      var content: User = await response.json();
      setIsLoading(false);
      setIsValidated(true);
      setOpenBackDrop(false);
      setTimeout(() => {
        history.push(registrationRoute, { response: content });
      }, 4000);
    } catch (err) {
      setIsLoading(false);
      setIsValidated(false);
      setOpenBackDrop(false);
    }
  };

  useEffect((): any => {
    handleToggle();
    validateEmailGuid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [openBackDrop, setOpenBackDrop] = useState(false);

  const handleToggle = () => {
    setOpenBackDrop(true);
  };

  return (
    <>
      {isLoading ? (
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackDrop}
          >
            <Typography variant="h4" sx={{ marginRight: "16px" }}>
              Validation de votre compte est en cours
            </Typography>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      ) : isValidated ? (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "action.hover",
          }}
        >
          <Grid item>
            <Alert
              severity="success"
              sx={{
                fontSize: "24px",
                border: "2px solid",
                borderColor: "inherit",
                borderBottomRightRadius: "0px",
                borderBottomLeftRadius: "0px",
                borderBottom: "none",
                width: "100%",
                "div > svg": {
                  width: "48px",
                  height: "48px",
                },
              }}
            >
              <AlertTitle sx={{ fontSize: "24px" }}>Succès</AlertTitle>
              Votre compte a été enregistré avec succès. —{" "}
              <strong>
                Nous vous redirigeons vers la page d'inscription..
              </strong>
            </Alert>
            <Box sx={{ width: "100%", marginLeft: "16px" }}>
              <LinearProgress />
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "action.hover",
          }}
        >
          <Grid item>
            <Alert
              severity="error"
              sx={{
                fontSize: "24px",
                border: "2px solid",
                borderColor: "inherit",
                width: "100%",
                "div > svg": {
                  width: "48px",
                  height: "48px",
                },
              }}
            >
              <AlertTitle sx={{ fontSize: "24px" }}>Erreur</AlertTitle>
              L'ID dans l'URL n'est pas valide. —{" "}
              <strong>Veuillez réessayer!</strong>
            </Alert>
          </Grid>
        </Grid>
      )}
    </>
  );
}
