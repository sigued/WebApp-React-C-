export type OrdersState = {
  ordersId: string[];
  orders: Record<string, Order>;
  selectedOrder?: Order;
  parametersId: string[];
  parameters: Record<string, Parameter>;
  selectedParametersId?: string[];
};

export type Order = {
  id: string;
  userId: string;
  creationDate: Date;
  parameterList: Parameter[];
  status: OrderStatus;
  description: string;
};

export type Parameter = {
  id: string;
  category?: string;
  symbole: string;
  name: string;
  unit: string;
  value: number;
};

export type ReceivedOrderFormContent = {
  category: string;
  parameterList: Parameter[];
};

export enum OrderStatus {
  Pending,
  Processing,
  Error,
  Completed,
}
