import '../App.css';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 flex items-center">
                            <i className="fas fa-calendar-alt mr-2"></i> ScheduleEase
                        </h3>
                        <p className="text-gray-400">Simplifying appointment scheduling for businesses and customers alike.</p>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">Home</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">Businesses</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">Contact</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Support</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">FAQs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-all">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center">
                                <i className="fas fa-map-marker-alt mr-2"></i> 123 Business Ave, Suite 100
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-phone mr-2"></i> (555) 123-4567
                            </li>
                            <li className="flex items-center">
                                <i className="fas fa-envelope mr-2"></i> support@scheduleease.com
                            </li>
                        </ul>
                        <div className="flex space-x-4 mt-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition-all">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-400 transition-all">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-all">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-all">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2023 ScheduleEase. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;