import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogContent, Fab, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch } from "src/common/hooks/hooks";
import { ManagerDetails } from "src/features/managers/components/ManagerDetails";
import { managersActions } from "src/features/managers/state/managersSlice";
import { managersRoute } from "src/routes/routePaths";

export function ManagerAddButton() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddNewManager = () => {
    if (window.innerWidth <= 900) {
      setOpenDialog(true);
      showDetails();
    } else {
      showDetails();
    }
  };

  const showDetails = () => {
    dispatch(managersActions.unselectManager());
    history.push(managersRoute + "/new-manager");
  };

  return (
    <>
      <Tooltip title="Ajouter un nouveau gestionnaire">
        <Fab
          size="medium"
          color="inherit"
          aria-label="register"
          onClick={handleAddNewManager}
        >
          <AddIcon color="primary" />
        </Fab>
      </Tooltip>
      <Dialog
        fullWidth={true}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        disableEscapeKeyDown={false}
        sx={{ paddingY: "50px" }}
      >
        <DialogContent
          sx={{
            padding: "0px",
            "& > div": {
              display: "flex",
            },
          }}
        >
          <ManagerDetails />
        </DialogContent>
      </Dialog>
    </>
  );
}
