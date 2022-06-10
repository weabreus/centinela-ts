interface AuthContextType {
    token: string;
    isLoggedIn: boolean;
    id: string;
    login:
      | (() => void)
      | ((token: string, expirationTime: string, id: string) => void);
    logout: () => void;
  }
  
  export default AuthContextType;