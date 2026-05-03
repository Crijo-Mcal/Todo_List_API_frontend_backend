import {createContext, useContext, useState} from "react";
import type {User} from "../types/logIn.singUp.type";

type UserInfo = {
  AccessToken: string;
  dataUser: User;
};

type AuthType = {
  User: UserInfo | null;
  setUser: (token: UserInfo | null) => void;
};

const userContext = createContext<AuthType | null>(null);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [User, setUser] = useState<UserInfo | null>(null);

  return (
    <userContext.Provider value={{User, setUser}}>
      {children}
    </userContext.Provider>
  );
}

export function useUserContext() {
  return useContext(userContext)!;
}
