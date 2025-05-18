import '../App.css';
import { FaCut, FaHeartbeat, FaDumbbell, FaTooth, FaStar, FaStarHalfAlt } from 'react-icons/fa';

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
        const stars = [];
        const fullStars = Math.floor(business.rating);
        const hasHalfStar = business.rating % 1 !== 0;

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
            <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{business.name}</h3>
                    <div className="flex">
                        {renderRating()}
                    </div>
                </div>
                <p className="text-gray-600 mb-4">{business.description}</p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500">
                        <span>{business.distance}</span>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                        Book Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BusinessCard;