import '../App.css';
import { useState, useEffect } from 'react';
import { FaCalendarDay, FaClock, FaEdit, FaTimes, FaSearch } from 'react-icons/fa';
import SideBar from './SideBar';
import BookingModal from './BookingModal';
import BusinessCard from './BusinessCard';
import BusinessList from './BusinessList';
import UserTurnosList from './UserTurnosList';
import { useAuth } from '../hooks/useAuth';

const UserDashboard = ({ user }) => {
    const { IsAuth, showLoginModal } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    const [turnosRefreshTrigger, setTurnosRefreshTrigger] = useState(0);
    const [favoriteBusinesses, setFavoriteBusinesses] = useState([]);
    const [refreshFavorites, setRefreshFavorites] = useState(0);

    // Función para refrescar favoritos
    const handleFavoriteChange = () => {
        setRefreshFavorites(prev => prev + 1);
    };





    const handleConfirmAppointment = (newAppointment) => {
        // Trigger refresh of turnos list
        setTurnosRefreshTrigger(prev => prev + 1);
    };

    const loadFavoriteBusinesses = async () => {
        if (!user?.id) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/favorites/user/${user.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetMethod: 'GET' })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success && Array.isArray(result.data)) {
                    setFavoriteBusinesses(result.data);
                }
            }
        } catch (error) {
            console.error('Error loading favorite businesses:', error);
        }
    };

    // Cargar favoritos cuando cambie el usuario o la pestaña activa
    useEffect(() => {
        if (activeTab === 'favorites') {
            loadFavoriteBusinesses();
        }
    }, [activeTab, user?.id, refreshFavorites]);

    const handleBookAppointment = (business) => {
        if (!IsAuth) {
            showLoginModal();
            return;
        }
        setSelectedBusiness(business);
        setShowBookingModal(true);
    };

    const handleCancelAppointment = (id) => {
        // Implementar cancelación de turno aquí si es necesario
        setTurnosRefreshTrigger(prev => prev + 1);
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
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Negocios Disponibles</h2>

                            <BusinessList
                                onBook={handleBookAppointment}
                                showBookingModal={showBookingModal}
                                setShowBookingModal={setShowBookingModal}
                                selectedBusiness={selectedBusiness}
                                setSelectedBusiness={setSelectedBusiness}
                                onConfirm={handleConfirmAppointment}
                                filterCategory={true}
                                showInteractions={true}
                                onFavoriteChange={handleFavoriteChange}
                                onRatingChange={handleFavoriteChange}
                            />
                        </div>
                    )}

                    {activeTab === 'appointments' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Todos mis turnos</h2>
                            <UserTurnosList 
                                userId={user?.id} 
                                refreshTrigger={turnosRefreshTrigger}
                            />
                        </div>
                    )}

                    {activeTab === 'favorites' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Mis Negocios Favoritos</h2>
                            
                            {favoriteBusinesses.length === 0 ? (
                                <div className="text-center py-16 bg-gradient-to-br from-pink-50 to-red-100 rounded-2xl">
                                    <div className="text-6xl mb-6">💝</div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">No tienes favoritos aún</h3>
                                    <p className="text-gray-600 mb-6">Marca negocios como favoritos para encontrarlos fácilmente aquí</p>
                                    <div className="bg-white rounded-lg p-4 max-w-md mx-auto shadow-lg">
                                        <p className="text-sm text-gray-500">💡 Consejo: Haz clic en el corazón ❤️ de cualquier negocio para agregarlo a favoritos</p>
                                    </div>
                                </div>
                            ) : (
                                <div className={`grid grid-cols-1 ${columns} gap-6`}>
                                    {favoriteBusinesses.map((business) => (
                                        <BusinessCard 
                                            key={business.id} 
                                            business={business} 
                                            onBook={handleBookAppointment}
                                            showInteractions={true}
                                            onFavoriteChange={handleFavoriteChange}
                                            onRatingChange={handleFavoriteChange}
                                        />
                                    ))}
                                </div>
                            )}
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
