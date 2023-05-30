import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";

const auth_routes = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
])

export default function MainRoutes() {
    return (
        <RouterProvider router={auth_routes}></RouterProvider>  
    )
}