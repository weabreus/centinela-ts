import React, { useState, useEffect, useCallback } from "react";
import AuthContextType from "../models/AuthContextType";

let logoutTimer: ReturnType<typeof setTimeout>;

const AuthContext = React.createContext<AuthContextType>({
  token: "",
  isLoggedIn: false,
  id: "",
  role: "",
  complex: "",
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
  role: string | null;
  complex: string | null;
} | null = () => {
  const storedToken: string | null = localStorage.getItem("token");
  const storedExpirationDate: string | null =
    localStorage.getItem("expirationTime");
  const storedId: string | null = localStorage.getItem("id");
  const storedRole: string | null = localStorage.getItem("role");
  const storedComplex: string | null = localStorage.getItem("complex");

  const remainingTime: number = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("complex");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
    id: storedId,
    role: storedRole,
    complex: storedComplex,
  };
};

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const tokenData: {
    token: string | null;
    duration: any;
    id: string | null;
    role: string | null;
    complex: string | null;
  } | null = retrieveStoredToken();

  let initialToken: string | null;
  let initialId: string | null;
  let initialRole: string | null;
  let initialComplex: string | null;
  if (tokenData) {
    initialToken = tokenData.token;
    initialId = tokenData.id;
    initialRole = tokenData.role;
    initialComplex = tokenData.complex;
  }

  const [token, setToken] = useState<string | null>(initialToken!);
  const [id, setId] = useState<string | null>(initialId!);
  const [role, setRole] = useState<string | null>(initialRole!);
  const [complex, setComplex] = useState<string | null>(initialComplex!);

  const userIsLoggedIn: boolean = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setId(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("complex");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const loginHandler: (
    token: string,
    expirationTime: string,
    id: string,
    role: string,
    complex: string
  ) => void = (token, expirationTime, id, role, complex) => {
    setToken(token);
    setId(id);
    setRole(role);
    setComplex(complex);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    localStorage.setItem("id", id);
    localStorage.setItem("role", role);
    localStorage.setItem("complex", complex);

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
    role: string,
    complex: string,
    login: (token: string, expirationTime: string, id: string, role: string, complex: string) => void;
    logout: () => void;
  } = {
    token: token!,
    isLoggedIn: userIsLoggedIn,
    id: id!,
    role: role!,
    complex: complex!,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
