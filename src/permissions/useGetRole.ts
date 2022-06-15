import { Context, useContext } from "react";
import AuthContextType from "../models/AuthContextType";

const useGetRole: (AuthContext: Context<AuthContextType>) => string = (AuthContext) => {
    const authCtx: AuthContextType = useContext(AuthContext);

    return (authCtx.role);
};

export default useGetRole;