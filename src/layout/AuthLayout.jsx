import React from 'react';
import { Outlet } from 'react-router';
import AuthNavbar from '../components/authNavbar/AuthNavbar';
import AuthFooter from '../components/authFooter/AuthFooter';

const AuthLayout = () => {
    return (
        <div>
            <AuthNavbar />
            <Outlet />
            <AuthFooter />
        </div>
    );
};

export default AuthLayout;