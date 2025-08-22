import '../App.css';
import BusinessDashboard from '../components/BusinessDashboard';
import UserDashboard from '../components/UserDashboard';
import { useAuth } from '../hooks/useAuth';
import { useGlobal } from '../hooks/useGlobal';

function Dashboard() {
    const { user, business, typeUser, handleLogout } = useAuth();
    return (
        <div>
            {typeUser === 1 && <UserDashboard user={user} onLogout={handleLogout} />}
            {typeUser === 2 && <BusinessDashboard business={business} />}
        </div>
    );
}

export default Dashboard;
