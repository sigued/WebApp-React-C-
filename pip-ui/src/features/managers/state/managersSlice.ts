import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stringFlatten } from "src/common/helpers/methodsHelpers";
import { Manager, ManagersState } from "src/features/managers/state/types";

const initialState: ManagersState = {
  managersId: [],
  managers: {},
  selectedManager: undefined,
};

export const managersSlice = createSlice({
  name: "managers",
  initialState,
  reducers: {
    setAllManagers: (state, action: PayloadAction<{ managers: Manager[] }>) => {
      const { managers } = action.payload;
      const { array, map } = stringFlatten<Manager>(managers, "id");

      state.managersId = array;
      state.managers = map;
    },

    selectManager: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.selectedManager = state.managers[id];
    },

    unselectManager: (state) => (state.selectedManager = undefined),

    resetManagerState: () => initialState,
  },
});

export const managersActions = {
  ...managersSlice.actions,
};

export default managersSlice.reducer;
