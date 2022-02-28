import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  CorrelationDetailsProps,
  CorrelationState,
} from "src/features/correlations/state/types";

const initialState: CorrelationState = {
  selectedCorrelation: undefined,
};

export const correlationsSlice = createSlice({
  name: "correlations",
  initialState,
  reducers: {
    selectCorrelation: (
      state,
      action: PayloadAction<{ correlation: CorrelationDetailsProps }>
    ) => {
      const { correlation } = action.payload;
      state.selectedCorrelation = correlation;
    },

    unselectCorrelation: (state) => (state.selectedCorrelation = undefined),

    resetCorrelationsState: () => initialState,
  },
});

export const correlationsActions = {
  ...correlationsSlice.actions,
};

export default correlationsSlice.reducer;
