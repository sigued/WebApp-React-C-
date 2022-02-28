import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Copyright } from "src/common/components/UiCopyRight";
import { RC } from "src/common/types/types";
import {
  StyledBoxSignIn,
  StyledGridItemImage,
} from "src/features/login/components/loginPage.style";
import { User } from "src/features/login/state/types";
import {
  forgetPasswordRoute,
  ordersRoute,
  serverBaseUrl,
} from "src/routes/routePaths";

export function LoginPage(): RC {
  const history = useHistory();
  const [user] = useState(localStorage.getItem("pip-user"));
  const [error, setError] = useState(false);

  // var date = new Date("01/12/2021 17:31:24 UTC");
  // console.log(date.toString());

  if (user) {
    history.push(ordersRoute);
    return null;

    // return (
    //   <Grid
    //     container
    //     justifyContent="center"
    //     alignItems="center"
    //     sx={{ position: "fixed", top: 0, bottom: 0 }}
    //   >
    //     <Grid
    //       item
    //       sx={{
    //         border: "3px solid",
    //         borderColor: "primary.main",
    //         borderRadius: "4px",
    //         padding: "16px",
    //         width: "45%",
    //         backgroundColor: "background.paper",
    //       }}
    //     >
    //       <Typography>
    //         Vous êtes déjà authentifié avec un autre compte..
    //       </Typography>
    //     </Grid>
    //   </Grid>
    // );
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let currentUser = {
      username: data.get("username") as string,
      password: data.get("password") as string,
    };

    try {
      const response: Response = await fetch(
        serverBaseUrl + "api/account/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(currentUser),
        }
      );

      if (!response.ok) {
        throw new Error("Le serveur ne répond pas!");
      }

      var content: User = await response.json();
      localStorage.setItem("pip-user", JSON.stringify(content));
      setError(false);
      history.push(ordersRoute);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <StyledGridItemImage item xs={false} sm={6} md={8} />
      <Grid item xs={12} sm={6} md={4} component={Paper} elevation={24} square>
        <StyledBoxSignIn>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Ouvrir une session
          </Typography>
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nom d'utilisateur"
              name="username"
              autoComplete="username"
              autoFocus
              error={error}
              onChange={() => setError(false)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={
                error && "le nom d'utilisateur ou le mot de passe est invalide."
              }
              error={error}
              onChange={() => setError(false)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'authentifier
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography
                  variant="body2"
                  color="primary.main"
                  sx={{
                    "&: hover": {
                      textDecoration: "underline",
                      cursor: "pointer",
                    },
                  }}
                  onClick={() => history.push(forgetPasswordRoute)}
                >
                  Mot de passe oublié?
                </Typography>
              </Grid>
              <Grid item>
                <Link href="" variant="body2">
                  {/* {"Don't have an account? Sign Up"} */}
                </Link>
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </StyledBoxSignIn>
      </Grid>
    </Grid>
  );
}
