import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { CorrelationListElement } from "src/features/correlations/components/CorrelationListElement";
import { correlationsActions } from "src/features/correlations/state/correlationsSlice";
import { Correlation } from "src/features/correlations/state/types";
import { correlationsRoute, serverBaseUrl } from "src/routes/routePaths";

export function CorrelationList() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [correlations, setCorrelations] = useState<Correlation[]>([]);
  const user = useAppSelector((state) => state.login.currentUser);

  useEffect(() => {
    const handleGetAllCorrelations = async () => {
      try {
        const response: Response = await fetch(
          serverBaseUrl + "api/correlation/get-correlations",
          {
            method: "GET",
            headers: { Authorization: "Bearer " + user?.token },
          }
        );

        if (!response.ok) {
          throw new Error("Server responds with error");
        }

        const content: Correlation[] = await response?.json();
        setCorrelations(content);
      } catch (err) {
        console.log(err);
      }
    };

    handleGetAllCorrelations();
    dispatch(correlationsActions.unselectCorrelation());
    history.push(correlationsRoute + "/new-correlation");
  }, [dispatch, history, user?.token]);

  return (
    <Grid>
      <Paper elevation={8} square>
        {correlations.map((elem) => (
          <CorrelationListElement key={elem.id} correlation={elem} />
        ))}
      </Paper>
    </Grid>
  );
}
