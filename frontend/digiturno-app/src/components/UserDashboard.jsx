import '../App.css';
import { useState } from 'react';
import { FaCalendarDay, FaClock, FaEdit, FaTimes, FaPlus, FaSearch, FaCut, FaHeartbeat, FaStar, FaMapMarkerAlt } from 'react-icons/fa';
import SideBar from './SideBar';
import BookingModal from './BookingModal';

const UserDashboard = ({ user }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [selectedBusiness, setSelectedBusiness] = useState(null);
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
    const [businesses, setBusinesses] = useState([
        {
            id: 1,
            name: 'Elite Salon',
            description: 'Professional hair styling and beauty services',
            rating: 4.5,
            distance: '1.2 miles away',
            icon: 'cut'
        },
        {
            id: 2,
            name: 'City Medical',
            description: 'Comprehensive healthcare services',
            rating: 5,
            distance: '2.5 miles away',
            icon: 'heartbeat'
        }
    ]);


    const handleBookAppointment = (business) => {
        setSelectedBusiness(business);
        setShowBookingModal(true);
    };

    const handleConfirmAppointment = (newAppointment) => {
        setAppointments([...appointments, {
            ...newAppointment,
            id: appointments.length + 1,
            status: 'confirmed'
        }]);
    };

    const handleCancelAppointment = (id) => {
        setAppointments(appointments.filter(appt => appt.id !== id));
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'confirmed':
                return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Confirmed</span>;
            case 'pending':
                return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>;
            case 'cancelled':
                return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Cancelled</span>;
            default:
                return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Unknown</span>;
        }
    };

    const getBusinessIcon = (icon) => {
        switch (icon) {
            case 'cut': return <FaCut className="text-4xl text-blue-600" />;
            case 'heartbeat': return <FaHeartbeat className="text-4xl text-green-600" />;
            default: return <FaCut className="text-4xl text-blue-600" />;
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-6">
                <SideBar type="user" activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="flex-1">
                    {activeTab === 'dashboard' && (
                        <>
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
                                    <button
                                        onClick={() => handleBookAppointment({ name: 'New Business' })}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                                    >
                                        <FaPlus className="mr-2 inline" />Book Appointment
                                    </button>
                                    <BookingModal
                                        show={showBookingModal}
                                        onClose={() => setShowBookingModal(false)}
                                        business={selectedBusiness}
                                        onConfirm={handleConfirmAppointment}
                                    />
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
                                                    <FaEdit className="mr-1 inline" /> Reschedule
                                                </button>
                                                <button
                                                    onClick={() => handleCancelAppointment(appointment.id)}
                                                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-all"
                                                >
                                                    <FaTimes className="mr-1 inline" /> Cancel
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h2 className="text-2xl font-bold mb-6">Find Businesses</h2>

                                <div className="mb-6">
                                    <div className="flex">
                                        <input
                                            type="text"
                                            placeholder="Search for businesses..."
                                            className="flex-grow px-4 py-3 border rounded-l-lg focus:outline-none"
                                        />
                                        <select className="border-t border-b border-r px-4 py-3 focus:outline-none">
                                            <option>All Categories</option>
                                            <option>Salon & Spa</option>
                                            <option>Medical</option>
                                            <option>Fitness</option>
                                        </select>
                                        <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-all">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {businesses.map(business => (
                                        <div key={business.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
                                            <div className="h-40 bg-gray-100 flex items-center justify-center">
                                                {getBusinessIcon(business.icon)}
                                            </div>
                                            <div className="p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h3 className="font-bold text-lg">{business.name}</h3>
                                                    <div className="flex text-yellow-400">
                                                        {[...Array(5)].map((_, i) => (
                                                            <FaStar
                                                                key={i}
                                                                className={i < Math.floor(business.rating) ? "text-yellow-400" : "text-gray-300"}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                                <p className="text-gray-600 mb-3">{business.description}</p>
                                                <div className="flex items-center text-gray-500 mb-4">
                                                    <FaMapMarkerAlt className="mr-2" />
                                                    <span>{business.distance}</span>
                                                </div>
                                                <button
                                                    onClick={() => handleBookAppointment(business)}
                                                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                                                >
                                                    Book Appointment
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'appointments' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">All Appointments</h2>
                            {/* Aquí iría la lista completa de citas */}
                        </div>
                    )}

                    {activeTab === 'favorites' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Favorite Businesses</h2>
                            {/* Aquí irían los negocios favoritos */}
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                            {/* Aquí iría el formulario de configuración */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;