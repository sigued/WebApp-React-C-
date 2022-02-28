import { Box } from "@mui/system";
import { RC } from "src/common/types/types";

export function DefaultPage(): RC {
  // const history = useHistory();
  // history.push(ordersRoute);

  return (
    <Box
      sx={{
        gridRow: "right",
        gridColumn: "left / right",
      }}
    >
      Default Page
    </Box>
  );
}
