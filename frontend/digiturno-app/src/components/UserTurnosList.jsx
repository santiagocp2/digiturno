import { useState, useEffect } from 'react';
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

const UserTurnosList = ({ userId, refreshTrigger }) => {
    // ✅ COMPONENTE ACTUALIZADO - VERSION PROFESIONAL 2.0
    console.log('🚀 UserTurnosList Professional Version Loaded!');
    
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editingTurno, setEditingTurno] = useState(null);
    const [editForm, setEditForm] = useState({
        fecha: '',
        hora: '',
        notas: ''
    });
    const [businessData, setBusinessData] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);

    const fetchUserTurnos = async () => {
        if (!userId) return;
        
        setLoading(true);
        setError(null);

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const requestData = {
                targetMethod: "GET"
            };

            const response = await fetch(`${API_URL}/turnos/cliente/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();
            
            if (result.success) {
                setTurnos(result.data || []);
            } else {
                setError('Error al cargar turnos: ' + result.message);
            }
        } catch (error) {
            console.error('Error al cargar turnos del usuario:', error);
            setError('Error de conexión al cargar turnos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserTurnos();
    }, [userId, refreshTrigger]);

    const getStatusConfig = (estadoId) => {
        switch (estadoId) {
            case 33: return { 
                color: 'bg-orange-100 text-orange-800 border-orange-200', 
                text: 'Pendiente',
                icon: <FaClock className="w-3 h-3" />,
                canEdit: true,
                canCancel: true
            };
            case 34: return { 
                color: 'bg-green-100 text-green-800 border-green-200', 
                text: 'Confirmado',
                icon: <FaCheck className="w-3 h-3" />,
                canEdit: false,
                canCancel: true
            };
            case 35: return { 
                color: 'bg-blue-50 text-blue-700 border-blue-200', 
                text: 'En Proceso',
                icon: <FaClock className="w-3 h-3" />,
                canEdit: false,
                canCancel: false
            };
            case 36: return { 
                color: 'bg-purple-100 text-purple-800 border-purple-200', 
                text: 'Completado',
                icon: <FaCheck className="w-3 h-3" />,
                canEdit: false,
                canCancel: false
            };
            case 37: return { 
                color: 'bg-red-100 text-red-800 border-red-200', 
                text: 'Cancelado',
                icon: <FaTimes className="w-3 h-3" />,
                canEdit: false,
                canCancel: false
            };
            case 38: return { 
                color: 'bg-gray-100 text-gray-800 border-gray-200', 
                text: 'No Show',
                icon: <FaExclamationTriangle className="w-3 h-3" />,
                canEdit: false,
                canCancel: false
            };
            default: return { 
                color: 'bg-gray-100 text-gray-800 border-gray-200', 
                text: 'Desconocido',
                icon: <FaExclamationTriangle className="w-3 h-3" />,
                canEdit: false,
                canCancel: false
            };
        }
    };

    const formatDate = (fecha) => {
        if (!fecha) return 'Fecha no disponible';
        
        // Si ya viene en formato YYYY-MM-DD, crear Date directamente
        if (typeof fecha === 'string' && fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
            // Agregar la zona horaria local para evitar problemas de UTC
            const [year, month, day] = fecha.split('-');
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        
        // Para otros formatos, usar el método original
        return new Date(fecha).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (hora) => {
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
    };

    const formatDateForInput = (fecha) => {
        // Si ya viene en formato YYYY-MM-DD, devolverla tal como está
        if (typeof fecha === 'string' && fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
            return fecha;
        }
        // Si viene en otro formato, convertirla
        return new Date(fecha).toISOString().split('T')[0];
    };

    const formatTimeForInput = (hora) => {
        // Si ya viene en formato HH:MM, devolverla tal como está
        if (typeof hora === 'string' && hora.match(/^\d{2}:\d{2}(:\d{2})?$/)) {
            return hora.slice(0, 5); // Asegurar formato HH:MM
        }
        // Si viene en otro formato, convertirla
        return new Date(hora).toTimeString().slice(0, 5);
    };

    // Generar horarios disponibles basados en workingHours y appointmentDuration del negocio
    const generateAvailableTimes = (business) => {
        if (!business?.workingHours || !business?.appointmentDuration) return [];

        const times = [];
        const [startHour, startMin] = business.workingHours.start.split(':').map(Number);
        const [endHour, endMin] = business.workingHours.end.split(':').map(Number);

        let currentHour = startHour;
        let currentMin = startMin;

        while (currentHour < endHour || (currentHour === endHour && currentMin <= endMin)) {
            const timeValue = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
            const period = currentHour >= 12 ? 'PM' : 'AM';
            const displayHour = currentHour > 12 ? currentHour - 12 : (currentHour === 0 ? 12 : currentHour);
            const timeDisplay = `${displayHour}:${currentMin.toString().padStart(2, '0')} ${period}`;

            times.push({
                value: timeValue,
                display: timeDisplay
            });

            currentMin += business.appointmentDuration;
            if (currentMin >= 60) {
                currentMin = 0;
                currentHour++;
            }
        }

        return times;
    };

    const fetchBusinessData = async (negocioId) => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const requestData = {
                targetMethod: "GET"
            };

            const response = await fetch(`${API_URL}/negocios/${negocioId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();
            
            if (result.success) {
                return result.data;
            } else {
                console.error('Error al obtener datos del negocio:', result.message);
                return null;
            }
        } catch (error) {
            console.error('Error al obtener datos del negocio:', error);
            return null;
        }
    };

    const handleEditTurno = async (turno) => {
        console.log('🔧 Iniciando edición de turno:', turno.id);
        console.log('📅 Datos del turno recibidos:', {
            fecha: turno.fecha,
            hora: turno.hora,
            creadoEn: turno.creadoEn
        });
        
        // Cargar datos del negocio para obtener horarios disponibles
        const business = await fetchBusinessData(turno.negocioId);
        if (business) {
            setBusinessData(business);
            const times = generateAvailableTimes(business);
            setAvailableTimes(times);
            console.log('📋 Horarios disponibles:', times);
        }

        const formattedDate = formatDateForInput(turno.fecha);
        const formattedTime = formatTimeForInput(turno.hora);
        
        console.log('🔄 Datos formateados para el formulario:', {
            fecha: formattedDate,
            hora: formattedTime,
            original: { fecha: turno.fecha, hora: turno.hora }
        });

        setEditingTurno(turno.id);
        setEditForm({
            fecha: formattedDate,
            hora: formattedTime,
            notas: turno.notas || ''
        });
    };

    const handleSaveEdit = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const requestData = {
                targetMethod: "PUT",
                body: {
                    fecha: editForm.fecha,
                    hora: editForm.hora,
                    notas: editForm.notas
                }
            };

            const response = await fetch(`${API_URL}/turnos/${editingTurno}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();
            
            if (result.success) {
                setEditingTurno(null);
                fetchUserTurnos();
                alert('Turno actualizado exitosamente');
            } else {
                alert('Error al actualizar turno: ' + result.message);
            }
        } catch (error) {
            console.error('Error al actualizar turno:', error);
            alert('Error de conexión al actualizar turno');
        }
    };

    const handleCancelEdit = () => {
        setEditingTurno(null);
        setEditForm({ fecha: '', hora: '', notas: '' });
        setBusinessData(null);
        setAvailableTimes([]);
    };

    const handleDeleteTurno = async (turnoId) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este turno? Esta acción no se puede deshacer.')) return;

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const requestData = {
                targetMethod: "DELETE"
            };

            const response = await fetch(`${API_URL}/turnos/${turnoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();
            
            if (result.success) {
                fetchUserTurnos();
                alert('Turno eliminado exitosamente');
            } else {
                alert('Error al eliminar turno: ' + result.message);
            }
        } catch (error) {
            console.error('Error al eliminar turno:', error);
            alert('Error de conexión al eliminar turno');
        }
    };

    const handleCancelAppointment = async (turnoId) => {
        if (!confirm('¿Estás seguro de que quieres cancelar este turno?')) return;

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            const requestData = {
                targetMethod: "PUT",
                body: {
                    estadoId: 37 // Estado CANCELADO
                }
            };

            const response = await fetch(`${API_URL}/turnos/${turnoId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();
            
            if (result.success) {
                fetchUserTurnos();
                alert('Turno cancelado exitosamente');
            } else {
                alert('Error al cancelar turno: ' + result.message);
            }
        } catch (error) {
            console.error('Error al cancelar turno:', error);
            alert('Error de conexión al cancelar turno');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-12">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Cargando tus turnos...</p>
                    <p className="text-gray-400 text-sm">Esto puede tomar unos segundos</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl shadow-sm">
                <div className="flex items-center">
                    <FaExclamationTriangle className="mr-3 text-red-500" />
                    <div>
                        <p className="font-semibold">Error al cargar turnos</p>
                        <p className="text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    if (turnos.length === 0) {
        return (
            <div className="text-center py-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl">
                <FaCalendarAlt className="mx-auto text-6xl mb-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No tienes turnos programados</h3>
                <p className="text-gray-600 mb-6">¡Es el momento perfecto para reservar tu primer turno!</p>
                <div className="bg-white rounded-lg p-4 max-w-md mx-auto shadow-lg">
                    <p className="text-sm text-gray-500">💡 Consejo: Explora nuestros negocios y encuentra el servicio que necesitas</p>
                </div>
            </div>
        );
    }

    return (
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
                    const isEditing = editingTurno === turno.id;
                    
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
                                {isEditing ? (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha</label>
                                            <input
                                                type="date"
                                                value={editForm.fecha}
                                                min={new Date().toISOString().split('T')[0]} // Solo fechas futuras
                                                onChange={(e) => setEditForm({...editForm, fecha: e.target.value})}
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Hora</label>
                                            {businessData && businessData.workingHours ? (
                                                <div>
                                                    <div className="mb-2 text-xs text-gray-600 bg-blue-50 p-2 rounded">
                                                        🕒 <strong>Horario:</strong> {businessData.workingHours.start} - {businessData.workingHours.end}<br/>
                                                        ⏱️ <strong>Duración:</strong> {businessData.appointmentDuration} minutos
                                                    </div>
                                                    <select
                                                        value={editForm.hora}
                                                        onChange={(e) => setEditForm({...editForm, hora: e.target.value})}
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    >
                                                        <option value="">Selecciona una hora</option>
                                                        {availableTimes.map((time, index) => (
                                                            <option key={index} value={time.value}>
                                                                {time.display}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            ) : (
                                                <input
                                                    type="time"
                                                    value={editForm.hora}
                                                    onChange={(e) => setEditForm({...editForm, hora: e.target.value})}
                                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            )}
                                        </div>
                                        
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Notas</label>
                                            <textarea
                                                value={editForm.notas}
                                                onChange={(e) => setEditForm({...editForm, notas: e.target.value})}
                                                rows="3"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Notas adicionales..."
                                            />
                                        </div>
                                        
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSaveEdit}
                                                disabled={!editForm.fecha || !editForm.hora}
                                                className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-all font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            >
                                                <FaCheck className="inline mr-2" />
                                                Guardar
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="flex-1 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-all font-semibold"
                                            >
                                                <FaTimes className="inline mr-2" />
                                                Cancelar
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
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
                                                    onClick={() => handleCancelAppointment(turno.id)}
                                                    className="flex-1 bg-orange-50 text-orange-600 py-2 rounded-lg hover:bg-orange-100 transition-all text-sm font-semibold border border-orange-200"
                                                >
                                                    <FaTimes className="inline mr-2" />
                                                    Cancelar
                                                </button>
                                            )}
                                            {(turno.estadoId === 37 || turno.estadoId === 36) && ( // Solo para cancelados o completados
                                                <button
                                                    onClick={() => handleDeleteTurno(turno.id)}
                                                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-all text-sm font-semibold border border-red-200"
                                                >
                                                    <FaTrash className="inline mr-2" />
                                                    Eliminar
                                                </button>
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
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserTurnosList;

