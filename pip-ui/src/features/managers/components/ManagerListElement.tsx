import {
  Dialog,
  DialogContent,
  Divider,
  Grid,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { ElementDeleteButton } from "src/common/components/ElementDeleteButton";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { ManagerDetails } from "src/features/managers/components/ManagerDetails";
import { managersActions } from "src/features/managers/state/managersSlice";
import { managersRoute } from "src/routes/routePaths";

type ManagerListElementProps = {
  managerId: string;
};

export function ManagerListElement({ managerId }: ManagerListElementProps) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const user = useAppSelector((state) => state.login.currentUser);
  const manager = useAppSelector((state) => state.managers.managers[managerId]);
  const isSelected = useAppSelector(
    (state) => state.managers.selectedManager?.id === managerId
  );
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickManager = () => {
    if (window.innerWidth <= 900) {
      setOpenDialog(true);
      showDetails();
    } else {
      showDetails();
    }
  };

  const showDetails = () => {
    dispatch(managersActions.selectManager({ id: managerId }));
    history.push(managersRoute + "/" + managerId);
  };

  return (
    <>
      <ListItemButton selected={isSelected} onClick={handleClickManager}>
        <Grid
          custom-attribute="test"
          container
          wrap="nowrap"
          sx={{ paddingY: "16px" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item md={5} sm={5}>
            <Typography>{manager.username}</Typography>
          </Grid>
          <Grid item md={5} sm={5}>
            <Typography>{manager.email}</Typography>
          </Grid>
          <Grid item md={2} sm={2}></Grid>
          {managerId !== user?.id && (
            <Grid item>
              <ElementDeleteButton
                path={managersRoute}
                requestPath={"api/admin/delete-admin/" + managerId}
                variant={undefined}
              />
            </Grid>
          )}
        </Grid>
      </ListItemButton>
      <Divider />

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
