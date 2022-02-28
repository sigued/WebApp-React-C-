import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "src/features/login/state/types";

const initialState: UserState = {
  currentUser: undefined,
  authStateChecked: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: string | null }>) => {
      const { user } = action.payload;
      if (user) {
        const jsonUser: User = JSON.parse(user);
        state.currentUser = jsonUser;
        state.authStateChecked = true;
      }
    },
    resetUserState: () => initialState,
  },
});

export const loginActions = {
  ...loginSlice.actions,
};

export default loginSlice.reducer;
