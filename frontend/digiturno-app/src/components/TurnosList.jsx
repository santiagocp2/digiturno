import { useState, useEffect } from 'react';
import { FaClock, FaUser, FaServicestack, FaCalendarAlt } from 'react-icons/fa';

const TurnosList = ({ businessId, clienteId, businessOwnerId, refreshTrigger, title = "Turnos Programados" }) => {
    const [turnos, setTurnos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTurnos = async () => {
        if (!businessId && !clienteId && !businessOwnerId) return;
        
        setLoading(true);
        setError(null);

        try {
            const API_URL = import.meta.env.VITE_API_URL;
            let endpoint;
            let actualBusinessId = businessId;

            // Si tenemos businessOwnerId, primero necesitamos obtener el negocio de ese usuario
            if (businessOwnerId && !businessId) {
                console.log('Buscando negocio para usuario:', businessOwnerId);
                
                const businessResponse = await fetch(`${API_URL}/negocio/usuario/${businessOwnerId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ targetMethod: "GET" })
                });

                const businessResult = await businessResponse.json();
                console.log('Respuesta del negocio:', businessResult);
                
                if (businessResult.success && businessResult.data && businessResult.data.length > 0) {
                    actualBusinessId = businessResult.data[0].idNegocio;
                    console.log('ID del negocio encontrado:', actualBusinessId);
                } else {
                    console.error('No se encontró negocio para el usuario:', businessOwnerId);
                    setError('No se encontró negocio para este usuario');
                    setLoading(false);
                    return;
                }
            }

            const requestData = {
                targetMethod: "GET"
            };

            // Determinar qué endpoint usar
            if (actualBusinessId) {
                endpoint = `${API_URL}/turnos/negocio/${actualBusinessId}`;
                console.log('Consultando turnos en endpoint:', endpoint);
            } else if (clienteId) {
                endpoint = `${API_URL}/turnos/cliente/${clienteId}`;
                console.log('Consultando turnos de cliente en endpoint:', endpoint);
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });

            const result = await response.json();
            console.log('Respuesta de turnos:', result);
            
            if (result.success) {
                setTurnos(result.data || []);
            } else {
                setError('Error al cargar turnos: ' + result.message);
            }
        } catch (error) {
            console.error('Error al cargar turnos:', error);
            setError('Error de conexión al cargar turnos');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTurnos();
    }, [businessId, clienteId, businessOwnerId, refreshTrigger]);

    const getStatusColor = (estadoId) => {
        switch (estadoId) {
            case 33: return 'bg-yellow-100 text-yellow-800'; // PENDIENTE
            case 34: return 'bg-green-100 text-green-800';   // CONFIRMADO
            case 35: return 'bg-blue-100 text-blue-800';     // EN_PROCESO
            case 36: return 'bg-purple-100 text-purple-800'; // COMPLETADO
            case 37: return 'bg-red-100 text-red-800';       // CANCELADO
            case 38: return 'bg-gray-100 text-gray-800';     // NO_SHOW
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusText = (estadoId) => {
        switch (estadoId) {
            case 33: return 'Pendiente';
            case 34: return 'Confirmado';
            case 35: return 'En Proceso';
            case 36: return 'Completado';
            case 37: return 'Cancelado';
            case 38: return 'No Show';
            default: return 'Desconocido';
        }
    };

    const formatDate = (fecha) => {
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (hora) => {
        return new Date(hora).toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2">Cargando turnos...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    if (turnos.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                <FaCalendarAlt className="mx-auto text-4xl mb-4" />
                <p>No hay turnos programados</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
                {title} ({turnos.length})
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {turnos.map((turno) => (
                    <div key={turno.id} className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center space-x-2">
                                <FaCalendarAlt className="text-blue-600 text-sm" />
                                <span className="font-semibold text-gray-800 text-sm">
                                    {formatDate(turno.fecha)}
                                </span>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(turno.estadoId)}`}>
                                {getStatusText(turno.estadoId)}
                            </span>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <FaClock className="text-gray-500 text-sm" />
                                <span className="text-gray-700 text-sm">
                                    {formatTime(turno.hora)}
                                </span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <FaUser className="text-gray-500 text-sm" />
                                <span className="text-gray-700 text-sm">
                                    Cliente ID: {turno.clienteId}
                                </span>
                            </div>

                            {turno.tipoServicio && (
                                <div className="flex items-center space-x-2">
                                    <FaServicestack className="text-gray-500 text-sm" />
                                    <span className="text-gray-700 text-sm">
                                        {turno.tipoServicio}
                                    </span>
                                </div>
                            )}
                        </div>

                        {turno.notas && (
                            <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                                <p className="text-xs text-gray-600">
                                    <strong>Notas:</strong> {turno.notas}
                                </p>
                            </div>
                        )}

                        <div className="mt-2 text-xs text-gray-500">
                            Creado: {new Date(turno.creadoEn).toLocaleString('es-ES')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TurnosList;

