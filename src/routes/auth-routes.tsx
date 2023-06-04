import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login";

const main_routes = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
])

export default function AuthRoutes() {
    return (
        <RouterProvider router={main_routes}></RouterProvider>  
    )
}