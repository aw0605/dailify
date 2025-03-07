export interface FormValuesProps {
  email: string;
  password: string;
  rePassword?: string;
}

export interface UserInfo {
  id: string;
  email: string;
  nickname?: string;
  image?: string;
}
