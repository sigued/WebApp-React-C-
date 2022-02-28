import {
  Dialog,
  DialogContent,
  Divider,
  Grid,
  ListItemButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router";
import { ElementDeleteButton } from "src/common/components/ElementDeleteButton";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { SubscriberDetails } from "src/features/subscribers/components/SubscriberDetails";
import { subscribersActions } from "src/features/subscribers/state/subscribersSlice";
import { subscribersRoute } from "src/routes/routePaths";

type SubscriberListElementProps = {
  subscriberId: string;
};

export function SubscriberListElement({
  subscriberId,
}: SubscriberListElementProps) {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const subscriber = useAppSelector(
    (state) => state.subscribers.subscribers[subscriberId]
  );
  const isSelected = useAppSelector(
    (state) => state.subscribers.selectedSubscriber?.id === subscriberId
  );
  const [openDialog, setOpenDialog] = useState(false);

  const handleClickSubcriber = () => {
    if (window.innerWidth <= 900) {
      setOpenDialog(true);
      showDetails();
    } else {
      showDetails();
    }
  };

  const showDetails = () => {
    dispatch(subscribersActions.toUpdate({ toUpdate: false }));
    dispatch(subscribersActions.selectSubscriber({ id: subscriberId }));
    history.push(subscribersRoute + "/" + subscriberId);
  };

  return (
    <>
      <ListItemButton selected={isSelected} onClick={handleClickSubcriber}>
        <Grid
          custom-attribute="test"
          container
          wrap="nowrap"
          sx={{ paddingY: "16px" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item md={5} sm={5}>
            <Typography>{subscriber.username}</Typography>
          </Grid>
          <Grid item md={5} sm={5}>
            <Typography>{subscriber.email}</Typography>
          </Grid>
          <Grid item md={2} sm={2}></Grid>
          <Grid item>
            <ElementDeleteButton
              path={subscribersRoute}
              requestPath={"api/admin/delete-subscriber/" + subscriber.userId}
              variant={undefined}
            />
          </Grid>
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
          <SubscriberDetails />
        </DialogContent>
      </Dialog>
    </>
  );
}
