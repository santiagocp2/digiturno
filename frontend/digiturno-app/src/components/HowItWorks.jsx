import '../App.css';

const HowItWorks = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-search text-blue-600 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Find a Business</h3>
                        <p className="text-gray-600">Search our directory of local businesses and professionals offering appointment services.</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-calendar-check text-green-600 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Book an Appointment</h3>
                        <p className="text-gray-600">Select your preferred date and time from the available slots and book instantly.</p>
                    </div>
                    <div className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i className="fas fa-check-circle text-purple-600 text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Get Confirmation</h3>
                        <p className="text-gray-600">Receive instant confirmation and reminders for your scheduled appointment.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;