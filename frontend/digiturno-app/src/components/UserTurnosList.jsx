import { useState, useEffect } from 'react';
import BookingModal from './BookingModal';
import { 
    FaClock, 
    FaUser, 
    FaServicestack, 
    FaCalendarAlt, 
    FaBuilding, 
    FaEdit, 
    FaTrash, 
    FaTimes,
    FaCheck,
    FaExclamationTriangle,
    FaMapMarkerAlt,
    FaPhone,
    FaStickyNote,
    FaHistory
} from 'react-icons/fa';

function UserTurnosList({ userId, refreshTrigger }) {
    // Función para editar turno (abre el modal de edición)
    // Editar turno: cargar datos del negocio y abrir modal
    async function handleEditTurno(turno) {
        // Usar los datos del turno y del negocio ya presentes
        setEditingTurno(turno);
        setBusinessData({
            id: turno.negocioId,
            name: turno.nombreNegocio || '',
            description: turno.descripcionNegocio || '',
            address: turno.direccionNegocio || '',
            urlImagen: turno.urlImagenNegocio || '',
            rating: turno.ratingNegocio || 0,
            category: turno.categoriaNegocio || 'General',
            workingHours: {
                start: turno.horaInicio || '08:00',
                end: turno.horaFin || '17:00'
            },
            appointmentDuration: turno.duracionCita || 30
        });
        setShowBookingModal(true);
    }

    // Crear turno desde favoritos u otra pestaña: solo negocio
    async function handleCreateTurnoFromBusiness(businessId) {
        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const response = await fetch(`${API_URL}/negocios/${businessId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetMethod: 'GET' })
            });
            const result = await response.json();
            if (result.success && result.data) {
                setBusinessData(result.data);
            } else {
                setBusinessData(null);
            }
        } catch (error) {
            setBusinessData(null);
        }
        setEditingTurno(null);
        setShowBookingModal(true);
        setLoading(false);
    }

    // Función para eliminar turno (abre el modal de confirmación)
    function handleDeleteTurno(turnoId) {
        setTurnoSelected(turnoId);
        setShowModal(true);
    }

    // Función para confirmar eliminación
    async function handleModalConfirm() {
        if (!turnoSelected) return;
        setLoading(true);
        setError(null);
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const requestData = { targetMethod: "DELETE" };
            const response = await fetch(`${API_URL}/turnos/${turnoSelected}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });
            const result = await response.json();
            if (result.success) {
                setTurnos(turnos.filter(t => t.id !== turnoSelected));
            } else {
                setError(result.message || 'Error al eliminar turno');
            }
        } catch (err) {
            setError('Error de conexión');
        }
        setShowModal(false);
        setTurnoSelected(null);
        setLoading(false);
    }

    // Función para cancelar el modal de eliminación
    function handleModalCancel() {
        setShowModal(false);
        setTurnoSelected(null);
    }
    // Formatea la hora en formato legible
    function formatTime(hora) {
        if (!hora) return 'Hora no disponible';
        // Si ya viene en formato HH:MM o HH:MM:SS, extraer solo HH:MM
        if (typeof hora === 'string' && hora.match(/^\d{2}:\d{2}/)) {
            const timeOnly = hora.slice(0, 5);
            const [hours, minutes] = timeOnly.split(':');
            const date = new Date();
            date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            return date.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            });
        }
        // Para otros formatos, usar el método original
        return new Date(hora).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    // Formatea la fecha en formato legible
    function formatDate(fecha) {
        if (!fecha) return 'Fecha no disponible';
        if (typeof fecha === 'string' && fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = fecha.split('-');
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        return new Date(fecha).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    // Configuración visual y lógica para cada estado de turno
    function getStatusConfig(estadoId) {
        // Puedes ajustar los IDs según tu base de datos
        switch (estadoId) {
            case 1: // Pendiente
            case 36: // Personalizado: Pendiente
                return {
                    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                    text: 'Pendiente',
                    icon: <FaClock className="w-3 h-3" />,
                    canEdit: true,
                    canCancel: true
                };
            case 2: // Confirmado
            case 37: // Personalizado: Confirmado
                return {
                    color: 'bg-green-100 text-green-800 border-green-200',
                    text: 'Confirmado',
                    icon: <FaCheck className="w-3 h-3" />,
                    canEdit: true,
                    canCancel: true
                };
            case 3: // Cancelado
            case 38: // Personalizado: Cancelado
                return {
                    color: 'bg-red-100 text-red-800 border-red-200',
                    text: 'Cancelado',
                    icon: <FaTimes className="w-3 h-3" />,
                    canEdit: false,
                    canCancel: false
                };
            default:
                return {
                    color: 'bg-gray-100 text-gray-800 border-gray-200',
                    text: 'Desconocido',
                    icon: <FaExclamationTriangle className="w-3 h-3" />,
                    canEdit: true,
                    canCancel: true
                };
        }
    }
    // ✅ COMPONENTE ACTUALIZADO - VERSION PROFESIONAL 2.0
    console.log('🚀 UserTurnosList Professional Version Loaded!');

    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingTurno, setEditingTurno] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalAction, setModalAction] = useState(null);
    const [turnoSelected, setTurnoSelected] = useState(null);
    const [businessData, setBusinessData] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);

    // Cargar turnos del usuario al montar o cambiar userId/refreshTrigger
    useEffect(() => {
        async function fetchTurnos() {
            setLoading(true);
            setError(null);
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const requestData = {
                    targetMethod: "GET",
                    queryParams: { userId: [String(userId)] }
                };
                const response = await fetch(`${API_URL}/turnos`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData)
                });
                const result = await response.json();
                if (result.success) {
                    setTurnos(result.data || []);
                } else {
                    setError(result.message || 'Error al cargar turnos');
                }
            } catch (err) {
                setError('Error de conexión');
            }
            setLoading(false);
        }
        if (userId) fetchTurnos();
    }, [userId, refreshTrigger]);

    // Utilidades y funciones
    // ...existing code...

    // Confirmar edición
    const handleBookingModalConfirm = async (updatedTurno) => {
        // Consultar el backend para obtener el turno actualizado
        setLoading(true);
        setShowBookingModal(false);
        setEditingTurno(null);
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const requestData = {
                targetMethod: "GET",
                queryParams: { userId: [String(userId)] }
            };
            // Consulta todos los turnos del usuario y actualiza la lista
            const response = await fetch(`${API_URL}/turnos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });
            const result = await response.json();
            if (result.success) {
                setTurnos(result.data || []);
            } else {
                setError(result.message || 'Error al actualizar turno');
            }
        } catch (err) {
            setError('Error de conexión');
        }
        setLoading(false);
    };
    // Cerrar modal
    const handleBookingModalClose = () => {
        setShowBookingModal(false);
        setEditingTurno(null);
    };

    // ...existing code...

    // Render principal
    return (
        <>
            <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Mis Turnos</h2>
                        <p className="text-gray-600">Gestiona y edita tus citas programadas</p>
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                        {turnos.length} turno{turnos.length !== 1 ? 's' : ''}
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {turnos.map((turno) => {
                        const statusConfig = getStatusConfig(turno.estadoId);
                        return (
                            <div key={turno.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                                {/* Header */}
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-bold text-lg mb-1">Negocio #{turno.negocioId}</h3>
                                            <p className="text-blue-100 text-sm">{turno.tipoServicio || 'Servicio General'}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${statusConfig.color}`}>
                                            {statusConfig.icon}
                                            {statusConfig.text}
                                        </span>
                                    </div>
                                </div>
                                {/* Content */}
                                <div className="p-6">
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center text-gray-700 bg-blue-50 p-2 rounded">
                                            <FaCalendarAlt className="mr-3 text-blue-500" />
                                            <div>
                                                <span className="font-medium">{formatDate(turno.fecha)}</span>
                                                <div className="text-xs text-gray-500">Fecha de la cita</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-gray-700 bg-green-50 p-2 rounded">
                                            <FaClock className="mr-3 text-green-500" />
                                            <div>
                                                <span className="font-medium">{formatTime(turno.hora)}</span>
                                                <div className="text-xs text-gray-500">Hora de la cita</div>
                                            </div>
                                        </div>
                                    </div>
                                    {turno.notas && (
                                        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                                            <div className="flex items-start">
                                                <FaStickyNote className="mr-2 text-orange-600 mt-1" />
                                                <div>
                                                    <p className="text-sm font-semibold text-orange-800">Notas:</p>
                                                    <p className="text-sm text-orange-700">{turno.notas}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        {statusConfig.canEdit && (
                                            <button
                                                onClick={() => handleEditTurno(turno)}
                                                className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-all text-sm font-semibold border border-blue-200"
                                            >
                                                <FaEdit className="inline mr-2" />
                                                Editar
                                            </button>
                                        )}
                                        {statusConfig.canCancel && (
                                            <button
                                                onClick={() => handleDeleteTurno(turno.id)}
                                                className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-all text-sm font-semibold border border-red-200"
                                            >
                                                <FaTrash className="inline mr-2" />
                                                Eliminar
                                            </button>
                                        )}
            {/* Modal de confirmación de eliminación */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full text-center">
                        <h2 className="text-xl font-bold mb-4 text-gray-800">¿Eliminar turno?</h2>
                        <p className="mb-6 text-gray-600">¿Estás seguro que deseas eliminar este turno? Esta acción no se puede deshacer.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-semibold"
                                onClick={handleModalConfirm}
                            >Sí, eliminar</button>
                            <button
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-semibold"
                                onClick={handleModalCancel}
                            >No, volver</button>
                        </div>
                    </div>
                </div>
            )}
                                    </div>
                                    {/* Footer */}
                                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                                        <div className="flex items-center">
                                            <FaHistory className="mr-1" />
                                            <span>Registrado: {new Date(turno.creadoEn).toLocaleDateString('es-ES')}</span>
                                        </div>
                                        <div className="text-xs bg-gray-100 px-2 py-1 rounded">
                                            ID: {turno.id}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
            {/* Modal de edición reutilizable y profesional */}
            {showBookingModal && (
                <BookingModal
                    show={showBookingModal}
                    onClose={handleBookingModalClose}
                    business={businessData}
                    onConfirm={handleBookingModalConfirm}
                    turno={editingTurno}
                />
            )}
        </>
    );
}

export default UserTurnosList;