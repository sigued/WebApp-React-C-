export type ManagersState = {
  managersId: string[];
  managers: Record<string, Manager>;
  selectedManager?: Manager;
};

export type Manager = {
  id: string;
  username: string;
  email: string;
  mainRole: string;
  profession: string;
  status: AppUserStatus;
  phoneNumber: string;
};

export enum AppUserStatus {
  Inactive,
  Active,
}
