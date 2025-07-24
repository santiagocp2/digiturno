import '../App.css';
import { useState, useEffect } from 'react';
import { FaCalendarDay, FaClock, FaEdit, FaTimes, FaSearch } from 'react-icons/fa';
import SideBar from './SideBar';
import BookingModal from './BookingModal';
import BusinessCard from './BusinessCard';
import { useAuth } from '../hooks/useAuth';

const UserDashboard = ({ user }) => {
    const { IsAuth, showLoginModal } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');

    const [appointments, setAppointments] = useState([
        {
            id: 1,
            business: 'Elite Salon',
            service: 'Haircut & Styling',
            date: 'June 15, 2023',
            time: '10:00 AM - 11:00 AM',
            status: 'confirmed'
        },
        {
            id: 2,
            business: 'City Medical',
            service: 'Annual Checkup',
            date: 'June 18, 2023',
            time: '2:30 PM - 3:15 PM',
            status: 'pending'
        }
    ]);

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
                        distance: '1 km', // Opcional: simulado
                        category: 'General', // Simulado
                        rating: 4.5, // Simulado
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

    const filteredBusinesses = businesses.filter(b =>
        (selectedCategory === 'Todas' || b.category === selectedCategory) &&
        b.name.toLowerCase().includes(query.toLowerCase())
    );

    const handleConfirmAppointment = (newAppointment) => {
        setAppointments([...appointments, {
            ...newAppointment,
            id: Date.now(),
            status: 'confirmed',
            customer: 'user name',
        }]);
    };

    const handleBookAppointment = (business) => {
        if (!IsAuth) {
            showLoginModal();
            return;
        }
        setSelectedBusiness(business);
        setShowBookingModal(true);
    };

    const handleCancelAppointment = (id) => {
        setAppointments(appointments.filter(appt => appt.id !== id));
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'confirmed':
                return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Confirmado</span>;
            case 'pending':
                return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pendiente</span>;
            case 'cancelled':
                return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Cancelada</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Borrador</span>;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
                <SideBar data={user} type="user" activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="flex-1">
                    {activeTab === 'dashboard' && (
                        <>
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Turnos</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {appointments.map(appointment => (
                                        <div key={appointment.id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                                            <div className="flex justify-between items-start mb-3">
                                                <div>
                                                    <h3 className="font-bold">{appointment.business}</h3>
                                                    <p className="text-sm text-gray-500">{appointment.service}</p>
                                                </div>
                                                {getStatusBadge(appointment.status)}
                                            </div>
                                            <div className="flex items-center text-gray-600 mb-3">
                                                <FaCalendarDay className="mr-2" />
                                                <span>{appointment.date}</span>
                                            </div>
                                            <div className="flex items-center text-gray-600 mb-4">
                                                <FaClock className="mr-2" />
                                                <span>{appointment.time}</span>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-all">
                                                    <FaEdit className="mr-1 inline" /> Reagendar
                                                </button>
                                                <button
                                                    onClick={() => handleCancelAppointment(appointment.id)}
                                                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-all"
                                                >
                                                    <FaTimes className="mr-1 inline" /> Cancelar
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold mb-6">Buscar negocios</h2>

                                <div className="mb-6">
                                    <div className="flex">
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
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredBusinesses.map(business => (
                                        <BusinessCard key={business.id} business={business} onBook={handleBookAppointment} />
                                    ))}
                                </div>

                                <BookingModal
                                    show={showBookingModal}
                                    onClose={() => setShowBookingModal(false)}
                                    business={selectedBusiness}
                                    onConfirm={handleConfirmAppointment}
                                />
                            </div>
                        </>
                    )}

                    {activeTab === 'appointments' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Todos los turnos</h2>
                        </div>
                    )}

                    {activeTab === 'favorites' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Negocio favorito</h2>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Ajustes de cuenta</h2>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
