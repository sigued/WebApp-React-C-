import { Link, Typography } from "@mui/material";

export function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      sx={{ mt: 5 }}
    >
      {"Copyright © "}
      <Link color="inherit" href="" underline="hover">
        Presses Internationales Polytechnique
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
