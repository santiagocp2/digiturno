import '../App.css';
import { FaTachometerAlt, FaCalendar, FaUsers, FaCog, FaChartLine, FaSignOutAlt, FaHeart } from 'react-icons/fa';

const SideBar = ({ type, activeTab, setActiveTab }) => {
    const userLinks = [
        { icon: <FaTachometerAlt className="mr-2" />, label: 'Dashboard', tab: 'dashboard' },
        { icon: <FaCalendar className="mr-2" />, label: 'My Appointments', tab: 'appointments' },
        { icon: <FaHeart className="mr-2" />, label: 'Favorites', tab: 'favorites' },
        { icon: <FaCog className="mr-2" />, label: 'Settings', tab: 'settings' }
    ];

    const businessLinks = [
        { icon: <FaTachometerAlt className="mr-2" />, label: 'Dashboard', tab: 'dashboard' },
        { icon: <FaCalendar className="mr-2" />, label: 'Appointments', tab: 'appointments' },
        { icon: <FaUsers className="mr-2" />, label: 'Customers', tab: 'customers' },
        { icon: <FaCog className="mr-2" />, label: 'Settings', tab: 'settings' },
        { icon: <FaChartLine className="mr-2" />, label: 'Analytics', tab: 'analytics' }
    ];

    const links = type === 'user' ? userLinks : businessLinks;

    return (
        <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4">
            {type === 'user' ? (
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                        {activeTab === 'dashboard' ? 'JS' : activeTab.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                        <h3 className="font-bold">John Smith</h3>
                        <p className="text-sm text-gray-500">Premium Member</p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                        {activeTab === 'dashboard' ? 'BS' : activeTab.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                        <h3 className="font-bold">Business Name</h3>
                        <p className="text-sm text-gray-500">Salon & Spa</p>
                    </div>
                </div>
            )}

            <nav>
                {links.map((link) => (
                    <button
                        key={link.tab}
                        onClick={() => setActiveTab(link.tab)}
                        className={`w-full text-left block py-3 px-4 rounded-lg mb-2 transition-all ${activeTab === link.tab
                            ? 'bg-blue-50 text-blue-600 font-medium'
                            : 'hover:bg-gray-100'
                            }`}
                    >
                        {link.icon}
                        {link.label}
                    </button>
                ))}

                <button className="w-full text-left block py-3 px-4 hover:bg-gray-100 rounded-lg">
                    <FaSignOutAlt className="mr-2" />Logout
                </button>
            </nav>
        </div>
    );
};

export default SideBar;