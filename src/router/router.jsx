import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage"
import BlogPage from "../pages/BlogPage";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children:[
            {
                path:'/',
                element:<HomePage />
            },
            {
                path:'/blog',
                element:<BlogPage />
            },
        ]
    }
]);

export default router;