import { useAuth } from "../hooks/auth-provider";
import MainRoutes from "./main-routes";
import AuthRoutes from "./auth-routes";
export default function Routes() {
    const { token } = useAuth();

    if (token) {
        return (
            <MainRoutes></MainRoutes>
        )
    }
    else {
        return (
            <AuthRoutes/>
        )
    }
}