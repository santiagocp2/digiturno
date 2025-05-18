import '../App.css';

// <!-- User Dashboard (hidden by default) -->
const UserDashboard = () => {

    return (
        <div id="userDashboard">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* <!-- Sidebar --> */}
                    <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-8">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                JS
                            </div>
                            <div className="ml-3">
                                <h3 className="font-bold">John Smith</h3>
                                <p className="text-sm text-gray-500">Premium Member</p>
                            </div>
                        </div>
                        <nav>
                            <a href="#" className="block py-3 px-4 bg-blue-50 text-blue-600 rounded-lg mb-2 font-medium">
                                <i className="fas fa-tachometer-alt mr-2"></i>Dashboard
                            </a>
                            <a href="#" className="block py-3 px-4 hover:bg-gray-100 rounded-lg mb-2">
                                <i className="fas fa-calendar mr-2"></i>My Appointments
                            </a>
                            <a href="#" className="block py-3 px-4 hover:bg-gray-100 rounded-lg mb-2">
                                <i className="fas fa-heart mr-2"></i>Favorites
                            </a>
                            <a href="#" className="block py-3 px-4 hover:bg-gray-100 rounded-lg mb-2">
                                <i className="fas fa-cog mr-2"></i>Settings
                            </a>
                            <a href="#" className="block py-3 px-4 hover:bg-gray-100 rounded-lg">
                                <i className="fas fa-sign-out-alt mr-2"></i>Logout
                            </a>
                        </nav>
                    </div>

                    {/* <!-- Main Content --> */}
                    <div className="flex-1">
                        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                                    <i className="fas fa-plus mr-2"></i>Book Appointment
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {/* <!-- Appointment Card 1 --> */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold">Elite Salon</h3>
                                            <p className="text-sm text-gray-500">Haircut & Styling</p>
                                        </div>
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Confirmed</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-3">
                                        <i className="fas fa-calendar-day mr-2"></i>
                                        <span>June 15, 2023</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <i className="fas fa-clock mr-2"></i>
                                        <span>10:00 AM - 11:00 AM</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-all">
                                            <i className="fas fa-edit mr-1"></i> Reschedule
                                        </button>
                                        <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-all">
                                            <i className="fas fa-times mr-1"></i> Cancel
                                        </button>
                                    </div>
                                </div>

                                {/* <!-- Appointment Card 2 --> */}
                                <div className="border rounded-lg p-4 hover:shadow-md transition-all">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="font-bold">City Medical</h3>
                                            <p className="text-sm text-gray-500">Annual Checkup</p>
                                        </div>
                                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-3">
                                        <i className="fas fa-calendar-day mr-2"></i>
                                        <span>June 18, 2023</span>
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-4">
                                        <i className="fas fa-clock mr-2"></i>
                                        <span>2:30 PM - 3:15 PM</span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-all">
                                            <i className="fas fa-edit mr-1"></i> Reschedule
                                        </button>
                                        <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-all">
                                            <i className="fas fa-times mr-1"></i> Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-2xl font-bold mb-6">Find Businesses</h2>

                            <div className="mb-6">
                                <div className="flex">
                                    {/* <input type="text" placeholder="Search for businesses..." className="flex-grow px-4 py-3 border rounded-l-lg focus:outline-none"> */}
                                    <select className="border-t border-b border-r px-4 py-3 focus:outline-none">
                                        <option>All Categories</option>
                                        <option>Salon & Spa</option>
                                        <option>Medical</option>
                                        <option>Fitness</option>
                                    </select>
                                    <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-all">
                                        <i className="fas fa-search"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* <!-- Business Card 1 --> */}
                                <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-all card-hover">
                                    <div className="h-40 bg-blue-100 flex items-center justify-center">
                                        <i className="fas fa-cut text-4xl text-blue-600"></i>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg">Elite Salon</h3>
                                            <div className="flex text-yellow-400">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star-half-alt"></i>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-3">Professional hair styling and beauty services</p>
                                        <div className="flex items-center text-gray-500 mb-4">
                                            <i className="fas fa-map-marker-alt mr-2"></i>
                                            <span>1.2 miles away</span>
                                        </div>
                                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>

                                {/* <!-- Business Card 2 --> */}
                                <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-all card-hover">
                                    <div className="h-40 bg-green-100 flex items-center justify-center">
                                        <i className="fas fa-heartbeat text-4xl text-green-600"></i>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-lg">City Medical</h3>
                                            <div className="flex text-yellow-400">
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                                <i className="fas fa-star"></i>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 mb-3">Comprehensive healthcare services</p>
                                        <div className="flex items-center text-gray-500 mb-4">
                                            <i className="fas fa-map-marker-alt mr-2"></i>
                                            <span>2.5 miles away</span>
                                        </div>
                                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserDashboard;