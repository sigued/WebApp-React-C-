import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import alertReducer from "src/features/alert/state/alertSlice";
import correlationsReducer from "src/features/correlations/state/correlationsSlice";
import headerReducer from "src/features/headerBar/state/headerBarSlice";
import loginReducer from "src/features/login/state/loginSlice";
import managersReducer from "src/features/managers/state/managersSlice";
import navigationReducer from "src/features/navigation/state/navigationSlice";
import ordersReducer from "src/features/orders/state/ordersSlice";
import subscribersReducer from "src/features/subscribers/state/subscribersSlice";

export const store = configureStore({
  reducer: {
    // State
    header: headerReducer,
    orders: ordersReducer,
    login: loginReducer,
    managers: managersReducer,
    subscribers: subscribersReducer,
    notifications: alertReducer,
    navigation: navigationReducer,
    correlations: correlationsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
