import '../App.css';
import { useState } from 'react';
import { FaTimes, FaCalendarAlt, FaClock } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingModal = ({
    show,
    onClose,
    business,
    onConfirm
}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [notes, setNotes] = useState('');

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime) return;

        // Calcular hora de fin automáticamente
        const [hours, minutes] = selectedTime.value.split(':').map(Number);
        const endTime = new Date(selectedDate);
        endTime.setHours(hours, minutes + business.appointmentDuration, 0, 0);

        const endTimeStr = endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const appointment = {
            id: Date.now(),
            business: business.name,
            businessId: business.id,
            date: selectedDate.toDateString(),
            time: `${selectedTime.display} - ${endTimeStr}`,
            service: 'General Service', // Puedes agregar un selector de servicios
            notes,
            status: 'pending',
            customer: "user.name" // Asumiendo que tienes el usuario en contexto
        };

        onConfirm(appointment);
        onClose();
    };

    if (!show || !business) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">Reserva en {business.name}</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold mb-3 flex items-center">
                                    <FaCalendarAlt className="mr-2" /> Seleccionar fecha
                                </h4>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => {
                                        setSelectedDate(date);
                                        setSelectedTime(null); // Reset time when date changes
                                    }}
                                    minDate={new Date()}
                                    inline
                                    className="border rounded-lg p-2 w-full"
                                />
                                <div className="mt-2 text-sm text-gray-500">
                                    <p>Horas de trabajo: {business.workingHours.start} - {business.workingHours.end}</p>
                                    <p>Duracion del turno: {business.appointmentDuration} minutos</p>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold mb-3 flex items-center">
                                    <FaClock className="mr-2" /> Seleccionar hora
                                </h4>
                                <div className="grid grid-cols-2 gap-3 mb-6 h-64 overflow-y-auto">
                                    {availableTimes.map((time, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-2 rounded-lg transition-all ${selectedTime?.value === time.value
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                                                }`}
                                        >
                                            {time.display}
                                        </button>
                                    ))}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 mb-2">Notas (Opcional)</label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                        placeholder="Any special requests..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!selectedDate || !selectedTime}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Confirmar reserva
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;