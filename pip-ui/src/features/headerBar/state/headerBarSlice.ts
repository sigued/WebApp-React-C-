import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface HeaderBarState {
  isOpen: boolean;
}

const initialState: HeaderBarState = {
  isOpen: false,
};

export const headerBarSlice = createSlice({
  name: "header",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    open: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      const { isOpen } = action.payload;
      state.isOpen = isOpen;
    },
    close: (state, action: PayloadAction<{ isOpen: boolean }>) => {
      const { isOpen } = action.payload;
      state.isOpen = isOpen;
    },
  },
});

// export const { open, close } = headerSlice.actions;
export const headerBarActions = {
  ...headerBarSlice.actions,
};

export default headerBarSlice.reducer;
