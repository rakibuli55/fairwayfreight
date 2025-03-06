import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage"
import BlogPage from "../pages/BlogPage";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import TrackPage from "../pages/TrackPage";
import HowItWorksPage from "../pages/HowItWorksPage";
import HelpPage from "../pages/HelpPage";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../pages/AuthPages/LoginPage";
import ForgotPasswordPage from "../pages/AuthPages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/AuthPages/ResetPasswordPage";
import SignupPage from "../pages/AuthPages/SignupPage";
import VerifyOtpPage from "../pages/AuthPages/VerfifyOtpPage";
import ShipPage from "../pages/ShipPage";

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
                path:'ship',
                element:<ShipPage />
            },
            {
                path:'blog',
                element:<BlogPage />
            },
            {
                path:'blog/:id',
                element:<BlogDetailsPage />
            },
            {
                path:'track',
                element:<TrackPage />
            },
            {
                path:'how-it-works',
                element:<HowItWorksPage />
            },
            {
                path:'help',
                element:<HelpPage />
            },
        ]
    },
    {
        path:'/auth',
        element:<AuthLayout />,
        children:[
            {
                path:'login',
                element:<LoginPage />
            },
            {
                path:'signup',
                element:<SignupPage />
            },
            {
                path:'forgot-password',
                element:<ForgotPasswordPage />
            },
            {
                path:'reset-password',
                element:<ResetPasswordPage />
            },
            {
                path:'verify-otp',
                element:<VerifyOtpPage />
            },
            
        ]
    }
]);

export default router;