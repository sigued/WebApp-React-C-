import { AppUserStatus } from "src/features/managers/state/types";

export type SubscribersState = {
  subscribersId: string[];
  subscribers: Record<string, Subscriber>;
  selectedSubscriber?: Subscriber;
  isToUpdate: boolean;
};

export type Subscriber = {
  id: string;
  userId: string;
  username: string;
  email: string;
  subscriptionStatus: SubscriptionStatus;
  userStatusAccount: AppUserStatus;
  subscriptionDuration?: SubscriptionDuration;
  startDate: Date;
  endDate: Date;
  mainRole: string;
  createdBy: string;
  creationDate: string;
};

export enum SubscriptionStatus {
  PendingStart = 0,
  Active = 1,
  Expired = 2,
  Blocked = 3,
}

export enum SubscriptionDuration {
  OneMonth = 1,
  towMonth = 2,
  SixMonth = 6,
  OneYear = 12,
}
