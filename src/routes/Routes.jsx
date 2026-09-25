import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Login from "../pages/Login";
import Register from "../pages/Register";
import MyAccount from "../pages/MyAccount";
import Addresses from "../pages/Addresses";
import PrivateRoute from "../provider/PrivateRoute";
import NotFound from "../pages/NotFound";
import Catalog from "../pages/Catalog";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: "shop", element: <Shop /> },
            { path: "shop/:category", element: <Shop /> },
            { path: "cart", element: <Cart /> },
            { path: "catalog", element: <Catalog /> }
        ],
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            {
                path: "account",
                element: (
                    <PrivateRoute>
                        <MyAccount />
                    </PrivateRoute>
                ),
            },
            {
                path: "addresses",
                element: (
                    <PrivateRoute>
                        <Addresses />
                    </PrivateRoute>
                ),
            },
        ],
    },
    { path: "*", element: <NotFound /> },
]);