import { useState, useEffect } from 'react';
import { FaClock, FaUser, FaServicestack, FaCalendarAlt, FaCheck, FaTimes, FaExclamationTriangle, FaFilter, FaEdit, FaTrash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import BookingModal from './BookingModal';
import ReactDOM from 'react-dom';

function BusinessTurnosList({ business, refreshTrigger }) {
    // Log para depuración del objeto business y su id
    console.log('BusinessTurnosList - business:', business);
    console.log('BusinessTurnosList - business.id:', business?.id);
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filterEstado, setFilterEstado] = useState('');
    const [filterFecha, setFilterFecha] = useState('');
    const [editingTurnoId, setEditingTurnoId] = useState(null);
    const [editEstadoId, setEditEstadoId] = useState('');
    const [editNotas, setEditNotas] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [turnoSelected, setTurnoSelected] = useState(null);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [editingTurno, setEditingTurno] = useState(null);
    const [businessData, setBusinessData] = useState(null);

    function formatTime(hora) {
        if (!hora) return 'Hora no disponible';
        if (typeof hora === 'string' && hora.match(/^\d{2}:\d{2}/)) {
            const timeOnly = hora.slice(0, 5);
            const [hours, minutes] = timeOnly.split(':');
            const date = new Date();
            date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
            return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
        }
        return new Date(hora).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    }
    function formatDate(fecha) {
        if (!fecha) return 'Fecha no disponible';
        if (typeof fecha === 'string' && fecha.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = fecha.split('-');
            const date = new Date(year, month - 1, day);
            return date.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        }
        return new Date(fecha).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
    function getStatusConfig(estadoId) {
        switch (estadoId) {
            case 1:
            case 36:
                return { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', text: 'Pendiente', icon: <FaClock className="w-3 h-3" /> };
            case 2:
            case 37:
                return { color: 'bg-green-100 text-green-800 border-green-200', text: 'Confirmado', icon: <FaCheck className="w-3 h-3" /> };
            case 3:
            case 38:
                return { color: 'bg-red-100 text-red-800 border-red-200', text: 'Cancelado', icon: <FaTimes className="w-3 h-3" /> };
            default:
                return { color: 'bg-gray-100 text-gray-800 border-gray-200', text: 'Desconocido', icon: <FaExclamationTriangle className="w-3 h-3" /> };
        }
    }
    useEffect(() => {
        async function fetchTurnos() {
            setLoading(true);
            setError(null);
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                let negocioId = null;
                // Siempre consultar el negocio del usuario usando business.id (que es el idUsuario)
                if (business?.id) {
                    console.log('[BusinessTurnosList] Consultando negocio para idUsuario:', business.id);
                    const businessResponse = await fetch(`${API_URL}/negocio/usuario/${business.id}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ targetMethod: 'GET' })
                    });
                    const businessResult = await businessResponse.json();
                    console.log('[BusinessTurnosList] Respuesta negocio usuario:', businessResult);
                    if (businessResult.success && businessResult.data && businessResult.data.length > 0) {
                        negocioId = businessResult.data[0].idNegocio;
                    } else {
                        setError('No se encontró negocio para este usuario');
                        setLoading(false);
                        return;
                    }
                }
                if (!negocioId) {
                    setError('No se encontró id de negocio');
                    setLoading(false);
                    return;
                }
                console.log('[BusinessTurnosList] Usando idNegocio:', negocioId);
                const requestData = { targetMethod: "GET" };
                const endpoint = `${API_URL}/turnos/negocio/${negocioId}`;
                console.log('[BusinessTurnosList] Endpoint:', endpoint);
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData)
                });
                const result = await response.json();
                console.log('[BusinessTurnosList] Respuesta backend:', result);
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
        if (business?.id) fetchTurnos();
    }, [business?.id, refreshTrigger]);

    // Filtrado de turnos
    const filteredTurnos = turnos.filter(turno => {
        let estadoMatch = true;
        let fechaMatch = true;
        if (filterEstado) {
            estadoMatch = String(turno.estadoId) === filterEstado;
        }
        if (filterFecha) {
            // Asume formato yyyy-mm-dd
            fechaMatch = turno.fecha && turno.fecha.startsWith(filterFecha);
        }
        return estadoMatch && fechaMatch;
    });

    // Modal de confirmación para borrar
    function handleDeleteTurno(turnoId) {
        setTurnoSelected(turnoId);
        setShowDeleteModal(true);
    }
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
        setShowDeleteModal(false);
        setTurnoSelected(null);
        setLoading(false);
    }
    function handleModalCancel() {
        setShowDeleteModal(false);
        setTurnoSelected(null);
    }
    // Edición profesional con BookingModal
    function handleEditTurno(turno) {
        // Normalizar datos para BookingModal
        // Replicar lógica del dashboard usuario: pasar datos del negocio
        let serviciosIds = [];
        if (Array.isArray(turno.servicios)) {
            serviciosIds = turno.servicios.map(id => Number(id));
        } else if (Array.isArray(turno.serviciosIds)) {
            serviciosIds = turno.serviciosIds.map(id => Number(id));
        } else if (Array.isArray(turno.servicios_id)) {
            serviciosIds = turno.servicios_id.map(id => Number(id));
        }
        let horaStr = '';
        if (turno.hora) {
            if (turno.hora.length >= 16) {
                horaStr = turno.hora;
            } else {
                horaStr = `${turno.fecha}T${turno.hora}:00`;
            }
        }
        const turnoEdit = {
            ...turno,
            servicios: serviciosIds,
            fecha: turno.fecha,
            hora: horaStr,
            notas: turno.notas || '',
        };
        // Construir objeto businessData igual que en UserTurnosList
        const businessData = {
            id: turno.negocioId || business?.idNegocio || business?.id,
            idNegocio: turno.negocioId || business?.idNegocio || business?.id,
            name: business?.name || turno.nombreNegocio || '',
            description: business?.description || turno.descripcionNegocio || '',
            address: business?.address || turno.direccionNegocio || '',
            urlImagen: business?.urlImagen || turno.urlImagenNegocio || '',
            rating: business?.rating || turno.ratingNegocio || 0,
            category: business?.category || turno.categoriaNegocio || 'General',
            workingHours: {
                start: business?.workingHours?.start || turno.horaInicio || '08:00',
                end: business?.workingHours?.end || turno.horaFin || '17:00'
            },
            appointmentDuration: business?.appointmentDuration || turno.duracionCita || 30
        };
        setEditingTurno(turnoEdit);
        setBusinessData(businessData);
        setShowBookingModal(true);
    }
    async function handleBookingModalConfirm(updatedTurno) {
        setLoading(true);
        setShowBookingModal(false);
        setEditingTurno(null);
        try {
            const API_URL = import.meta.env.VITE_API_URL;
            // Obtener idNegocio igual que en la consulta principal
            let negocioId = null;
            if (business?.id) {
                const businessResponse = await fetch(`${API_URL}/negocio/usuario/${business.id}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ targetMethod: 'GET' })
                });
                const businessResult = await businessResponse.json();
                if (businessResult.success && businessResult.data && businessResult.data.length > 0) {
                    negocioId = businessResult.data[0].idNegocio;
                }
            }
            if (!negocioId) throw new Error('No se encontró idNegocio para editar');
            const requestData = {
                targetMethod: "POST",
                body: updatedTurno
            };
            const response = await fetch(`${API_URL}/turnos/negocio/${negocioId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            });
            const result = await response.json();
            if (result.success) {
                setTurnos(turnos.map(t => t.id === updatedTurno.id ? updatedTurno : t));
            } else {
                setError(result.message || 'Error al actualizar turno');
            }
        } catch (err) {
            setError('Error de conexión');
        }
        setLoading(false);
    }
    function handleBookingModalClose() {
        setShowBookingModal(false);
        setEditingTurno(null);
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Turnos del Negocio</h2>
                    <p className="text-gray-600">Visualiza todos los turnos asignados a tu negocio</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                    {filteredTurnos.length} turno{filteredTurnos.length !== 1 ? 's' : ''}
                </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-4 items-center">
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Filtrar por estado</label>
                    <select value={filterEstado} onChange={e => setFilterEstado(e.target.value)} className="border rounded-lg px-3 py-2">
                        <option value="">Todos</option>
                        <option value="1">Pendiente</option>
                        <option value="2">Confirmado</option>
                        <option value="3">Cancelado</option>
                    </select>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-1">Filtrar por fecha</label>
                    <input type="date" value={filterFecha} onChange={e => setFilterFecha(e.target.value)} className="border rounded-lg px-3 py-2" />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTurnos.map((turno) => {
                    const statusConfig = getStatusConfig(turno.estadoId);
                    return (
                        <div key={turno.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                            {/* <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4"> */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Cliente #{turno.usuarioId}</h3>
                                        <p className="text-blue-100 text-sm">{turno.tipoServicio || 'Servicio General'}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${statusConfig.color}`}>
                                        {statusConfig.icon}
                                        {statusConfig.text}
                                    </span>
                                </div>
                            </div>
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
                                        <span className="text-orange-700 font-semibold">Notas:</span> {turno.notas}
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEditTurno(turno)}
                                        className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-all text-sm font-semibold border border-blue-200"
                                    >
                                        <FaEdit className="inline mr-2" />
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDeleteTurno(turno.id)}
                                        className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-all text-sm font-semibold border border-red-200"
                                    >
                                        <FaTrash className="inline mr-2" />
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            {/* Modal de confirmación para borrar */}
            {showDeleteModal && (
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
            {/* Modal de edición profesional */}
            {showBookingModal && (
                ReactDOM && ReactDOM.createPortal ?
                    ReactDOM.createPortal(
                        <BookingModal
                            show={showBookingModal}
                            onClose={handleBookingModalClose}
                            business={businessData}
                            user={null}
                            turno={editingTurno}
                            onConfirm={handleBookingModalConfirm}
                        />,
                        window.document.body
                    )
                : null
            )}
            {loading && <div className="text-center py-8 text-blue-600 font-bold">Procesando...</div>}
            {/* Oculta el texto de error para evitar mostrar mensajes técnicos al usuario */}
        </div>
    );
}

export default BusinessTurnosList;
