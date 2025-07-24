import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import BookingModal from '../components/BookingModal';
import BusinessCard from '../components/BusinessCard';
import { useAuth } from '../hooks/useAuth';

const BusinessExplorer = () => {
    const { IsAuth, showLoginModal } = useAuth();
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        fetch('http://52.14.112.147:8080/negocio')
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    setBusinesses(data.data.map(b => ({
                        id: b.idNegocio,
                        name: b.nombre,
                        description: b.descripcion || '',
                        urlImagen: b.urlImagen || '',
                        distance: '1 km', // opcional: simulado
                        category: 'General', // simulado
                        rating: 4.5, // simulado
                        workingHours: {
                            start: '08:00',
                            end: '17:00'
                        },
                        appointmentDuration: 30
                    })));
                }
            })
            .catch(error => console.error("Error cargando negocios:", error));
    }, []);

    const filtered = businesses.filter(b =>
        (selectedCategory === 'Todas' || b.category === selectedCategory) &&
        b.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleBook = (business) => {
        if (!IsAuth) {
            if (typeof showLoginModal === 'function') {
                showLoginModal();
            } else {
                console.warn("showLoginModal no está disponible en AuthContext");
            }
            return;
        }
        setSelectedBusiness(business);
        setShowBookingModal(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Explorar negocios</h2>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Buscar negocios..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="flex-grow px-4 py-3 border rounded-l-lg focus:outline-none"
                />
                <select
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                    className="border-t border-b border-r px-4 py-3 focus:outline-none"
                >
                    <option>Todas</option>
                    <option>General</option>
                </select>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-all">
                    <FaSearch />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(business => (
                    <BusinessCard key={business.id} business={business} onBook={handleBook} />
                ))}
            </div>

            <BookingModal
                show={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                business={selectedBusiness}
                onConfirm={() => setShowBookingModal(false)}
            />
        </div>
    );
};

export default BusinessExplorer;
