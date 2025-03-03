import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage"
import BlogPage from "../pages/BlogPage";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import TrackPage from "../pages/TrackPage";
import HowItWorksPage from "../pages/HowItWorksPage";
import HelpPage from "../pages/HelpPage";

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
            {
                path:'/blog/:id',
                element:<BlogDetailsPage />
            },
            {
                path:'/track',
                element:<TrackPage />
            },
            {
                path:'/how-it-works',
                element:<HowItWorksPage />
            },
            {
                path:'/help',
                element:<HelpPage />
            },
        ]
    }
]);

export default router;