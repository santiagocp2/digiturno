import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
    const { IsAuth }  = useAuth();

    return IsAuth ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
