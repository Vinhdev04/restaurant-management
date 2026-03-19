import React, { lazy } from 'react';

// Layouts
import UserLayout from '@/components/shared/Layout/UserLayout';
import AdminLayout from '@/components/admin/Layout/AdminLayout';

// Pages
import HomePage from '@/pages/Home/HomePage.jsx';
import MenuPage from '@/pages/Menu/MenuPage.jsx';
import ReservationPage from '@/pages/Reservation/ReservationPage.jsx';
import LoginPage from '@/pages/Auth/LoginPage.jsx';
import RegisterPage from '@/pages/Auth/RegisterPage.jsx';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage.jsx';
import Tablet from '@/Tablet.jsx';

// Admin Pages
import Analytics from '@/pages/Admin/Dashboard/Analytics.jsx';
import MenuManagement from '@/pages/Admin/Dashboard/MenuManagement.jsx';
import Reservations from '@/pages/Admin/Dashboard/Reservations.jsx';
import Settings from '@/pages/Admin/Dashboard/Settings.jsx';

// Staff Pages
import Manager from '@/Manager.jsx';
import Chef from '@/Chef.jsx';

const routes = [
    // User Routes
    {
        path: '/',
        element: <UserLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: 'menu', element: <MenuPage /> },
            { path: 'menu/:category', element: <MenuPage /> },
            { path: 'reservation', element: <ReservationPage /> },
            { path: 'tablet', element: <Tablet /> },
        ]
    },

    // Admin Routes
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { index: true, element: <Analytics /> },
            { path: 'dashboard', element: <Analytics /> },
            { path: 'analytics', element: <Analytics /> },
            { path: 'menu', element: <MenuManagement /> },
            { path: 'reservations', element: <Reservations /> },
            { path: 'settings', element: <Settings /> },
            { path: 'staff', element: <div style={{ padding: '20px' }}>Staff Management</div> },
        ]
    },

    // Staff Routes
    {
        path: '/staff',
        element: <AdminLayout />, // Re-use AdminLayout for staff
        children: [
            { index: true, element: <Manager /> },
            { path: 'manager', element: <Manager /> },
            { path: 'chef', element: <Chef /> },
        ]
    },

    // Auth Routes (No Layout)
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    },

    // 404
    {
        path: '*',
        element: <NotFoundPage />
    }
];

export default routes;
