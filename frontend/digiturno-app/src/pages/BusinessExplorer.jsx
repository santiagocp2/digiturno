import { useState, useEffect } from 'react';
import BusinessList from '../components/BusinessList';
import { useAuth } from '../hooks/useAuth';
import { useGlobal } from '../hooks/useGlobal';

const BusinessExplorer = () => {
    const { IsAuth } = useAuth();
    const { handleLogin } = useGlobal();
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [businesses, setBusinesses] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/negocio`)
            .then(res => res.json())
            .then(data => {
                if (data.success && Array.isArray(data.data)) {
                    setBusinesses(data.data.map(b => ({
                        id: b.idNegocio,
                        name: b.nombre,
                        description: b.descripcion || '',
                        urlImagen: b.urlImagen || '',
                        address: b.direccion || '',
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

    const handleBook = (business) => {
        if (!IsAuth) {
            handleLogin('user');
            return;
        }
        setSelectedBusiness(business);
        setShowBookingModal(true);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Explorar negocios</h2>
            <BusinessList
                businesses={businesses}
                onBook={handleBook}
                showBookingModal={showBookingModal}
                setShowBookingModal={setShowBookingModal}
                selectedBusiness={selectedBusiness}
                setSelectedBusiness={setSelectedBusiness}
            />
        </div>
    );
};

export default BusinessExplorer;
