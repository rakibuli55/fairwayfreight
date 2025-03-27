import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Layout from "../layout/Layout";
import ForgotPasswordPage from "../pages/AuthPages/ForgotPasswordPage";
import LoginPage from "../pages/AuthPages/LoginPage";
import ResetPasswordPage from "../pages/AuthPages/ResetPasswordPage";
import SignupPage from "../pages/AuthPages/SignupPage";
import VerifyOtpPage from "../pages/AuthPages/VerfifyOtpPage";
import BlogDetailsPage from "../pages/BlogDetailsPage";
import BlogPage from "../pages/BlogPage";
import AddNewAddressPage from "../pages/DashboardPages/AddNewAddressPage";
import AddressBookPage from "../pages/DashboardPages/AddressBookPage";
import ChangePasswordPage from "../pages/DashboardPages/ChangePasswordPage";
import MyAccountPage from "../pages/DashboardPages/MyAccountPage";
import ReferFriendsPage from "../pages/DashboardPages/ReferFriendsPage";
import ShipmentHistoryPage from "../pages/DashboardPages/ShipmentHistoryPage";
import UpdateUserInformation from "../pages/DashboardPages/UpdateUserInformation";
import HelpPage from "../pages/HelpPage";
import HomePage from "../pages/HomePage";
import HowItWorksPage from "../pages/HowItWorksPage";
import ShipPage from "../pages/ShipPage";
import TrackPage from "../pages/TrackPage";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";
import PaymentSuccess from "../pages/Pament/PaymentSuccess";
import PaymentError from "../pages/Pament/PaymentError";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "ship",
        element: <ShipPage />,
      },
      {
        path: "blog",
        element: <BlogPage />,
      },
      {
        path: "blog/:slug",
        element: <BlogDetailsPage />,
      },
      {
        path: "track",
        element: <TrackPage />,
      },
      {
        path: "how-it-works",
        element: <HowItWorksPage />,
      },
      {
        path: "help",
        element: <HelpPage />,
      },
      {
        path: "payment-success",
        element: (
          <PrivateRoute>
            <PaymentSuccess />
          </PrivateRoute>
        ),
      },
      {
        path: "payment-error",
        element: (
          <PrivateRoute>
            <PaymentError />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicRoute>
            <ForgotPasswordPage />
          </PublicRoute>
        ),
      },
      {
        path: "reset-password",
        element: (
          <PublicRoute>
            <ResetPasswordPage />
          </PublicRoute>
        ),
      },
      {
        path: "verify-otp",
        element: (
          <PublicRoute>
            <VerifyOtpPage />
          </PublicRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "my-account",
        element: (
          <PrivateRoute>
            <MyAccountPage />
          </PrivateRoute>
        ),
      },
      {
        path: "shipment-history",
        element: (
          <PrivateRoute>
            <ShipmentHistoryPage />
          </PrivateRoute>
        ),
      },
      {
        path: "change-password",
        element: (
          <PrivateRoute>
            <ChangePasswordPage />
          </PrivateRoute>
        ),
      },
      {
        path: "update-information",
        element: (
          <PrivateRoute>
            <UpdateUserInformation />
          </PrivateRoute>
        ),
      },
      {
        path: "address-book",
        element: (
          <PrivateRoute>
            <AddressBookPage />
          </PrivateRoute>
        ),
      },
      {
        path: "add-new-address",
        element: (
          <PrivateRoute>
            <AddNewAddressPage />
          </PrivateRoute>
        ),
      },
      {
        path: "refer-friends",
        element: (
          <PrivateRoute>
            <ReferFriendsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
