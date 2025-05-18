import '../App.css';

const BusinessCard = ({ business }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* <!-- Business Card 1 --> */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all card-hover">
                <div className="h-48 bg-blue-100 flex items-center justify-center">
                    <i className="fas fa-cut text-5xl text-blue-600"></i>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">Elite Salon</h3>
                        <div className="flex text-yellow-400">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star-half-alt"></i>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-4">Professional hair styling and beauty services for men and women.</p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-500">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            <span>1.2 mi</span>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- Business Card 2 --> */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all card-hover">
                <div className="h-48 bg-green-100 flex items-center justify-center">
                    <i className="fas fa-heartbeat text-5xl text-green-600"></i>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">City Medical</h3>
                        <div className="flex text-yellow-400">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-4">Comprehensive healthcare services with expert physicians.</p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-500">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            <span>2.5 mi</span>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- Business Card 3 --> */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all card-hover">
                <div className="h-48 bg-purple-100 flex items-center justify-center">
                    <i className="fas fa-dumbbell text-5xl text-purple-600"></i>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">FitZone Gym</h3>
                        <div className="flex text-yellow-400">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-4">Personal training and fitness classes with certified trainers.</p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-500">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            <span>0.8 mi</span>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>

            {/* <!-- Business Card 4 --> */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all card-hover">
                <div className="h-48 bg-yellow-100 flex items-center justify-center">
                    <i className="fas fa-tooth text-5xl text-yellow-600"></i>
                </div>
                <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">Bright Smile Dental</h3>
                        <div className="flex text-yellow-400">
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="fas fa-star"></i>
                            <i className="far fa-star"></i>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-4">Dental care services including cleaning, whitening, and more.</p>
                    <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-500">
                            <i className="fas fa-map-marker-alt mr-2"></i>
                            <span>1.7 mi</span>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusinessCard;