import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

const main_routes = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
        path: "register",
        element: <Register/>
    }
])

export default function AuthRoutes() {
    return (
        <RouterProvider router={main_routes}></RouterProvider>  
    )
}