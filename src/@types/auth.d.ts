import { Dispatch, SetStateAction } from "react";

interface AuthContextValue {
  isLoginInprogress: boolean;
  setIsLoginInprogress: Dispatch<SetStateAction<boolean>>;
  user: UserInfo | null;
  login: (user: UserInfo) => void;
  logout: () => void;
}

interface UserInfo {
  displayName: string | null;
  email: string | null;
  idToken: string | null;
}
