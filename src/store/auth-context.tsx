import React, { useState, useEffect, useCallback } from "react";
import AuthContextType from "../models/AuthContextType";

let logoutTimer: ReturnType<typeof setTimeout>;

const AuthContext = React.createContext<AuthContextType>({
  token: "",
  isLoggedIn: false,
  id: "",
  login: () => {},
  logout: () => {},
});

const calculateRemainingTime: (expirationTime: string | null) => number = (
  expirationTime
) => {
  const currentTime: number = new Date().getTime();
  let adjExpirationTime: number;

  if (expirationTime) adjExpirationTime = new Date(expirationTime).getTime();
  else adjExpirationTime = new Date().getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken: () => {
  token: string | null;
  duration: number | null;
  id: string | null;
} | null = () => {
  const storedToken: string | null = localStorage.getItem("token");
  const storedExpirationDate: string | null =
    localStorage.getItem("expirationTime");
  const storedId: string | null = localStorage.getItem("id");

  const remainingTime: number = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("id");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    id: storedId,
  };
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const tokenData: {
    token: string | null;
    duration: any;
    id: string | null;
  } | null = retrieveStoredToken();

  let initialToken: string | null;
  let initialId: string | null;
  if (tokenData) {
    initialToken = tokenData.token;
    initialId = tokenData.id;
  }

  const [token, setToken] = useState<string | null>(initialToken!);
  const [id, setId] = useState<string | null>(initialId!);

  const userIsLoggedIn: boolean = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("id");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler: (
    token: string,
    expirationTime: string,
    id: string
  ) => void = (token, expirationTime, id) => {
    setToken(token);
    setId(id);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("id", id);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue: {
    token: string;
    isLoggedIn: boolean;
    id: string;
    login: (token: string, expirationTime: string, id: string) => void;
    logout: () => void;
  } = {
    token: token!,
    isLoggedIn: userIsLoggedIn,
    id: id!,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
