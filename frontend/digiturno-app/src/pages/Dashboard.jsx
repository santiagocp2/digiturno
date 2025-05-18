import '../App.css';
import BusinessDashboard from '../components/BusinessDashboard';
import UserDashboard from '../components/UserDashboard';

function Dashboard() {
    const [currentView, setCurrentView] = useState('user'); 
    return (
        <div>
            {currentView=== 'user' && <UserDashboard />}
            {currentView=== 'business' && <BusinessDashboard/>}
        </div>
    );
}

export default Dashboard;