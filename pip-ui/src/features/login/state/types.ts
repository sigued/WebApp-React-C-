export type UserState = {
  currentUser?: User;
  authStateChecked: boolean;
};

export type User = {
  id?: string;
  username: string;
  password?: string;
  token?: string;
  role?: Role;
  email?: string;
  profession?: string;
  phoneNumber?: string;
};

export type Role = "admin" | "sadmin" | "member";
