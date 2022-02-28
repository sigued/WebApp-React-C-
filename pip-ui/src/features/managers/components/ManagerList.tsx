import { Grid, Paper } from "@mui/material";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useFetchRequest } from "src/common/hooks/fetchHook";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { ManagerListElement } from "src/features/managers/components/ManagerListElement";
import { managersActions } from "src/features/managers/state/managersSlice";
import { Manager } from "src/features/managers/state/types";
import { managersRoute } from "src/routes/routePaths";

export default function ManagerList() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const managersId = useAppSelector((state) => state.managers.managersId);
  const { response }: { response: Response | undefined } = useFetchRequest(
    "api/admin/managers",
    "GET"
  );

  useEffect(() => {
    const handleGetAllManagers = async () => {
      if (response?.ok) {
        const content: Manager[] = await response.clone().json();
        dispatch(managersActions.setAllManagers({ managers: content }));
      }
    };

    handleGetAllManagers();
    dispatch(managersActions.unselectManager());
    history.push(managersRoute + "/new-manager");
  }, [dispatch, history, response]);

  return (
    <Grid>
      <Paper elevation={8} square>
        {managersId.map((id) => (
          <ManagerListElement key={id} managerId={id} />
        ))}
      </Paper>
    </Grid>
  );
}
