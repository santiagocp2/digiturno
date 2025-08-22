import '../App.css';
import { useState, useEffect } from 'react';
import { FaCalendarDay, FaClock, FaEdit, FaTimes, FaSearch } from 'react-icons/fa';
import SideBar from './SideBar';
import BookingModal from './BookingModal';
import BusinessCard from './BusinessCard';
import BusinessList from './BusinessList';
import UserTurnosList from './UserTurnosList';
import { useAuth } from '../hooks/useAuth';

const UserDashboard = ({ user, onLogout }) => {
    // Número de columnas para la grilla de favoritos
    const columns = 'md:grid-cols-2 lg:grid-cols-3';
    const { IsAuth, showLoginModal, handleLogout } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');
    // Estado para el modal de negocios generales
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
    // Estado para el modal de favoritos
    const [showFavoritesBookingModal, setShowFavoritesBookingModal] = useState(false);
    const [selectedFavoritesBusiness, setSelectedFavoritesBusiness] = useState(null);
    const [turnosRefreshTrigger, setTurnosRefreshTrigger] = useState(0);
    const [favoriteBusinesses, setFavoriteBusinesses] = useState([]);
    const [refreshFavorites, setRefreshFavorites] = useState(0);
    // Estado para edición directa
    const [isEditing, setIsEditing] = useState(false);
    const [editUser, setEditUser] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || ''
    });

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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/favoritos/${user.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success && Array.isArray(result.data)) {
                    setFavoriteBusinesses(result.data.map(business => ({
                        id: business.idNegocio,
                        name: business.nombre,
                        description: business.descripcion,
                        address: business.direccion,
                        urlImagen: business.urlImagen,
                        rating: business.rating,
                        category: business.categoria || 'General',
                        workingHours: {
                            start: business.horaInicio || '08:00',
                            end: business.horaFin || '17:00'
                        },
                        appointmentDuration: business.duracionCita || 30
                    })));
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

    // Para favoritos
    const handleBookFavoriteAppointment = (business) => {
        if (!IsAuth) {
            showLoginModal();
            return;
        }
        setSelectedFavoritesBusiness(business);
        setShowFavoritesBookingModal(true);
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

    useEffect(() => {
        setEditUser({
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || ''
        });
    }, [user]);

    const handleInputChange = e => {
        const { name, value } = e.target;
        setEditUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveUser = async () => {
        try {
            const gatewayRequest = {
                targetMethod: 'PUT',
                queryParams: { userId: [String(user.id)] },
                body: editUser
            };
            const response = await fetch(`${import.meta.env.VITE_API_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(gatewayRequest)
            });
            if (response.ok) {
                setIsEditing(false);
                // Opcional: actualizar estado global/local del usuario
            } else {
                alert('Error al actualizar la información');
            }
        } catch (error) {
            alert('Error de red al actualizar la información');
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
                            {/* Modal solo para negocios generales */}
                            <BookingModal
                                isOpen={showBookingModal}
                                onClose={() => setShowBookingModal(false)}
                                business={selectedBusiness}
                                user={user}
                                onConfirm={handleConfirmAppointment}
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
                                <>
                                    <div className={`grid grid-cols-1 ${columns} gap-6`}>
                                        {favoriteBusinesses.map((business) => (
                                            <BusinessCard 
                                                key={business.id} 
                                                business={business} 
                                                onBook={handleBookFavoriteAppointment}
                                                showInteractions={true}
                                                onFavoriteChange={handleFavoriteChange}
                                                onRatingChange={handleFavoriteChange}
                                            />
                                        ))}
                                    </div>
                                    {/* Modal solo para favoritos */}
                                    <BookingModal
                                        show={showFavoritesBookingModal}
                                        onClose={() => setShowFavoritesBookingModal(false)}
                                        business={selectedFavoritesBusiness}
                                        user={user}
                                        onConfirm={handleConfirmAppointment}
                                    />
                                </>
                            )}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-white rounded-lg shadow-md p-8 w-full">
                            <h2 className="text-2xl font-bold mb-6 text-blue-700">Ajustes de cuenta</h2>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 flex items-center justify-center text-white font-bold text-2xl shadow-md">
                                        {editUser.name.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-gray-800">{editUser.name}</div>
                                        <div className="text-sm text-gray-500">Usuario registrado</div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-1">Email</label>
                                        {isEditing ? (
                                            <input name="email" value={editUser.email} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
                                        ) : (
                                            <div className="bg-gray-50 border rounded-lg px-3 py-2 text-gray-700">{editUser.email}</div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-1">Teléfono</label>
                                        {isEditing ? (
                                            <input name="phone" value={editUser.phone} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
                                        ) : (
                                            <div className="bg-gray-50 border rounded-lg px-3 py-2 text-gray-700">{editUser.phone || 'No registrado'}</div>
                                        )}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-semibold mb-1">Dirección</label>
                                        {isEditing ? (
                                            <input name="address" value={editUser.address} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
                                        ) : (
                                            <div className="bg-gray-50 border rounded-lg px-3 py-2 text-gray-700">{editUser.address || 'No registrada'}</div>
                                        )}
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-gray-700 font-semibold mb-1">Nombre</label>
                                        {isEditing ? (
                                            <input name="name" value={editUser.name} onChange={handleInputChange} className="w-full border rounded-lg px-3 py-2" />
                                        ) : (
                                            <div className="bg-gray-50 border rounded-lg px-3 py-2 text-gray-700">{editUser.name}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex justify-end mt-6">
                                    {isEditing ? (
                                        <>
                                            <button type="button" className="py-2 px-4 bg-gray-200 rounded-xl font-bold text-base shadow hover:bg-gray-300 transition-all mr-2" onClick={() => setIsEditing(false)}>Cancelar</button>
                                            <button type="button" className="py-2 px-6 bg-blue-700 text-white rounded-xl font-bold text-base shadow hover:bg-blue-800 transition-all" onClick={handleSaveUser}>Guardar</button>
                                        </>
                                    ) : (
                                        <button type="button" className="py-2 px-6 bg-blue-700 text-white rounded-xl font-bold text-base shadow hover:bg-blue-800 transition-all" onClick={() => setIsEditing(true)}>Editar información</button>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;

