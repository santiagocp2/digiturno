import '../App.css';
import { FaSearch, FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';

const HowItWorks = () => {
    const steps = [
        {
            icon: <FaSearch className="text-blue-600 text-2xl" />,
            title: "Find a Business",
            description: "Search our directory of local businesses and professionals offering appointment services."
        },
        {
            icon: <FaCalendarCheck className="text-green-600 text-2xl" />,
            title: "Book an Appointment",
            description: "Select your preferred date and time from the available slots and book instantly."
        },
        {
            icon: <FaCheckCircle className="text-purple-600 text-2xl" />,
            title: "Get Confirmation",
            description: "Receive instant confirmation and reminders for your scheduled appointment."
        }
    ];

    return (
        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="text-center p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;