interface AuthContextType {
    token: string;
    isLoggedIn: boolean;
    id: string;
    role: string;
    login:
      | (() => void)
      | ((token: string, expirationTime: string, id: string, role: string) => void);
    logout: () => void;
  }
  
  export default AuthContextType;