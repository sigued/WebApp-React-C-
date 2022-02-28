import { Alert, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RC } from "src/common/types/types";
import { AlertType } from "src/features/alert/state/types";

type AlertProps = {
  message: string;
  type: AlertType;
};

export function AlertBox({ message, type }: AlertProps): RC {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, 4000);
  }, []);

  return (
    <>
      {show ? (
        <Alert
          sx={{
            position: "relative",
            marginY: "8px",
            // width: "256px",
            right: " -256px",
            boxShadow: "1.6px 1.6px 1.6px 1.6px rgb(0 0 0 / 50%)",
            animation: "enterLeave 4s ease-in-out",
            "@keyframes enterLeave": {
              "0%": {
                right: "-256px",
              },
              "7.5%": {
                right: "16px",
              },
              "92.5%": {
                right: "16px",
              },
              "100%": {
                right: "-256px",
              },
            },
          }}
          severity={type}
        >
          <Typography noWrap={false}>{message}</Typography>
        </Alert>
      ) : null}
    </>
  );
}
