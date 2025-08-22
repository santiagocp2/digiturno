import '../App.css';
import { useState, useEffect } from 'react';
import { FaTimes, FaCalendarAlt, FaClock, FaClipboardList } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingModal = ({
    show,
    onClose,
    business,
    onConfirm,
    turno // Nuevo prop: turno existente para edición
}) => {
    // Inicialización para edición
    // Corrige desfase de fecha por zona horaria
    const parseFecha = (fechaStr) => {
        if (!fechaStr) return new Date();
        const [year, month, day] = fechaStr.split('-').map(Number);
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    };
    const initialDate = turno ? parseFecha(turno.fecha) : new Date();
    const initialTime = turno && turno.hora ? {
        value: turno.hora.slice(11,16),
        display: turno.hora.slice(11,16)
    } : null;
    const initialNotes = turno?.notas || '';
    // Al editar, los servicios seleccionados deben estar marcados
    // Si los servicios vienen como ids, se seleccionarán tras cargar los servicios del negocio
    const initialSelectedServices = [];

    const [selectedDate, setSelectedDate] = useState(() => {
        if (turno?.fecha) {
            if (turno.fecha instanceof Date) {
                return turno.fecha;
            } else if (typeof turno.fecha === 'string') {
                const dateStr = turno.fecha.split('T')[0];
                const [year, month, day] = dateStr.split('-').map(Number);
                return new Date(year, month - 1, day);
            }
        }
        return new Date();
    });
    // Calcula el offset para que el día del turno editado esté visible
    const calcDayOffset = (date) => {
        const today = new Date();
        today.setHours(0,0,0,0);
        const target = new Date(date);
        target.setHours(0,0,0,0);
        const diff = Math.floor((target - today) / (1000 * 60 * 60 * 24));
        // El offset debe ser múltiplo de 5 menor o igual al diff
        return diff < 0 ? 0 : Math.floor(diff / 5) * 5;
    };
    const [dayOffset, setDayOffset] = useState(calcDayOffset(initialDate));

    // Sincroniza la fecha y el offset al abrir el modal de edición
    useEffect(() => {
        if (show && turno?.fecha) {
            let fechaTurno;
            if (typeof turno.fecha === 'string') {
                const dateStr = turno.fecha.split('T')[0];
                const [year, month, day] = dateStr.split('-').map(Number);
                fechaTurno = new Date(year, month - 1, day);
            } else if (turno.fecha instanceof Date) {
                fechaTurno = turno.fecha;
            } else {
                fechaTurno = new Date();
            }
            setSelectedDate(fechaTurno);
            setDayOffset(calcDayOffset(fechaTurno));
        }
    }, [show, turno]);
    const [selectedTime, setSelectedTime] = useState(initialTime);
    const [notes, setNotes] = useState(initialNotes);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedServices, setSelectedServices] = useState([]); // Para múltiples servicios
    const [activeTab, setActiveTab] = useState(0);

    // Cargar servicios del negocio al abrir el modal
    useEffect(() => {
        const fetchServices = async () => {
            const negocioId = business?.idNegocio || business?.id;
            if (!negocioId) return;
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                const response = await fetch(`${API_URL}/negocio/${negocioId}/servicios`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ targetMethod: 'GET' })
                });
                const result = await response.json();
                if (Array.isArray(result)) {
                    setServices(result);
                } else {
                    setServices([]);
                }
            } catch (error) {
                setServices([]);
            }
        };
        fetchServices();
        setSelectedService(null);
        // Si se edita, recalcula el offset para mostrar el día seleccionado
        if (turno?.fecha) {
            setDayOffset(calcDayOffset(new Date(turno.fecha)));
            setSelectedDate(new Date(turno.fecha));
        }
    }, [business?.id, turno]);

    // Preseleccionar servicios cuando ambos estén listos
    useEffect(() => {
        if (turno?.servicios && services.length > 0) {
            setSelectedServices(services.filter(s => turno.servicios.includes(s.idServicio)));
        }
    }, [services, turno]);

    // Generar horarios disponibles basados en workingHours y appointmentDuration del negocio
    const generateAvailableTimes = () => {
        if (!business?.workingHours || !business?.appointmentDuration) return [];

        const times = [];
        const [startHour, startMin] = business.workingHours.start.split(':').map(Number);
        const [endHour, endMin] = business.workingHours.end.split(':').map(Number);

        let currentHour = startHour;
        let currentMin = startMin;

        while (currentHour < endHour || (currentHour === endHour && currentMin <= endMin)) {
            const period = currentHour >= 12 ? 'PM' : 'AM';
            const displayHour = currentHour > 12 ? currentHour - 12 : currentHour;
            const timeStr = `${displayHour}:${currentMin.toString().padStart(2, '0')} ${period}`;

            times.push({
                value: `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`,
                display: timeStr
            });

            currentMin += business.appointmentDuration;
            if (currentMin >= 60) {
                currentMin = 0;
                currentHour++;
            }
        }

        return times;
    };

    const availableTimes = generateAvailableTimes();
    // Validación para horarios
    const horariosDisponibles = business?.workingHours && business?.appointmentDuration;
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime) return;

        // Validar servicios seleccionados
        if (selectedServices.length === 0) {
            alert('Por favor agrega al menos un servicio');
            return;
        }
        // Preparar datos para el API usando la estructura que espera el gateway
        // Construir hora en formato ISO (LocalDateTime)
        const pad = n => n.toString().padStart(2, '0');
        const year = selectedDate.getFullYear();
        const month = pad(selectedDate.getMonth() + 1);
        const day = pad(selectedDate.getDate());
        const [hour, minute] = selectedTime.value.split(':');
        const horaISO = `${year}-${month}-${day}T${pad(hour)}:${pad(minute)}:00`;

        const turnoData = {
            idNegocio: business.id,
            clienteId: turno?.clienteId || 66,
            estadoId: turno?.estadoId || 33,
            fecha: `${year}-${month}-${day}`,
            hora: horaISO,
            notas: notes || null,
            servicios: selectedServices.map(s => s.idServicio)
        };
        let url, method;
        const API_URL = import.meta.env.VITE_API_URL;
        if (turno) {
            url = `${API_URL}/turnos/${turno.id}`;
            method = 'POST'; // El gateway traduce el método
        } else {
            url = `${API_URL}/turnos`;
            method = 'POST';
        }
        // Enviar el wrapper correcto al gateway
        const requestData = {
            targetMethod: turno ? 'PUT' : 'POST',
            body: turnoData
        };
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData)
            });
            const result = await response.json();
            if (result.success) {
                console.log(turno ? 'Turno editado exitosamente:' : 'Turno creado exitosamente:', result.data);
                onConfirm(result.data);
                onClose();
                // Reset form solo si es nuevo
                if (!turno) {
                    setSelectedDate(new Date());
                    setSelectedTime(null);
                    setNotes('');
                    setSelectedServices([]);
                }
            } else {
                console.error('Error al crear turno:', result.message);
                alert('Error al crear el turno: ' + result.message);
            }
        } catch (error) {
            console.error('Error de conexión:', error);
            alert('Error de conexión al crear el turno');
        }
    };

    if (!show || !business) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 min-h-screen overflow-y-auto p-0" style={{top:0, left:0, right:0, bottom:0}}>
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg border border-gray-200 flex flex-col h-screen overflow-y-auto" style={{marginTop:0}}>
                <div className="flex justify-between items-center px-6 pt-6 pb-2 border-b">
                    <h3 className="text-2xl font-bold text-blue-700">Reserva de turno</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-red-500 text-2xl"><FaTimes /></button>
                </div>
                {/* Tabs */}
                <div className="flex border-b px-6 pt-4 bg-white sticky top-0 z-10">
                    <button className={`flex-1 py-2 text-center font-semibold transition-all border-b-2 ${activeTab === 0 ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500'}`} onClick={() => setActiveTab(0)}><FaClipboardList className="inline mr-1" /> Servicio</button>
                    <button className={`flex-1 py-2 text-center font-semibold transition-all border-b-2 ${activeTab === 1 ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500'}`} onClick={() => setActiveTab(1)}><FaCalendarAlt className="inline mr-1" /> Fecha y hora</button>
                    <button className={`flex-1 py-2 text-center font-semibold transition-all border-b-2 ${activeTab === 2 ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500'}`} onClick={() => setActiveTab(2)}><FaClock className="inline mr-1" /> Notas y resumen</button>
                </div>
                <form onSubmit={handleSubmit} className="px-6 py-6 flex-1 flex flex-col justify-between">
                    {/* Tab 1: Servicio y detalle */}
                    {activeTab === 0 && (
                        <div className="flex flex-col gap-6">
                            <div>
                                <h4 className="font-semibold mb-2 text-blue-600">Servicios</h4>
                                <table className="w-full border rounded-xl bg-gray-50">
                                    <thead>
                                        <tr className="bg-blue-100">
                                            <th className="p-2 text-left">Seleccionar</th>
                                            <th className="p-2 text-left">Servicio</th>
                                            <th className="p-2 text-left">Duración</th>
                                            <th className="p-2 text-left">Precio</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {services.map(service => (
                                            <tr key={service.idServicio} className="border-b">
                                                <td className="p-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedServices.some(s => s.idServicio === service.idServicio)}
                                                        onChange={e => {
                                                            if (e.target.checked) {
                                                                setSelectedServices([...selectedServices, service]);
                                                            } else {
                                                                setSelectedServices(selectedServices.filter(s => s.idServicio !== service.idServicio));
                                                            }
                                                        }}
                                                    />
                                                </td>
                                                <td className="p-2">{service.nombreServicio}</td>
                                                <td className="p-2">{service.duracionMin} min</td>
                                                <td className="p-2">${service.precio}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            {/* Lista de servicios agregados */}
                            <div className="mt-4 p-3 bg-blue-50 rounded-xl text-sm text-blue-900 border border-blue-200">
                                <div className="font-bold">Duración total: <span className="text-blue-700">{selectedServices.reduce((acc, s) => acc + (s.duracionMin || 0), 0)} min</span></div>
                                <div className="font-bold">Precio total: <span className="text-blue-700">${selectedServices.reduce((acc, s) => acc + (s.precio || 0), 0)}</span></div>
                            </div>
                        </div>
                    )}
                    {/* Tab 2: Fecha y hora */}
                    {activeTab === 1 && (
                        <div className="flex flex-col gap-6 items-center justify-center">
                            {!horariosDisponibles ? (
                                <div className="w-full bg-red-50 border border-red-200 rounded-xl p-6 text-center text-red-700">
                                    <h4 className="text-lg font-bold mb-2">No se puede mostrar el horario</h4>
                                    <p>Este negocio no tiene configurado su horario de atención o duración de cita.<br/>Por favor, contacta al administrador del negocio para más información.</p>
                                </div>
                            ) : (
                                <>
                                    {/* Días arriba, bien integrados */}
                                    <div className="w-full flex flex-col items-center mb-2">
                                        <div className="flex items-center mb-2 gap-2 w-full justify-center">
                                            <button
                                                type="button"
                                                className="px-2 py-2 rounded-full border bg-white text-blue-600 hover:bg-blue-100 shadow-sm text-base md:text-lg"
                                                onClick={() => setDayOffset(dayOffset > 0 ? dayOffset - 5 : 0)}
                                                disabled={dayOffset === 0}
                                                aria-label="Anterior"
                                            >
                                                &#8592;
                                            </button>
                                            <h4 className="font-semibold text-blue-600 flex items-center text-base md:text-lg"><FaCalendarAlt className="mr-2" /> Fecha</h4>
                                            <button
                                                type="button"
                                                className="px-2 py-2 rounded-full border bg-white text-blue-600 hover:bg-blue-100 shadow-sm text-base md:text-lg"
                                                onClick={() => setDayOffset(dayOffset + 5)}
                                                aria-label="Siguiente"
                                            >
                                                &#8594;
                                            </button>
                                        </div>
                                        <div className="w-full flex items-center justify-center mx-auto">
                                            <div className="flex flex-row gap-1 md:gap-2 w-full justify-center">
                                                {[...Array(5)].map((_, i) => {
                                                    const day = new Date();
                                                    day.setHours(0,0,0,0);
                                                    day.setDate(day.getDate() + dayOffset + i);
                                                    // Normaliza selectedDate a 00:00:00 para comparar solo el día
                                                    let selectedDay = selectedDate ? new Date(selectedDate) : null;
                                                    if (selectedDay) selectedDay.setHours(0,0,0,0);
                                                    const isSelected = selectedDay && day.getTime() === selectedDay.getTime();
                                                    return (
                                                        <button
                                                            key={i + dayOffset}
                                                            type="button"
                                                            onClick={() => { setSelectedDate(new Date(day)); setSelectedTime(null); }}
                                                            className={`px-1 py-1 md:px-2 md:py-2 rounded-xl border text-xs md:text-sm font-semibold min-w-[38px] md:min-w-[56px] transition-all ${isSelected ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-100'}`}
                                                        >
                                                            {day.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="mt-2 text-xs text-gray-500 text-center">
                                            Horario: <span className="font-semibold">{business.workingHours.start} - {business.workingHours.end}</span><br/>
                                            Duración exacta: <span className="font-semibold">{selectedService?.duracionMin ? `${selectedService.duracionMin} min` : '--'}</span>
                                        </div>
                                        {/* Mostrar fecha y hora seleccionada al lado */}
                                        <div className="mt-2 text-sm text-blue-700 flex items-center justify-center gap-2">
                                            <span className="font-semibold">Seleccionado:</span>
                                            <span>{selectedDate ? selectedDate.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : '--'}</span>
                                            <span>{selectedTime ? selectedTime.display : '--:--'}</span>
                                         </div>
                                    </div>
                                    {/* Horas debajo */}
                                    <div className="w-full max-w-xl flex flex-col items-center">
                                        <h4 className="font-semibold mb-2 text-blue-600 flex items-center"><FaClock className="mr-2" /> Hora</h4>
                                        <div className="flex justify-center w-full">
                                            <div className="grid grid-cols-3 gap-2 mb-4 h-56 overflow-y-auto w-full bg-white border rounded-xl shadow-sm p-2">
                                                {availableTimes.map((time, index) => (
                                                    <button
                                                        key={index}
                                                        type="button"
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`py-2 rounded-xl border transition-all text-sm font-semibold w-full ${selectedTime?.value === time.value
                                                            ? 'bg-blue-600 text-white border-blue-600'
                                                            : 'bg-white text-blue-600 border-blue-200 hover:bg-blue-100'} `}
                                                    >
                                                        {time.display}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                    {/* Tab 3: Notas y resumen */}
                    {activeTab === 2 && (
                        <div className="flex flex-col gap-6">
                            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6 flex flex-col justify-between h-full">
                                <h4 className="text-lg font-bold text-blue-700 mb-2">Notas para el negocio</h4>
                                <textarea
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                    className="w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 mb-4"
                                    rows={5}
                                    placeholder="¿Alguna solicitud especial?"
                                />
                            </div>
                            <div className="bg-gray-50 rounded-xl border border-gray-200 p-6">
                                <h4 className="text-lg font-bold text-blue-700 mb-2">Resumen de la reserva</h4>
                                <ul className="text-gray-700 text-base space-y-1">
                                    <li><span className="font-semibold">Negocio:</span> {business.name}</li>
                                    <li><span className="font-semibold">Fecha:</span> {selectedDate?.toLocaleDateString()}</li>
                                    <li><span className="font-semibold">Hora:</span> {selectedTime?.display || '--'}</li>
                                    <li className="font-semibold mb-1">Servicios:</li>
                                    {selectedServices.length === 0 ? (
                                        <li className="text-gray-500">No has agregado servicios.</li>
                                    ) : (
                                        selectedServices.map(service => (
                                            <li key={service.idServicio} className="ml-2">
                                                {service.nombreServicio} <span className="text-xs text-gray-500">({service.duracionMin} min, ${service.precio})</span>
                                            </li>
                                        ))
                                    )}
                                    <li className="font-bold mt-2">Duración total: <span className="text-blue-700">{selectedServices.reduce((acc, s) => acc + (s.duracionMin || 0), 0)} min</span></li>
                                    <li className="font-bold">Precio total: <span className="text-blue-700">${selectedServices.reduce((acc, s) => acc + (s.precio || 0), 0)}</span></li>
                                </ul>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            disabled={!selectedDate || !selectedTime || selectedServices.length === 0}
                            className="w-full py-3 bg-blue-700 text-white rounded-xl font-bold text-lg shadow hover:bg-blue-800 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            Confirmar reserva
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;