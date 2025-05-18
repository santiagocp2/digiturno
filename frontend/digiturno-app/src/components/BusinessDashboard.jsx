import '../App.css';

// <!-- Business Dashboard (hidden by default) -->
const BusinessDashboard = () => {

    return (
        <div id="businessDashboard">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* <!-- Sidebar --> */}
                    <div className="w-full md:w-64 bg-white rounded-lg shadow-md p-4">
                        <div className="flex items-center mb-8">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                                BS
                            </div>
                            <div className="ml-3">
                                <h3 className="font-bold">Business Name</h3>
                                <p className="text-sm text-gray-500">Salon & Spa</p>
                            </div>
                        </div>
                        <nav>
                            <a href="#" className="block py-3 px-4 bg-blue-50 text-blue-600 rounded-lg mb-2 font-medium">
                                <i className="fas fa-tachometer-alt mr-2"></i>Dashboard
                            </a>
                            <a href="#" className="block py-3 px-4 hover:bg-gray-100 rounded-lg mb-2">
                                <i className="fas fa-calendar mr-2"></i>Appointments
                            </a>
                            <a href="#" className="block py-3 px-4 hover:bg-gray-100 rounded-lg mb-2">
                                <i className="fas fa-users mr-2"></i>Customers
                            </a>
                            <a href="#" className="block py-3 px-4 hover:bg-gray-100 rounded-lg mb-2">
                                <i className="fas fa-cog mr-2"></i>Settings
                            </a>
                            <a href="#" className="block py-3 px-4 hover:bg-gray-100 rounded-lg mb-2">
                                <i className="fas fa-chart-line mr-2"></i>Analytics
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
                                <h2 className="text-2xl font-bold">Today's Appointments</h2>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all">
                                    <i className="fas fa-plus mr-2"></i>Add Slot
                                </button>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-100 text-gray-600 text-left">
                                            <th className="p-3">Time</th>
                                            <th className="p-3">Customer</th>
                                            <th className="p-3">Service</th>
                                            <th className="p-3">Status</th>
                                            <th className="p-3">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b hover:bg-gray-50">
                                            <td className="p-3">10:00 AM</td>
                                            <td className="p-3">John Smith</td>
                                            <td className="p-3">Haircut</td>
                                            <td className="p-3">
                                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Confirmed</span>
                                            </td>
                                            <td className="p-3">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button className="text-red-600 hover:text-red-800">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50">
                                            <td className="p-3">11:30 AM</td>
                                            <td className="p-3">Sarah Johnson</td>
                                            <td className="p-3">Manicure</td>
                                            <td className="p-3">
                                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                                            </td>
                                            <td className="p-3">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button className="text-red-600 hover:text-red-800">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className="border-b hover:bg-gray-50">
                                            <td className="p-3">2:00 PM</td>
                                            <td className="p-3">Michael Brown</td>
                                            <td className="p-3">Beard Trim</td>
                                            <td className="p-3">
                                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Cancelled</span>
                                            </td>
                                            <td className="p-3">
                                                <button className="text-blue-600 hover:text-blue-800 mr-3">
                                                    <i className="fas fa-edit"></i>
                                                </button>
                                                <button className="text-red-600 hover:text-red-800">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-bold mb-4">Schedule Settings</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Working Hours</label>
                                        <div className="flex items-center space-x-4">
                                            <select className="border rounded-lg px-3 py-2">
                                                <option>9:00 AM</option>
                                                <option>10:00 AM</option>
                                            </select>
                                            <span>to</span>
                                            <select className="border rounded-lg px-3 py-2">
                                                <option>5:00 PM</option>
                                                <option>6:00 PM</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">Appointment Duration</label>
                                        <select className="w-full border rounded-lg px-3 py-2">
                                            <option>30 minutes</option>
                                            <option>45 minutes</option>
                                            <option>60 minutes</option>
                                        </select>
                                    </div>
                                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
                                        Save Changes
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-bold mb-4">Business Information</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2">Business Name</label>
                                        {/* <input type="text" className="w-full border rounded-lg px-3 py-2" value="Elite Salon"> */}
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">Address</label>
                                        {/* <input type="text" className="w-full border rounded-lg px-3 py-2" value="123 Main St, City"> */}
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2">Phone</label>
                                        {/* <input type="text" className="w-full border rounded-lg px-3 py-2" value="(555) 123-4567"> */}
                                    </div>
                                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all">
                                        Update Information
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BusinessDashboard;