import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFetchRequest } from "src/common/hooks/fetchHook";
import { useAppDispatch } from "src/common/hooks/hooks";
import { ParameterListElement } from "src/features/parameters/components/ParameterListElement";
import { Category } from "src/features/parameters/state/types";

export function ParameterList() {
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<Category[]>([]);
  const { response }: { response: Response | undefined } = useFetchRequest(
    "api/parameter/get-parameters",
    "GET"
  );

  useEffect(() => {
    const handleGetAllParameters = async () => {
      if (response?.ok) {
        const content: Category[] = await response?.clone().json();
        setCategories(content);
      }
    };

    handleGetAllParameters();
  }, [dispatch, response]);

  return (
    <Grid>
      <Paper elevation={8} square>
        {categories.map((elem) => (
          <ParameterListElement key={elem.category} category={elem} />
        ))}
      </Paper>
    </Grid>
  );
}
