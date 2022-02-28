import { Box } from "@mui/system";
import React from "react";
import { useAppSelector } from "src/common/hooks/hooks";
import { RC } from "src/common/types/types";
import { AlertBox } from "src/features/alert/components/Alert";

export function AlertsContainer(): RC {
  const { alerts } = useAppSelector((state) => state.notifications);

  return (
    <Box sx={{ zIndex: 5000, position: "fixed", right: "0px" }}>
      {alerts.map((a) => (
        <AlertBox key={a.id} message={a.message} type={a.type} />
      ))}
    </Box>
  );
}
