import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stringFlatten } from "src/common/helpers/methodsHelpers";
import { Order, OrdersState, Parameter } from "src/features/orders/state/types";

const initialState: OrdersState = {
  ordersId: [],
  orders: {},
  selectedOrder: undefined,
  parametersId: [],
  parameters: {},
  selectedParametersId: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<{ order: Order }>) => {
      const { order } = action.payload;
      if (state.orders[order.id]) return;

      state.ordersId.push(order.id);
      state.orders[order.id] = order;
    },

    setAllOrders: (state, action: PayloadAction<{ orders: Order[] }>) => {
      const { orders } = action.payload;
      const { array, map } = stringFlatten<Order>(orders, "id");

      state.ordersId = array;
      state.orders = map;
    },

    selectOrder: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.selectedOrder = state.orders[id];
    },

    unselectOrder: (state) => {
      state.selectedOrder = undefined;
    },

    setAllParameters: (
      state,
      action: PayloadAction<{ parameters: Parameter[] }>
    ) => {
      const { parameters } = action.payload;
      const { array, map } = stringFlatten<Parameter>(parameters, "id");

      state.parametersId = array;
      state.parameters = map;
    },

    addOrRemoveParametersId: (
      state,
      action: PayloadAction<{ parametersId: string[] }>
    ) => {
      const { parametersId } = action.payload;
      state.selectedParametersId = parametersId;
    },

    updateParameter: (
      state,
      action: PayloadAction<{ id: string; value: number }>
    ) => {
      const { id, value } = action.payload;
      state.parameters[id].value = value;
    },

    clearSelectedParameters: (state) => {
      state.selectedParametersId = [];
    },

    resetOrderState: () => initialState,
  },
});

export const ordersActions = {
  ...ordersSlice.actions,
};

export default ordersSlice.reducer;
