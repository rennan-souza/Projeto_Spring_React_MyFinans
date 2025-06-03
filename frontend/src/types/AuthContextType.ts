import type { AuthContextDataType } from "./AuthContextDataType";

export type AuthContextType = {
    authContextData: AuthContextDataType;
    setAuthContextData: (authContextData: AuthContextDataType) => void;
};