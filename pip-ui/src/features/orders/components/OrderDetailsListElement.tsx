import { Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { Parameter } from "src/features/orders/state/types";

type OrderDetailsProps = {
  param: Parameter;
};
export function OrderDetailsListElement({ param }: OrderDetailsProps) {
  const { t } = useTranslation();
  return (
    <>
      <Grid item md={12} sm={12}>
        <Grid
          container
          sx={{ marginTop: "24px" }}
          justifyContent={{ sm: "center" }}
        >
          <Grid item md={6}>
            <Typography
              align="right"
              sx={{ fontWeight: "bold", textTransform: "uppercase" }}
            >
              {t("category")} :
            </Typography>
            <Typography
              align="right"
              sx={{ fontWeight: "bold", textTransform: "uppercase" }}
            >
              {`${param.name} (${param.symbole})`} :
            </Typography>
          </Grid>
          <Grid item md={1}></Grid>
          <Grid item md={5}>
            <Typography align="left">{param.category}</Typography>
            <Typography align="left">
              {param.value} {param.unit ? `(${param.unit})` : null}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
}
