import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogContent, Fab, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch } from "src/common/hooks/hooks";
import { CorrelationDetails } from "src/features/correlations/components/CorrelationDetails";
import { correlationsActions } from "src/features/correlations/state/correlationsSlice";
import { correlationsRoute } from "src/routes/routePaths";

export function CorrelationAddButton() {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddNewCorrelation = () => {
    if (window.innerWidth <= 900) {
      setOpenDialog(true);
      showDetails();
    } else {
      showDetails();
    }
  };

  const showDetails = () => {
    dispatch(correlationsActions.unselectCorrelation());
    history.push(correlationsRoute + "/new-correlation");
  };

  return (
    <>
      <Tooltip title="Ajouter une nouvelle corrélation">
        <Fab
          size="medium"
          color="inherit"
          aria-label="add"
          onClick={handleAddNewCorrelation}
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
          <CorrelationDetails />
        </DialogContent>
      </Dialog>
    </>
  );
}
