import '../App.css';
import BusinessDashboard from '../components/BusinessDashboard';
import UserDashboard from '../components/UserDashboard';
import { useGlobal } from '../hooks/useGlobal';

function Dashboard({ user, business }) {
    const currentView = useGlobal().currentView;
    return (
        <div>
            {currentView === 'userDashboard' && <UserDashboard user={user} />}
            {currentView === 'businessDashboard' && <BusinessDashboard business={business} />}
        </div>
    );
}

export default Dashboard;