import '../App.css';
import { useState, useEffect } from 'react';
import { useGlobal } from '../hooks/useGlobal';
import { useNavigate } from 'react-router-dom';
import { 
    FaSearch, 
    FaCalendarCheck, 
    FaClock, 
    FaUsers, 
    FaStar,
    FaArrowRight,
    FaMapMarkerAlt,
    FaPhone,
    FaGlobe
} from 'react-icons/fa';

function Home() {
    const { handleUserSignup, handleBusinessSignup } = useGlobal();
    const navigate = useNavigate();
    
    const [stats, setStats] = useState({
        totalBusinesses: 0,
        totalAppointments: 0,
        totalCategories: 0,
        averageRating: 4.8
    });
    
    const [recentBusinesses, setRecentBusinesses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchHomeData();
    }, []);

    const fetchHomeData = async () => {
        try {
            setLoading(true);
            console.log('🔄 Iniciando carga de datos del home...');
            
            // Fetch businesses
            console.log('📋 Obteniendo negocios...');
            const businessResponse = await fetch('https://digiturnounir.site/api/negocios/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    targetMethod: 'GET'
                })
            });
            
            console.log('📋 Respuesta negocios:', businessResponse.status);
            if (businessResponse.ok) {
                const businessData = await businessResponse.json();
                console.log('📋 Datos de negocios:', businessData);
                
                if (Array.isArray(businessData)) {
                    setRecentBusinesses(businessData.slice(0, 6));
                    setStats(prev => ({ ...prev, totalBusinesses: businessData.length }));
                    console.log('✅ Negocios cargados:', businessData.length);
                } else if (businessData.data && Array.isArray(businessData.data)) {
                    setRecentBusinesses(businessData.data.slice(0, 6));
                    setStats(prev => ({ ...prev, totalBusinesses: businessData.data.length }));
                    console.log('✅ Negocios cargados (desde data):', businessData.data.length);
                } else {
                    console.log('⚠️ Formato de datos de negocios inesperado:', businessData);
                }
            } else {
                console.error('❌ Error al obtener negocios:', businessResponse.status);
            }

            // Fetch categories
            console.log('🏷️ Obteniendo categorías...');
            const categoriesResponse = await fetch('https://digiturnounir.site/api/negocios/categorias', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    targetMethod: 'GET'
                })
            });
            
            console.log('🏷️ Respuesta categorías:', categoriesResponse.status);
            if (categoriesResponse.ok) {
                const categoriesData = await categoriesResponse.json();
                console.log('🏷️ Datos de categorías:', categoriesData);
                
                if (Array.isArray(categoriesData)) {
                    setCategories(categoriesData.slice(0, 8));
                    setStats(prev => ({ ...prev, totalCategories: categoriesData.length }));
                    console.log('✅ Categorías cargadas:', categoriesData.length);
                } else {
                    console.log('⚠️ Formato de datos de categorías inesperado:', categoriesData);
                }
            } else {
                console.error('❌ Error al obtener categorías:', categoriesResponse.status);
            }

            // Simulate other stats (you can replace with real API calls)
            setStats(prev => ({ 
                ...prev, 
                totalAppointments: Math.floor(Math.random() * 1000) + 500,
                averageRating: 4.8 
            }));
            
            console.log('✅ Carga de datos completada');
            
        } catch (error) {
            console.error('❌ Error general al cargar datos del home:', error);
            
            // Fallback data para pruebas
            const fallbackBusinesses = [
                { id: 1, nombre: 'Salón Elite', descripcion: 'Servicios de belleza profesional', direccion: 'Calle Principal 123', telefono: '555-0123' },
                { id: 2, nombre: 'Clínica Dental', descripcion: 'Cuidado dental completo', direccion: 'Av. Salud 456', telefono: '555-0456' },
                { id: 3, nombre: 'Gimnasio FitZone', descripcion: 'Entrenamiento y fitness', direccion: 'Plaza Deportiva 789', telefono: '555-0789' }
            ];
            
            const fallbackCategories = ['Belleza', 'Salud', 'Fitness', 'Dental', 'Spa', 'Masajes'];
            
            setRecentBusinesses(fallbackBusinesses);
            setCategories(fallbackCategories);
            setStats(prev => ({ 
                ...prev, 
                totalBusinesses: fallbackBusinesses.length,
                totalCategories: fallbackCategories.length,
                totalAppointments: 750,
                averageRating: 4.8 
            }));
            
            console.log('🔄 Usando datos de respaldo');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/negocios?search=${encodeURIComponent(searchTerm)}`);
        } else {
            navigate('/negocios');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="bg-gray-50 font-sans min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-800 via-blue-900 to-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-slate-500/10"></div>
                
                <div className="relative container mx-auto px-4 py-20">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-300 to-slate-300 bg-clip-text text-transparent">
                            Tu Cita Perfecta
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 leading-relaxed">
                            Conectamos personas con los mejores negocios. Agenda, gestiona y disfruta de servicios de calidad.
                        </p>
                        
                        {/* Search Bar */}
                        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-2 mb-8">
                            <div className="flex">
                                <input
                                    type="text"
                                    placeholder="¿Qué servicio necesitas hoy?"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="flex-grow px-6 py-4 rounded-l-2xl focus:outline-none text-gray-800 text-lg placeholder-gray-500"
                                />
                                <button 
                                    onClick={handleSearch}
                                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-r-2xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                                >
                                    <FaSearch className="text-xl" />
                                </button>
                            </div>
                        </div>

                        {/* Hero Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-1">{stats.totalBusinesses}+</div>
                                <div className="text-sm opacity-80">Negocios</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-1">{stats.totalAppointments}+</div>
                                <div className="text-sm opacity-80">Citas</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-1">{stats.totalCategories}+</div>
                                <div className="text-sm opacity-80">Categorías</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-1">{stats.averageRating}★</div>
                                <div className="text-sm opacity-80">Calificación</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Explora por Categorías</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Descubre servicios organizados por categorías para encontrar exactamente lo que necesitas
                        </p>
                    </div>
                    
                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="bg-gray-200 rounded-xl h-32 animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {categories.map((category, index) => (
                                <div 
                                    key={index}
                                    onClick={() => navigate(`/negocios?category=${encodeURIComponent(category)}`)}
                                    className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1 border border-gray-200 hover:border-blue-200"
                                >
                                    <div className="text-3xl mb-3">
                                        {index % 6 === 0 ? '💄' : 
                                         index % 6 === 1 ? '🏥' : 
                                         index % 6 === 2 ? '💪' : 
                                         index % 6 === 3 ? '🦷' : 
                                         index % 6 === 4 ? '✂️' : '🎯'}
                                    </div>
                                    <h3 className="font-semibold text-gray-800 text-sm">{category}</h3>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Recent Businesses Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Negocios Destacados</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Los negocios más populares y mejor calificados de nuestra plataforma
                        </p>
                    </div>
                    
                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl h-64 animate-pulse shadow-lg"></div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {recentBusinesses.map((business) => (
                                <div 
                                    key={business.id}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
                                >
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{business.nombre}</h3>
                                            <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full">
                                                <FaStar className="text-yellow-500 text-sm mr-1" />
                                                <span className="text-sm font-semibold">4.8</span>
                                            </div>
                                        </div>
                                        
                                        <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                            {business.descripcion || 'Servicio de calidad profesional'}
                                        </p>
                                        
                                        <div className="space-y-2 mb-4">
                                            {business.direccion && (
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <FaMapMarkerAlt className="mr-2" />
                                                    <span>{business.direccion}</span>
                                                </div>
                                            )}
                                            {business.telefono && (
                                                <div className="flex items-center text-gray-500 text-sm">
                                                    <FaPhone className="mr-2" />
                                                    <span>{business.telefono}</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        <button 
                                            onClick={() => navigate('/negocios')}
                                            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold"
                                        >
                                            Ver Detalles
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    
                    <div className="text-center mt-12">
                        <button 
                            onClick={() => navigate('/negocios')}
                            className="bg-white text-blue-600 border-2 border-blue-400 px-8 py-4 rounded-xl hover:bg-blue-50 hover:border-blue-500 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                        >
                            Ver Todos los Negocios
                            <FaArrowRight className="inline ml-2" />
                        </button>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">¿Cómo Funciona?</h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Tres simples pasos para conseguir tu cita ideal
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-gradient-to-br from-blue-100 to-slate-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                                <FaSearch className="text-3xl text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">1. Busca</h3>
                            <p className="text-gray-600">
                                Encuentra el negocio perfecto usando nuestro buscador o explorando por categorías
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-gradient-to-br from-green-100 to-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaCalendarCheck className="text-3xl text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">2. Agenda</h3>
                            <p className="text-gray-600">
                                Selecciona tu fecha y hora preferida de forma rápida y sencilla
                            </p>
                        </div>
                        
                        <div className="text-center">
                            <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaClock className="text-3xl text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">3. Disfruta</h3>
                            <p className="text-gray-600">
                                Llega a tu cita y disfruta del mejor servicio sin complicaciones
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-slate-800 via-blue-900 to-slate-900 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-300 to-slate-300 bg-clip-text text-transparent">
                            ¿Listo para Comenzar?
                        </span>
                    </h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                        Únete a miles de usuarios que ya confían en nuestra plataforma para gestionar sus citas
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
                        <button 
                            onClick={handleUserSignup}
                            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Soy Cliente
                        </button>
                        <button 
                            onClick={handleBusinessSignup}
                            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-slate-800 transition-all duration-300"
                        >
                            Tengo un Negocio
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
