import '../App.css';
import { FaCalendarAlt, FaUser, FaStore, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';

const Header = ({ onUserLogin, onBusinessLogin, user, business, onLogout }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="gradient-bg text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src="/logo_digiturno.png" width={150} className="text-2xl" />
                </div>

                <div className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-blue-200 transition-all">Inicio</a>
                    <a href="#" className="hover:text-blue-200 transition-all">Negocios</a>
                    <a href="#" className="hover:text-blue-200 transition-all">Nosotros</a>
                </div>

                {!user && !business ? (
                    <div className="flex space-x-4">
                        <button
                            onClick={onUserLogin}
                            className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition-all"
                        >
                            <FaUser className="mr-2 inline" /> Usuario
                        </button>
                        <button
                            onClick={onBusinessLogin}
                            className="bg-blue-800 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-900 transition-all"
                        >
                            <FaStore className="mr-2 inline" /> Negocio
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center space-x-4">
                        <span className="font-medium">
                            {user ? `Bienvenido, ${user.name}` : `Negocio: ${business.name}`}
                        </span>
                        <button
                            onClick={onLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-all"
                        >
                            Cerrar sesion
                        </button>
                    </div>
                )}

                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-2xl"
                >
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-blue-900 px-4 py-2">
                    <a href="#" className="block py-2 hover:text-blue-200">Inicio</a>
                    <a href="#" className="block py-2 hover:text-blue-200">Negocios</a>
                    <a href="#" className="block py-2 hover:text-blue-200">Nosotros</a>
                    {user || business ? (
                        <button
                            onClick={onLogout}
                            className="block py-2 hover:text-blue-200 w-full text-left"
                        >
                            Cerrar sesion
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={onUserLogin}
                                className="block py-2 hover:text-blue-200 w-full text-left"
                            >
                                Usuario
                            </button>
                            <button
                                onClick={onBusinessLogin}
                                className="block py-2 hover:text-blue-200 w-full text-left"
                            >
                                Negocio
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Header;