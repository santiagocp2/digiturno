import '../App.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <img src="/logo_digiturno.png" width={150} />
                        </h3>
                        <p className="text-gray-400">
                            Simplificando la programación de turnos tanto para empresas como para clientes.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Enlaces rapidos</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">Inicio</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">Negocios</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">Nosotros</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Apoyo</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">Centro de ayuda</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">FAQs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">Politica de privacidad</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">Condiciones de servicio</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4">Contactenos</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center">
                                <FaMapMarkerAlt className="mr-2" /> 123 Business Ave, Suite 100
                            </li>
                            <li className="flex items-center">
                                <FaPhone className="mr-2" /> (555) 123-4567
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="mr-2" /> support@scheduleease.com
                            </li>
                        </ul>

                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all">
                                <FaFacebookF />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-all">
                                <FaTwitter />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-all">
                                <FaInstagram />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-all">
                                <FaYoutube />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; {new Date().getFullYear()} DigiTurno. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
