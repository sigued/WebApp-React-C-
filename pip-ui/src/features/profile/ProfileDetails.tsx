import MailIcon from "@mui/icons-material/Mail";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WorkIcon from "@mui/icons-material/Work";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useHistory } from "react-router";
import { useAppSelector } from "src/common/hooks/hooks";
import { profileRoute } from "src/routes/routePaths";

export function ProfileDetails() {
  const user = useAppSelector((state) => state.login.currentUser);
  const history = useHistory();

  if (user === undefined) return null;

  return (
    <>
      <Grid>
        <Paper elevation={8} square>
          <Typography gutterBottom variant="h6">
            <Box style={{ display: "inline-block", fontWeight: "bold" }}>
              <PersonIcon
                style={{
                  display: "inline-block",
                  verticalAlign: "-4px",
                  fontSize: "25px",
                  margin: "0 10px",
                }}
              />
              Nom de profil:
            </Box>
            <Box style={{ display: "inline-block", margin: "0 10px" }}>
              {user.username}
            </Box>
          </Typography>
          <Typography gutterBottom variant="h6">
            <Box style={{ display: "inline-block", fontWeight: "bold" }}>
              <MailIcon
                style={{
                  display: "inline-block",
                  verticalAlign: "-4px",
                  fontSize: "25px",
                  margin: "0 10px",
                }}
              />
              Courriel:
            </Box>
            <Box style={{ display: "inline-block", margin: "0 10px" }}>
              {user.email}
            </Box>
          </Typography>
          <Typography gutterBottom variant="h6">
            <Box style={{ display: "inline-block", fontWeight: "bold" }}>
              <WorkIcon
                style={{
                  display: "inline-block",
                  verticalAlign: "-4px",
                  fontSize: "25px",
                  margin: "0 10px",
                }}
              />
              Profession:
            </Box>
            <Box style={{ display: "inline-block", margin: "0 10px" }}>
              {user.profession}
            </Box>
          </Typography>
          <Typography gutterBottom variant="h6">
            <Box style={{ display: "inline-block", fontWeight: "bold" }}>
              <PhoneIphoneIcon
                style={{
                  display: "inline-block",
                  verticalAlign: "-4px",
                  fontSize: "25px",
                  margin: "0 10px",
                }}
              />
              Numéro de téléphone:
            </Box>
            <Box style={{ display: "inline-block", margin: "0 10px" }}>
              {user.phoneNumber}
            </Box>
          </Typography>
        </Paper>
      </Grid>
      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={() => history.push(profileRoute + "/" + user?.id)}
      >
        Mettre à jour le profil
      </Button>
    </>
  );
}
