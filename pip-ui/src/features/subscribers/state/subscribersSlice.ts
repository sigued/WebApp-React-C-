import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stringFlatten } from "src/common/helpers/methodsHelpers";
import {
  Subscriber,
  SubscribersState,
} from "src/features/subscribers/state/types";

const initialState: SubscribersState = {
  subscribersId: [],
  subscribers: {},
  selectedSubscriber: undefined,
  isToUpdate: false,
};

export const subscribersSlice = createSlice({
  name: "subscribers",
  initialState,
  reducers: {
    addSubscriber: (state, action: PayloadAction<{}>) => {},

    setAllSubscribers: (
      state,
      action: PayloadAction<{ subscribers: Subscriber[] }>
    ) => {
      const { subscribers } = action.payload;
      const { array, map } = stringFlatten<Subscriber>(subscribers, "id");

      state.subscribersId = array;
      state.subscribers = map;
    },

    selectSubscriber: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.selectedSubscriber = state.subscribers[id];
    },

    unSelectSubscriber: (state) => {
      state.selectedSubscriber = undefined;
    },

    deleteSubscriber: (state, action: PayloadAction<{ id: string }>) => {},

    toUpdate: (state, action: PayloadAction<{ toUpdate: boolean }>) => {
      const { toUpdate } = action.payload;
      state.isToUpdate = toUpdate;
    },

    resetSubscriberState: () => initialState,
  },
});

export const subscribersActions = {
  ...subscribersSlice.actions,
};

export default subscribersSlice.reducer;
