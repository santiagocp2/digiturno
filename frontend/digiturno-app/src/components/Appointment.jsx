import '../App.css';

//<!-- Appointment Booking Modal -->
const Appointment = () => {

    return (
        <div id="bookingModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-gray-800">Book Appointment</h3>
                        <button id="closeBookingModal" className="text-gray-500 hover:text-gray-700">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-1">
                            <h4 className="font-bold mb-3">Select Date</h4>
                            <div className="bg-white rounded-lg shadow-sm p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <i className="fas fa-chevron-left"></i>
                                    </button>
                                    <span className="font-medium">June 2023</span>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <i className="fas fa-chevron-right"></i>
                                    </button>
                                </div>
                                <div className="grid grid-cols-7 gap-2 text-center">
                                    <div className="text-gray-400 text-sm py-1">Sun</div>
                                    <div className="text-gray-400 text-sm py-1">Mon</div>
                                    <div className="text-gray-400 text-sm py-1">Tue</div>
                                    <div className="text-gray-400 text-sm py-1">Wed</div>
                                    <div className="text-gray-400 text-sm py-1">Thu</div>
                                    <div className="text-gray-400 text-sm py-1">Fri</div>
                                    <div className="text-gray-400 text-sm py-1">Sat</div>

                                    {/* <!-- Calendar days --> */}
                                    <div className="py-1 text-gray-400 disabled">28</div>
                                    <div className="py-1 text-gray-400 disabled">29</div>
                                    <div className="py-1 text-gray-400 disabled">30</div>
                                    <div className="py-1 text-gray-400 disabled">31</div>
                                    <div className="py-1 calendar-day">1</div>
                                    <div className="py-1 calendar-day">2</div>
                                    <div className="py-1 calendar-day">3</div>

                                    <div className="py-1 calendar-day">4</div>
                                    <div className="py-1 calendar-day">5</div>
                                    <div className="py-1 calendar-day">6</div>
                                    <div className="py-1 calendar-day">7</div>
                                    <div className="py-1 calendar-day">8</div>
                                    <div className="py-1 calendar-day">9</div>
                                    <div className="py-1 calendar-day">10</div>

                                    <div className="py-1 calendar-day">11</div>
                                    <div className="py-1 calendar-day">12</div>
                                    <div className="py-1 calendar-day selected-day">13</div>
                                    <div className="py-1 calendar-day">14</div>
                                    <div className="py-1 calendar-day">15</div>
                                    <div className="py-1 calendar-day">16</div>
                                    <div className="py-1 calendar-day">17</div>

                                    <div className="py-1 calendar-day">18</div>
                                    <div className="py-1 calendar-day">19</div>
                                    <div className="py-1 calendar-day">20</div>
                                    <div className="py-1 calendar-day">21</div>
                                    <div className="py-1 calendar-day">22</div>
                                    <div className="py-1 calendar-day">23</div>
                                    <div className="py-1 calendar-day">24</div>

                                    <div className="py-1 calendar-day">25</div>
                                    <div className="py-1 calendar-day">26</div>
                                    <div className="py-1 calendar-day">27</div>
                                    <div className="py-1 calendar-day">28</div>
                                    <div className="py-1 calendar-day">29</div>
                                    <div className="py-1 calendar-day">30</div>
                                    <div className="py-1 text-gray-400 disabled">1</div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2">
                            <h4 className="font-bold mb-3">Select Time</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                                <button className="bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition-all">
                                    9:00 AM
                                </button>
                                <button className="bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition-all">
                                    9:30 AM
                                </button>
                                <button className="bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition-all">
                                    10:00 AM
                                </button>
                                <button className="bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition-all">
                                    10:30 AM
                                </button>
                                <button className="bg-blue-600 text-white py-2 rounded-lg">
                                    11:00 AM
                                </button>
                                <button className="bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition-all">
                                    11:30 AM
                                </button>
                                <button className="bg-gray-100 text-gray-400 py-2 rounded-lg cursor-not-allowed">
                                    12:00 PM
                                </button>
                                <button className="bg-gray-100 text-gray-400 py-2 rounded-lg cursor-not-allowed">
                                    12:30 PM
                                </button>
                                <button className="bg-blue-100 text-blue-600 py-2 rounded-lg hover:bg-blue-200 transition-all">
                                    1:00 PM
                                </button>
                            </div>

                            <h4 className="font-bold mb-3">Select Service</h4>
                            <select className="w-full border rounded-lg px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Haircut</option>
                                <option>Beard Trim</option>
                                <option>Haircut & Beard Trim</option>
                                <option>Hair Coloring</option>
                                <option>Hair Styling</option>
                            </select>

                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Special Requests (Optional)</label>
                                <textarea className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500" rows="3" placeholder="Any special instructions or notes..."></textarea>
                            </div>

                            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all">
                                Confirm Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appointment;