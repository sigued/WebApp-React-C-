import AddIcon from "@mui/icons-material/Add";
import { Dialog, DialogContent, Fab, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAppDispatch } from "src/common/hooks/hooks";
import { SubscriberDetails } from "src/features/subscribers/components/SubscriberDetails";
import { subscribersActions } from "src/features/subscribers/state/subscribersSlice";
import { subscribersRoute } from "src/routes/routePaths";

export function SubscriberAddButton() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [openDialog, setOpenDialog] = useState(false);

  const handleAddNewSubcriber = () => {
    if (window.innerWidth <= 900) {
      setOpenDialog(true);
      showDetails();
    } else {
      showDetails();
    }
  };

  const showDetails = () => {
    dispatch(subscribersActions.unSelectSubscriber());
    history.push(subscribersRoute + "/new-subscriber");
  };

  return (
    <>
      <Tooltip title="">
        <Fab
          size="medium"
          color="inherit"
          aria-label="register"
          onClick={handleAddNewSubcriber}
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
      ></Dialog>
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
          <SubscriberDetails />
        </DialogContent>
      </Dialog>
    </>
  );
}
