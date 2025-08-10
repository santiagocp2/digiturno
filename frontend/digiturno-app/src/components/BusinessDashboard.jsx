import '../App.css';
import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import SideBar from './SideBar';
import TurnosList from './TurnosList';

const BusinessDashboard = ({ business }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [refreshTurnos, setRefreshTurnos] = useState(0);
    const [appointments, setAppointments] = useState([
        {
            id: 1,
            time: '10:00 AM',
            customer: 'John Smith',
            service: 'Haircut',
            status: 'confirmed'
        },
        {
            id: 2,
            time: '11:30 AM',
            customer: 'Sarah Johnson',
            service: 'Manicure',
            status: 'pending'
        },
        {
            id: 3,
            time: '2:00 PM',
            customer: 'Michael Brown',
            service: 'Beard Trim',
            status: 'cancelled'
        }
    ]);

    const [workingHours, setWorkingHours] = useState({
        start: '9:00 AM',
        end: '5:00 PM',
        duration: '30 minutos'
    });

    const [businessInfo, setBusinessInfo] = useState({
        name: 'Elite Salon',
        address: '123 Main St, City',
        phone: '(555) 123-4567'
    });

    const handleDeleteAppointment = (id) => {
        setAppointments(appointments.filter(appt => appt.id !== id));
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
                <SideBar data={business} type="business" activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="flex-1">
                    {activeTab === 'dashboard' && (
                        <>
                            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h2 className="text-2xl font-bold">Administrar turnos</h2>
                                    <button 
                                        onClick={() => setRefreshTurnos(prev => prev + 1)}
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                                    >
                                        <FaPlus className="mr-2" />Refrescar turnos
                                    </button>
                                </div>

                                <TurnosList 
                                    businessOwnerId={business?.id} 
                                    refreshTrigger={refreshTurnos}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-bold mb-4">Ajustes de horario</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-gray-700 mb-2">Horas de trabajo</label>
                                            <div className="flex items-center space-x-4">
                                                <select
                                                    value={workingHours.start}
                                                    onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
                                                    className="border rounded-lg px-3 py-2"
                                                >
                                                    <option>9:00 AM</option>
                                                    <option>10:00 AM</option>
                                                </select>
                                                <span>a</span>
                                                <select
                                                    value={workingHours.end}
                                                    onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
                                                    className="border rounded-lg px-3 py-2"
                                                >
                                                    <option>5:00 PM</option>
                                                    <option>6:00 PM</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Duracion del turno</label>
                                            <select
                                                value={workingHours.duration}
                                                onChange={(e) => setWorkingHours({ ...workingHours, duration: e.target.value })}
                                                className="w-full border rounded-lg px-3 py-2"
                                            >
                                                <option>30 minutos</option>
                                                <option>45 minutos</option>
                                                <option>60 minutos</option>
                                            </select>
                                        </div>
                                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
                                            Guardar
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-bold mb-4">Informacion del negocio</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-gray-700 mb-2">Nombre</label>
                                            <input
                                                type="text"
                                                value={businessInfo.name}
                                                onChange={(e) => setBusinessInfo({ ...businessInfo, name: e.target.value })}
                                                className="w-full border rounded-lg px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Direccion</label>
                                            <input
                                                type="text"
                                                value={businessInfo.address}
                                                onChange={(e) => setBusinessInfo({ ...businessInfo, address: e.target.value })}
                                                className="w-full border rounded-lg px-3 py-2"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Celular</label>
                                            <input
                                                type="text"
                                                value={businessInfo.phone}
                                                onChange={(e) => setBusinessInfo({ ...businessInfo, phone: e.target.value })}
                                                className="w-full border rounded-lg px-3 py-2"
                                            />
                                        </div>
                                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
                                            Actualizar informacion
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'appointments' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Todos los turnos</h2>
                            {/* Aquí iría la lista completa de turnos */}
                        </div>
                    )}

                    {activeTab === 'customers' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Administrar clientes</h2>
                            {/* Aquí iría la gestión de clientes */}
                        </div>
                    )}

                    {activeTab === 'analytics' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Reportes</h2>
                            {/* Aquí irían los gráficos y estadísticas */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BusinessDashboard;
