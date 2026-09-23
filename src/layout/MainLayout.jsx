import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div>
           <Navbar></Navbar>
            <Outlet />
            <h2 className="p-4 bg-gray-100">Footer (placeholder)</h2>
        </div>
    );
};

export default MainLayout;