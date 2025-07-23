import '../App.css';
import {
    FaCut, FaHeartbeat, FaDumbbell, FaTooth,
    FaStar, FaStarHalfAlt
} from 'react-icons/fa';

const BusinessCard = ({ business }) => {
    const getIcon = () => {
        switch (business.icon) {
            case 'cut': return <FaCut className="text-5xl text-blue-600" />;
            case 'heartbeat': return <FaHeartbeat className="text-5xl text-green-600" />;
            case 'dumbbell': return <FaDumbbell className="text-5xl text-purple-600" />;
            case 'tooth': return <FaTooth className="text-5xl text-yellow-600" />;
            default: return <FaCut className="text-5xl text-blue-600" />;
        }
    };

    const renderRating = () => {
        const rating = parseFloat(business.rating || 0);
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        }

        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
        }

        return stars;
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:transform hover:-translate-y-1 hover:shadow-lg">
            <div className="h-48 bg-gray-100 flex items-center justify-center">
                {getIcon()}
            </div>
            <div className="p-6 flex flex-col justify-between h-full">
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <h3 className="text-xl font-bold text-blue-800">{business.nombre}</h3>
                        {business.categoria && (
                            <p className="text-sm text-gray-500">{business.categoria}</p>
                        )}
                    </div>
                    <div className="flex">
                        {renderRating()}
                    </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm">
                    {business.descripcion || 'Este negocio aún no tiene descripción.'}
                </p>

                <p className="text-gray-500 text-sm mb-4">
                    <strong>Dirección:</strong> {business.direccion || 'No disponible'}
                </p>

                <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-gray-400">
                        {business.distance || 'Cercano a ti'}
                    </span>
                    <a
                        href={`/turnos/${business.idNegocio}`}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm"
                        aria-label="Agendar turno"
                    >
                        Agendar turno
                    </a>
                </div>
            </div>
        </div>
    );
};

export default BusinessCard;
