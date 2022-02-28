export type AlertMessage = {
  id: string;
  message: string;
  type: AlertType;
};

export type AlertState = {
  alerts: AlertMessage[];
};

export const alertTypes = ["error", "info", "success", "warning"] as const;
export type AlertType = typeof alertTypes[number];
