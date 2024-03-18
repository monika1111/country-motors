import { noop } from "lodash";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { AuthContextValue, UserInfo } from "../@types/auth";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext<AuthContextValue>({
  isLoginInprogress: true,
  setIsLoginInprogress: noop,
  login: noop,
  logout: noop,
  user: null,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserInfo | null>(null);

  const [isLoginInprogress, setIsLoginInprogress] = useState(true);

  const login = (user: UserInfo) => {
    setIsLoginInprogress(false);
    setUser(user);
    user.idToken && localStorage.setItem("authToken", user.idToken);
  };

  const logout = () => {
    // Sign out and reset user state
    auth.signOut().then(() => {
      setUser(null);
    });
  };

  useEffect(() => {
    setIsLoginInprogress(true);
    const unsubscribe = onAuthStateChanged(
      auth,
      async (authUser: User | null) => {
        if (authUser) {
          setUser({ email: authUser.email } as UserInfo);
        } else {
          setUser(null);
        }
        setIsLoginInprogress(false);
      }
    );

    // Cleanup function
    return () => unsubscribe();
  }, []);

  const value: AuthContextValue = {
    user,
    isLoginInprogress,
    setIsLoginInprogress,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
