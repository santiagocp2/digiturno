import '../App.css';
import { FaTachometerAlt, FaCalendar, FaUsers, FaCog, FaChartLine, FaSignOutAlt, FaHeart } from 'react-icons/fa';

const SideBar = ({ data, type, activeTab, setActiveTab }) => {
    const userLinks = [
        { icon: <FaTachometerAlt className="mr-2" />, label: 'Tablero', tab: 'dashboard' },
        { icon: <FaCalendar className="mr-2" />, label: 'Mis turnos', tab: 'appointments' },
        { icon: <FaHeart className="mr-2" />, label: 'Favoritos', tab: 'favorites' },
        { icon: <FaCog className="mr-2" />, label: 'Ajustes', tab: 'settings' }
    ];

    const businessLinks = [
        { icon: <FaTachometerAlt className="mr-2" />, label: 'Tablero', tab: 'dashboard' },
        { icon: <FaCalendar className="mr-2" />, label: 'Turnos', tab: 'appointments' },
        { icon: <FaUsers className="mr-2" />, label: 'Clientes', tab: 'customers' },
        { icon: <FaCog className="mr-2" />, label: 'Ajustes', tab: 'settings' },
        { icon: <FaChartLine className="mr-2" />, label: 'Reporte', tab: 'analytics' }
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
                        <h3 className="font-bold">
                            {`${data.name} ${data.lastname}`}
                        </h3>
                    </div>
                </div>
            ) : (
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                        {activeTab === 'dashboard' ? 'BS' : activeTab.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                        <h3 className="font-bold">Nombre del negocio</h3>
                        <p className="text-sm text-gray-500">{`${data.name} ${data.lastname}`}</p>
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
                    <FaSignOutAlt className="mr-2" />Cerrar sesion
                </button>
            </nav>
        </div>
    );
};

export default SideBar;