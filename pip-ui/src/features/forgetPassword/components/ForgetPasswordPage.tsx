import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Image from "src/images/logoPIP.png";
import { serverBaseUrl } from "src/routes/routePaths";

export function ForgetPasswordPage() {
  const [error, setError] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState<string | undefined>("");

  const handleSendEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const currentEmail: string | undefined = data.get("email")?.toString();
    setEmail(currentEmail);

    try {
      await fetch(
        serverBaseUrl + "api/account/reset-link?email=" + currentEmail,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setEmailSent(true);
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
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
      <Grid
        item
        sx={{
          ...(!emailSent && {
            border: "3px solid",
            borderColor: "primary.main",
            borderRadius: "4px",
            padding: "16px",
          }),
          width: "45%",
          backgroundColor: "background.paper",
        }}
      >
        {emailSent ? (
          <Alert
            severity="success"
            sx={{
              fontSize: "24px",
              border: "2px solid",
              borderColor: "inherit",
              "div > svg": {
                width: "48px",
                height: "48px",
              },
            }}
          >
            <AlertTitle sx={{ fontSize: "24px" }}>Succès</AlertTitle>
            <Typography noWrap={false}>
              Courriel envoyé. —{" "}
              <strong>
                Vous recevrez un lien à {email} pour réinitialiser votre mot de
                passe.
              </strong>
            </Typography>
          </Alert>
        ) : (
          <Box component="form" onSubmit={handleSendEmail}>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <img src={Image} alt="logo" width="150px" />
              </Grid>
            </Grid>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "text.secondary",
              }}
            >
              Saisir votre courriel pour recevoir un lien de réinitialisation
            </Typography>
            <TextField
              margin="dense"
              id="email"
              name="email"
              label="Courriel"
              type="email"
              fullWidth
              variant="standard"
              autoFocus
              required
              error={error}
              helperText={error && "Veuillez réessayer"}
              onChange={() => setError(false)}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{ marginTop: "32px" }}
            >
              Envoyer
            </Button>
          </Box>
        )}
      </Grid>
    </Grid>
  );
}
