import React, { lazy } from 'react';

// Layouts
const UserLayout = lazy(() => import('@/components/shared/Layout/UserLayout'));
const AdminLayout = lazy(() => import('@/components/admin/Layout/AdminLayout'));

// Pages
const HomePage = lazy(() => import('@/pages/Home/HomePage'));
const MenuPage = lazy(() => import('@/pages/Menu/MenuPage'));
const ReservationPage = lazy(() => import('@/pages/Reservation/ReservationPage'));
const LoginPage = lazy(() => import('@/pages/Auth/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/Auth/RegisterPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));

// Admin Pages
const Analytics = lazy(() => import('@/pages/Admin/Dashboard/Analytics'));
const MenuManagement = lazy(() => import('@/pages/Admin/Dashboard/MenuManagement'));
const Reservations = lazy(() => import('@/pages/Admin/Dashboard/Reservations'));
const Settings = lazy(() => import('@/pages/Admin/Dashboard/Settings'));

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
            // Staff page placeholder
            { path: 'staff', element: <div style={{ padding: '20px' }}>Staff Management (Coming Soon)</div> },
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
