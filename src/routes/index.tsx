import { useAuth } from "../hooks/auth-provider";
import MainRoutes from "./main-routes";
import AuthRoutes from "./auth-routes";
export default function Routes() {
    const { token } = useAuth();

    console.log(token)

    if (token) {
        return (
            <MainRoutes/>
        )
    }
    else {
        return (
            <AuthRoutes/>
        )
    }
}