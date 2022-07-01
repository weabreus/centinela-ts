interface AuthContextType {
    token: string;
    isLoggedIn: boolean;
    id: string;
    role: string;
    complex: string;
    login:
      | (() => void)
      | ((token: string, expirationTime: string, id: string, role: string, complex: string) => void);
    logout: () => void;
  }
  
  export default AuthContextType;