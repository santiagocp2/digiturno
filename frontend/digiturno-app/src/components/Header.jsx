import '../App.css';

const Header = () => {
    return (
        <header className="header">
            <nav className="gradient-bg text-white shadow-lg">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-calendar-alt text-2xl"></i>
                        <span className="text-xl font-bold">ScheduleEase</span>
                    </div>
                    <div className="hidden md:flex space-x-6">
                        <a href="#" className="hover:text-blue-200 transition-all">Home</a>
                        <a href="#" className="hover:text-blue-200 transition-all">Businesses</a>
                        <a href="#" className="hover:text-blue-200 transition-all">About</a>
                        <a href="#" className="hover:text-blue-200 transition-all">Contact</a>
                    </div>
                    <div className="flex space-x-4">
                        <button id="userLoginBtn" className="bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-blue-50 transition-all">
                            <i className="fas fa-user mr-2"></i>User Login
                        </button>
                        <button id="businessLoginBtn" className="bg-blue-800 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-900 transition-all">
                            <i className="fas fa-store mr-2"></i>Business Login
                        </button>
                    </div>
                    <button id="mobileMenuBtn" className="md:hidden text-2xl">
                        <i className="fas fa-bars"></i>
                    </button>
                </div>

                <div id="mobileMenu" className="md:hidden hidden bg-blue-900 px-4 py-2">
                    <a href="#" className="block py-2 hover:text-blue-200">Home</a>
                    <a href="#" className="block py-2 hover:text-blue-200">Businesses</a>
                    <a href="#" className="block py-2 hover:text-blue-200">About</a>
                    <a href="#" className="block py-2 hover:text-blue-200">Contact</a>
                </div>
            </nav>
        </header>
    );
}

export default Header;