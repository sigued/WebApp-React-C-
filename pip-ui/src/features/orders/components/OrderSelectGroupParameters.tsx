import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/common/hooks/hooks";
import { alertActions } from "src/features/alert/state/alertSlice";
import { ordersActions } from "src/features/orders/state/ordersSlice";
import {
  Parameter,
  ReceivedOrderFormContent,
} from "src/features/orders/state/types";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type OrderSelectGroupParametersProps = {
  categories: ReceivedOrderFormContent[];
};

export function OrderSelectGroupParameters({
  categories,
}: OrderSelectGroupParametersProps) {
  const dispatch = useAppDispatch();
  const sliceParameters = useAppSelector((state) => state.orders.parameters);
  const [paramsId, setParamsId] = useState<string[]>([]);
  const [myArray, setMyArray] = useState<Array<string | Parameter>>([]);

  const handleSelectParameter = (event: SelectChangeEvent<typeof paramsId>) => {
    if (event.target.value === undefined) return;

    const pIds: string[] = event.target.value as string[];

    if (pIds.length >= 6) {
      dispatch(
        alertActions.createAlert({
          message: "Vous ne pouvez pas choisir plus que 5 paramètres",
          type: "warning",
        })
      );
      return;
    }

    setParamsId(pIds);
    dispatch(ordersActions.addOrRemoveParametersId({ parametersId: pIds }));
  };

  useEffect(() => {
    const array: Array<string | Parameter> = [];
    categories.forEach((c) => {
      array.push(c.category);
      c.parameterList.forEach((p) => {
        array.push(p);
      });
    });

    setMyArray(array);
  }, [categories]);

  return (
    <FormControl variant="standard" fullWidth={true} margin="dense">
      <InputLabel htmlFor="grouped-select">Liste des paramètres</InputLabel>
      <Select
        multiple
        id="grouped-select"
        label="Grouping"
        onChange={handleSelectParameter}
        value={paramsId}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) =>
              value === undefined ? null : (
                <Chip key={value} label={sliceParameters[value].name} />
              )
            )}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {myArray.map((a) =>
          typeof a === "string" ? (
            <ListSubheader key={a} color="primary">
              {a}
            </ListSubheader>
          ) : (
            <MenuItem key={a.id} value={a.id}>
              {a.name} ({a.symbole})
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
}
