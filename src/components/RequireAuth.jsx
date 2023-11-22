import { useContext } from "react";
import { AuthContext } from "../App";
import { Navigate } from "react-router-dom";

export default function RequireAuth({children}) {
    const token = useContext(AuthContext).token

    if (!token) {
        return <Navigate to="/" replace/>;
    }
    return children;
}