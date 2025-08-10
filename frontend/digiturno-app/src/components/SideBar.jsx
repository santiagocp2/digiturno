import '../App.css';
import { FaTachometerAlt, FaCalendar, FaUsers, FaCog, FaChartLine, FaSignOutAlt, FaHeart } from 'react-icons/fa';

const SideBar = ({ data, type, activeTab, setActiveTab }) => {
    const userLinks = [
        { icon: <FaTachometerAlt className="mr-2" />, label: 'Negocios', tab: 'dashboard' },
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
        <div className="w-full md:w-64 bg-gradient-to-br from-slate-50 to-blue-50 rounded-lg shadow-lg border border-gray-200 p-4">
            {type === 'user' ? (
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                        {activeTab === 'dashboard' ? 'JS' : activeTab.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                        <h3 className="font-bold text-gray-800">
                            {`${data.name} ${data.lastname}`}
                        </h3>
                        <p className="text-sm text-gray-600">Usuario</p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center mb-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                        {activeTab === 'dashboard' ? 'BS' : activeTab.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                        <h3 className="font-bold text-gray-800">Nombre del negocio</h3>
                        <p className="text-sm text-gray-600">Empresa</p>
                    </div>
                </div>
            )}

            <nav>
                {links.map((link) => (
                    <button
                        key={link.tab}
                        onClick={() => setActiveTab(link.tab)}
                        className={`w-full text-left block py-3 px-4 rounded-lg mb-2 transition-all duration-200 flex items-center ${activeTab === link.tab
                            ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium shadow-md'
                            : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                    >
                        {link.icon}
                        {link.label}
                    </button>
                ))}

                <button className="w-full text-left block py-3 px-4 hover:bg-red-50 hover:text-red-500 rounded-lg text-gray-700 transition-all duration-200 flex items-center">
                    <FaSignOutAlt className="mr-2" />Cerrar sesión
                </button>
            </nav>
        </div>
    );
};

export default SideBar;