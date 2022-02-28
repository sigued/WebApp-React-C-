import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFetchRequest } from "src/common/hooks/fetchHook";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { SubscriberListElement } from "src/features/subscribers/components/SubscriberListElement";
import { subscribersActions } from "src/features/subscribers/state/subscribersSlice";
import { Subscriber } from "src/features/subscribers/state/types";
import { subscribersRoute } from "src/routes/routePaths";

export function SubscriberList() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const subscribersId = useAppSelector(
    (state) => state.subscribers.subscribersId
  );
  const { response }: { response: Response | undefined } = useFetchRequest(
    "api/admin/subscribers",
    "GET"
  );

  useEffect(() => {
    const handleGetAllSubscibers = async () => {
      if (response?.ok) {
        var content: Subscriber[] = await response.clone().json();
        dispatch(
          subscribersActions.setAllSubscribers({ subscribers: content })
        );
      }
    };

    handleGetAllSubscibers();
    dispatch(subscribersActions.unSelectSubscriber());
    history.push(subscribersRoute + "/new-subscriber");
  }, [dispatch, history, response]);

  return (
    <Grid>
      <Paper elevation={8} square>
        {subscribersId.map((id) => (
          <SubscriberListElement key={id} subscriberId={id} />
        ))}
      </Paper>
    </Grid>
  );
}
