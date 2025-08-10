import { useState, useEffect } from 'react';
import BusinessList from '../components/BusinessList';
import { useAuth } from '../hooks/useAuth';
import { useGlobal } from '../hooks/useGlobal';

const BusinessExplorer = () => {
    const { IsAuth } = useAuth();
    const { handleLogin } = useGlobal();

    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    const handleBook = (business) => {
        if (!IsAuth) {
            handleLogin('user');
            return;
        }
        setSelectedBusiness(business);
        setShowBookingModal(true);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-150">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            Descubre Negocios Increíbles
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                            Encuentra los mejores servicios cerca de ti y agenda tu cita en segundos
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                <span>Reservas Instantáneas</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                                <span>Múltiples Categorías</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                                <span>Negocios Verificados</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-blue-50 to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                        <div className="text-gray-600 text-sm">Negocios Activos</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
                        <div className="text-gray-600 text-sm">Citas Realizadas</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                        <div className="text-gray-600 text-sm">Categorías</div>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                        <div className="text-3xl font-bold text-orange-600 mb-2">4.8★</div>
                        <div className="text-gray-600 text-sm">Calificación Promedio</div>
                    </div>
                </div>

                {/* Business List Section */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                                Explora Todos los Negocios
                            </h2>
                            <p className="text-gray-600">
                                Descubre servicios de calidad y agenda tu próxima cita
                            </p>
                        </div>
                        <div className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm">
                            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                            <span>Actualizado en tiempo real</span>
                        </div>
                    </div>
                    
                    <BusinessList
                        onBook={handleBook}
                        showBookingModal={showBookingModal}
                        setShowBookingModal={setShowBookingModal}
                        selectedBusiness={selectedBusiness}
                        setSelectedBusiness={setSelectedBusiness}
                        columns="md:grid-cols-3 lg:grid-cols-4"
                    />
                </div>

                {/* CTA Section */}
                <div className="mt-16 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-2xl shadow-2xl p-8 text-white text-center">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        ¿Tienes un negocio?
                    </h3>
                    <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                        Únete a nuestra plataforma y comienza a recibir clientes hoy mismo. 
                        Gestiona tus citas de forma inteligente y haz crecer tu negocio.
                    </p>
                    <button 
                        onClick={() => handleLogin('business')}
                        className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                        Registrar Mi Negocio
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessExplorer;
