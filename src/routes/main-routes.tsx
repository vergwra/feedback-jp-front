import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Questionario from "../pages/questionario";
import QuestionCreator from "../pages/questionsCreator";

const auth_routes = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/questionario",
        element: <Questionario/>
    },{
        path: "/criar-perguntas",
        element: <QuestionCreator/>
    },
])

export default function MainRoutes() {
    return (
        <RouterProvider router={auth_routes}></RouterProvider>  
    )
}