import { Navigate } from "react-router-dom";
import { hasAnyPerfis, isAuthenticated } from "../../services/AuthService";
import type { JSX } from "react";



function PrivateRoute({ children, perfis }: { children: JSX.Element, perfis?: string[] }) {

    if (isAuthenticated() === false) {
        return <Navigate to="/login" />
    }

    if (perfis) {
        if (!hasAnyPerfis(perfis)) {
            return <Navigate to="/home" />
        }
    }

    return children;
}

export default PrivateRoute;