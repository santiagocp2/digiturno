import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import { AuthProvider } from '../auths/AuthProvider';
import { GlobalProvider } from '../contexts/GlobalContext';
import Layout from '../components/Layout';
import GlobalSpinner from '../components/GlobalSpinner';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { 
                index: true, 
                element: <Home /> 
            },
            {
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/appointment_user",
                        element: <Dashboard />,
                    },
                    {
                        path: "/appointment_business",
                        element: <Dashboard />,
                    }
                ]
            },
            { 
                path: "*", 
                element: <NotFound /> 
            },
        ]
    },

]);

function GlobalRouter() {

    return (
        <AuthProvider>
            {/* Wrap the router in AuthProvider to provide authentication context */}
            <GlobalProvider>
                <GlobalSpinner />
                <RouterProvider router={router} />
            </GlobalProvider>
        </AuthProvider>
    );
}

export default GlobalRouter;