import BusinessTurnosCanceladosAnalisis from './BusinessTurnosCanceladosAnalisis';
import '../App.css';
import { useState } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import SideBar from './SideBar';
import TurnosList from './TurnosList';
import BusinessTurnosList from './BusinessTurnosList';
import BusinessTablero from './BusinessTablero';
import BusinessClientesList from './BusinessClientesList';
import BusinessAjustes from './BusinessAjustes';

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
                            <BusinessTablero negocioId={business?.idNegocio || business?.id} />
                            <div className="mt-8">
                                <BusinessTurnosCanceladosAnalisis negocioId={business?.idNegocio || business?.id} />
                            </div>
                        </>
                    )}

                    {activeTab === 'appointments' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Todos los turnos</h2>
                            <BusinessTurnosList business={business} refreshTrigger={refreshTurnos} />
                        </div>
                    )}

                    {activeTab === 'customers' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Administrar clientes</h2>
                            <BusinessClientesList negocioId={business?.idNegocio || business?.id} />
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Ajustes del negocio</h2>
                            <BusinessAjustes business={business} />
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
