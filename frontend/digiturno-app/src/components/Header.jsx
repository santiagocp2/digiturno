import '../App.css';
import { FaUser, FaStore, FaBars, FaTimes } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = ({ onUserLogin, onBusinessLogin, user, business, onLogout }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const dashboardLabel = user ? 'Mis Turnos' : business ? 'Mi Negocio' : 'Dashboard';

    return (
        <nav className="gradient-bg text-white shadow-lg">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <img src="/logo_digiturno.png" width={150} alt="DigiTurno Logo" className="text-2xl" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6">
                    <Link to="/" className="hover:text-blue-200 transition-all">Inicio</Link>
                    <Link to="/negocios" className="hover:text-blue-200 transition-all">Negocios</Link>
                    <Link to="#" className="hover:text-blue-200 transition-all">Nosotros</Link>
                </div>

                {/* Auth Buttons */}
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
                        <Link
                            to="/dashboard"
                            className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition-all"
                        >
                            {dashboardLabel}
                        </Link>
                        <button
                            onClick={onLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-all"
                        >
                            Cerrar sesión
                        </button>
                    </div>
                )}

                {/* Mobile Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden text-2xl"
                >
                    {mobileMenuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-blue-900 px-4 py-2">
                    <Link to="/" className="block py-2 hover:text-blue-200">Inicio</Link>
                    <Link to="/negocios" className="block py-2 hover:text-blue-200">Negocios</Link>
                    <Link to="#" className="block py-2 hover:text-blue-200">Nosotros</Link>

                    {(user || business) && (
                        <Link
                            to="/dashboard"
                            className="block py-2 hover:text-blue-200"
                        >
                            {dashboardLabel}
                        </Link>
                    )}

                    {user || business ? (
                        <button
                            onClick={onLogout}
                            className="block py-2 hover:text-blue-200 w-full text-left"
                        >
                            Cerrar sesión
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
