import { FaCut, FaHeartbeat, FaStar, FaMapMarkerAlt } from 'react-icons/fa';

const BusinessCard = ({ business, onBook }) => {
    const getBusinessIcon = (icon) => {
        switch (icon) {
            case 'cut': return <FaCut className="text-4xl text-blue-600" />;
            case 'heartbeat': return <FaHeartbeat className="text-4xl text-green-600" />;
            default: return <FaCut className="text-4xl text-blue-600" />;
        }
    };

    return (
        <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
            {business.urlImagen ? (
                <img
                    src={business.urlImagen}
                    alt={business.name}
                    className="h-40 w-full object-cover"
                />
            ) : (
                <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-500">
                    Sin imagen
                </div>
            )}

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg">{business.name}</h3>
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                className={i < Math.floor(business.rating || 0) ? "text-yellow-400" : "text-gray-300"}
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
                    onClick={() => onBook(business)}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                    Reservar turno
                </button>
            </div>
        </div>
    );
};

export default BusinessCard;
