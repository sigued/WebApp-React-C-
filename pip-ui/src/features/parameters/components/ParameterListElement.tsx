import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {
  Divider,
  Grid,
  ListItem,
  ListItemButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import shortid from "shortid";
import { ElementDeleteButton } from "src/common/components/ElementDeleteButton";
import { Category } from "src/features/parameters/state/types";
import { parametersRoute } from "src/routes/routePaths";

type ParameterListElementProps = {
  category: Category;
};
export function ParameterListElement({ category }: ParameterListElementProps) {
  const [selected, setSelected] = useState(false);

  const handleClickCategory = () => {
    setSelected(!selected);
  };

  return (
    <>
      <ListItemButton selected={selected} onClick={handleClickCategory}>
        <Grid
          custom-attribute="test"
          container
          wrap="nowrap"
          sx={{ paddingY: "8px" }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>
            <Typography sx={{ fontWeight: "bold", color: "text.secondary" }}>
              {category.category}
            </Typography>
          </Grid>
          <Grid item>
            {selected ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          </Grid>
        </Grid>
      </ListItemButton>
      {selected
        ? category.parameterList.map((param) => (
            <div key={shortid()}>
              <ListItem
                key={param.id}
                sx={{ "&: hover": { backgroundColor: "action.hover" } }}
              >
                <Grid container wrap="nowrap">
                  <Grid item md={3} sm={3}>
                    <Typography sx={{ marginLeft: "0px" }} variant="caption">
                      Nom: {param.name}
                    </Typography>
                  </Grid>
                  <Grid item md={2} sm={2}>
                    <Typography variant="caption">
                      Symbole: {param.symbole}
                    </Typography>
                  </Grid>
                  <Grid item md={2} sm={2}>
                    <Typography variant="caption">
                      Unité: {param.unit}
                    </Typography>
                  </Grid>
                  <Grid item md={2} sm={2}></Grid>
                  <Grid item md={1} sm={1}></Grid>
                  <Grid item md={2} sm={2} sx={{ textAlign: "right" }}>
                    <ElementDeleteButton
                      path={parametersRoute}
                      requestPath={"api/parameter/delete/" + param.id}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </div>
          ))
        : null}
      <Divider />
    </>
  );
}
