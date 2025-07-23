import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Dashboard from '../pages/Dashboard';
import BusinessList from '../pages/BusinessList'; // ✅ nuevo import
import { AuthProvider } from '../auths/AuthProvider';
import { GlobalProvider } from '../contexts/GlobalContext';
import Layout from '../components/Layout';
import GlobalSpinner from '../components/GlobalSpinner';
import { useAuth } from '../hooks/useAuth';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/negocios", // ✅ nueva ruta pública
                element: <BusinessList />
            },
            {
                path: "/",
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/dashboard",
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

function GlobalRouterWrapper() {
    const { isInitialized } = useAuth();

    if (!isInitialized) {
        return (
            <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg">
                Cargando aplicación...
            </div>
        );
    }

    return (
        <GlobalProvider>
            <GlobalSpinner />
            <RouterProvider router={router} />
        </GlobalProvider>
    );
}

function GlobalRouter() {
    return (
        <AuthProvider>
            <GlobalRouterWrapper />
        </AuthProvider>
    );
}

export default GlobalRouter;
