import BusinessCard from './BusinessCard';
import BookingModal from './BookingModal';
import { FaSearch } from 'react-icons/fa';

import { useState, useEffect } from 'react';

const BusinessList = ({ onBook, showBookingModal, setShowBookingModal, selectedBusiness, setSelectedBusiness, onConfirm, filterCategory = true, columns = "md:grid-cols-2 lg:grid-cols-3", showInteractions = false }) => {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [businesses, setBusinesses] = useState([]);
    const [categories, setCategories] = useState(['Todas']);
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    // Función para refrescar datos cuando cambian ratings o favoritos
    const handleRefresh = () => {
        setRefreshTrigger(prev => prev + 1);
    };

    useEffect(() => {
        // Cargar categorías
        const loadCategories = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/negocio/categorias`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ targetMethod: 'GET' })
                });
                const data = await response.json();
                if (data.success && Array.isArray(data.data)) {
                    const categoryNames = ['Todas', ...data.data.map(cat => cat.nombre)];
                    setCategories(categoryNames);
                }
            } catch (error) {
                console.error("Error cargando categorías:", error);
            }
        };

        // Cargar negocios
        const loadBusinesses = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/negocio/list-details`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ targetMethod: 'GET' })
                });
                const data = await response.json();
                console.log('Datos recibidos:', data);
                
                if (data.success && Array.isArray(data.data)) {
                    setBusinesses(data.data.map(b => ({
                        id: b.idNegocio,
                        name: b.nombre,
                        description: b.descripcion || '',
                        urlImagen: b.urlImagen || '',
                        address: b.direccion || '',
                        category: b.categoria || 'General',
                        rating: b.rating || 0,
                        workingHours: {
                            start: b.horaInicio || '08:00',
                            end: b.horaFin || '17:00'
                        },
                        appointmentDuration: b.duracionCita || 30
                    })));
                } else {
                    console.error("Datos no válidos:", data);
                    // Fallback al endpoint anterior
                    const fallbackResponse = await fetch(`${import.meta.env.VITE_API_URL}/negocio`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ targetMethod: 'GET' })
                    });
                    const fallbackData = await fallbackResponse.json();
                    if (fallbackData.success && Array.isArray(fallbackData.data)) {
                        setBusinesses(fallbackData.data.map(b => ({
                            id: b.idNegocio,
                            name: b.nombre,
                            description: b.descripcion || '',
                            urlImagen: b.urlImagen || '',
                            address: b.direccion || '',
                            category: 'General',
                            rating: 0,
                            workingHours: {
                                start: '08:00',
                                end: '17:00'
                            },
                            appointmentDuration: 30
                        })));
                    }
                }
            } catch (error) {
                console.error("Error cargando negocios:", error);
            }
        };

        loadCategories();
        loadBusinesses();
    }, [refreshTrigger]);

    const filtered = businesses.filter(b =>
        (!filterCategory || selectedCategory === 'Todas' || b.category === selectedCategory) &&
        b.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Buscar negocios..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="flex-grow px-4 py-3 border rounded-l-lg focus:outline-none"
                />
                {filterCategory && (
                    <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="border-t border-b border-r px-4 py-3 focus:outline-none"
                    >
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                )}
                <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-all">
                    <FaSearch />
                </button>
            </div>

            <div className={`grid grid-cols-1 ${columns} gap-6`}>
                {filtered.map(business => (
                    <BusinessCard 
                        key={business.id} 
                        business={business} 
                        onBook={onBook}
                        showInteractions={showInteractions}
                        onFavoriteChange={handleRefresh}
                        onRatingChange={handleRefresh}
                    />
                ))}
            </div>

            <BookingModal
                show={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                business={selectedBusiness}
                onConfirm={(turnoData) => {
                    setShowBookingModal(false);
                    if (onConfirm) onConfirm(turnoData);
                }}
            />
        </>
    );
};

export default BusinessList;

