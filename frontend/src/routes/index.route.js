
import { lazy } from 'react';
const routes = [
   {
        path: '/',
        component: lazy(() => import('@/pages/Home/HomePage'))
    },
    {
        path: '/menu',
        component: lazy(() => import('@/pages/Menu/MenuPage'))
    },
    {
        path: '/menu/:category',
        component: lazy(() => import('@/pages/Menu/MenuPage'))
    },
    {
        path: '/reservation',
        component: lazy(() => import('@/pages/Reservation/ReservationPage'))
    },
    {
        path: '/admin',
        component: lazy(() => import('@/pages/Admin/Dashboard/Overview'))
    },
    {
        path: '/admin/dashboard',
        component: lazy(() => import('@/pages/Admin/Dashboard/Overview'))
    },
    {
        path: '*',
        component: lazy(() => import('@/pages/NotFoundPage/NotFoundPage'))
    },
    

]
export default  routes;