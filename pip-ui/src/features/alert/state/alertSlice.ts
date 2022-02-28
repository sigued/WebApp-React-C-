import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import shortid from "shortid";
import { AlertState, AlertType } from "src/features/alert/state/types";

const MAX_ALERTS = 3;
const initialAlertState: AlertState = {
  alerts: [],
};

export const alertSlice = createSlice({
  name: "alert",
  initialState: initialAlertState,
  reducers: {
    createAlert: (
      state,
      action: PayloadAction<{ message: string; type: AlertType }>
    ) => {
      if (state.alerts.length > MAX_ALERTS) state.alerts.shift();

      const { message, type } = action.payload;
      state.alerts.push({
        id: shortid(),
        message,
        type,
      });
    },
    resetAlertState: () => initialAlertState,
  },
});

export const alertActions = { ...alertSlice.actions };

export default alertSlice.reducer;
