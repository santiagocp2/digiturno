import '../App.css';
import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const BookingModal = ({ show, onClose, business, onConfirm }) => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [notes, setNotes] = useState('');

    if (!show) return null;

    const availableTimes = [
        '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
        '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
        '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
        '4:00 PM', '4:30 PM'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedDate || !selectedTime) return;

        const appointment = {
            date: selectedDate.toDateString(),
            time: selectedTime,
            business: business.name,
            service: 'General Service', // Podrías añadir un selector de servicios
            notes,
            status: 'pending'
        };

        onConfirm(appointment);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">Book Appointment with {business.name}</h3>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-bold mb-3">Select Date</h4>
                                <div className="grid grid-cols-7 gap-2 text-center mb-4">
                                    {/* Días de la semana */}
                                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                        <div key={day} className="text-gray-400 text-sm py-1">{day}</div>
                                    ))}

                                    {/* Días del mes (ejemplo simplificado) */}
                                    {Array.from({ length: 35 }).map((_, i) => {
                                        const day = i + 1;
                                        const isAvailable = day % 2 === 0; // Solo días pares disponibles para el ejemplo

                                        return (
                                            <div
                                                key={i}
                                                onClick={() => isAvailable && setSelectedDate(new Date(2023, 5, day))}
                                                className={`py-1 rounded-full cursor-pointer ${selectedDate?.getDate() === day ? 'bg-blue-500 text-white' : isAvailable ? 'hover:bg-blue-100' : 'text-gray-400 cursor-not-allowed'}`}
                                            >
                                                {day <= 31 ? day : ''}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold mb-3">Select Time</h4>
                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {availableTimes.map(time => (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => setSelectedTime(time)}
                                            className={`py-2 rounded-lg transition-all ${selectedTime === time ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>

                                <div className="mb-6">
                                    <label className="block text-gray-700 mb-2">Notes (Optional)</label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                        placeholder="Any special requests or notes..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={!selectedDate || !selectedTime}
                                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    Confirm Appointment
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