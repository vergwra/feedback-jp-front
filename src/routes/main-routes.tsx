import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Questionario from "../pages/questionario";
import QuestionCreator from "../pages/questionsCreator";
import Results from "../pages/results";

const auth_routes = createBrowserRouter([
    {
        path: "/",
        element: <Home/>
    },
    {
        path: "/avaliacao",
        element: <Questionario/>
    },{
        path: "/criar-perguntas",
        element: <QuestionCreator/>
    },
    {
        path: "/resultados",
        element: <Results/>
    },
])

export default function MainRoutes() {
    return (
        <RouterProvider router={auth_routes}></RouterProvider>  
    )
}