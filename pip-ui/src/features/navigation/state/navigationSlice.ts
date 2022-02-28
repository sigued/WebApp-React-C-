import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigationState } from "src/features/navigation/state/types";

const initialState: NavigationState = {
  currentPath: "",
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    selectPath: (state, action: PayloadAction<{ path: string }>) => {
      const { path } = action.payload;
      state.currentPath = path;
    },
    resetNavigationState: () => initialState,
  },
});

export const navigationActions = {
  ...navigationSlice.actions,
};

export default navigationSlice.reducer;
