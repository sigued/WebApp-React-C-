export type EmailInvitation = {
  id: string;
  type: AppEmailType;
  receiverUserId: string;
  receiverEmail: string;
  status: AppEmailStatus;
  description: string;
  url: string;
  creationDate: Date;
  endDate: Date;
};

export enum AppEmailStatus {
  Expired = 0,
  Active = 1,
  Inactive = 2,
}

export enum AppEmailType {
  AccountCreation = 1,
  PasswordRecovery = 2,
  UserIdRecovery = 3,
  Confirmation = 4,
}
