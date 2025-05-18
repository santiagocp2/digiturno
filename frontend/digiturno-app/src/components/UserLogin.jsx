import '../App.css';

const UserLogin = () => {

    return (
        <div>
            {/*< !--User Login Modal-- > */}
            <div id="userLoginModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">User Login</h3>
                            <button id="closeUserLogin" className="text-gray-500 hover:text-gray-700">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <form id="userLoginForm">
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" for="userEmail">Email</label>
                                {/* <input type="email" id="userEmail" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required> */}
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2" for="userPassword">Password</label>
                                {/* <input type="password" id="userPassword" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required> */}
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all mb-4">
                                Login
                            </button>
                            <div className="text-center">
                                <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
                                <p className="mt-2 text-gray-600">Don't have an account? <a href="#" id="showUserRegister" className="text-blue-600 hover:underline">Register here</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <!--User Registration Modal-- > */}
            <div id="userRegisterModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                    <div className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-gray-800">User Registration</h3>
                            <button id="closeUserRegister" className="text-gray-500 hover:text-gray-700">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <form id="userRegisterForm">
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" for="regUserName">Full Name</label>
                                {/* <input type="text" id="regUserName" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required> */}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" for="regUserEmail">Email</label>
                                {/* <input type="email" id="regUserEmail" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required> */}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" for="regUserPhone">Phone Number</label>
                                {/* <input type="tel" id="regUserPhone" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required> */}
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" for="regUserPassword">Password</label>
                                {/* <input type="password" id="regUserPassword" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required> */}
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2" for="regUserConfirmPassword">Confirm Password</label>
                                {/* <input type="password" id="regUserConfirmPassword" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required> */}
                            </div>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all mb-4">
                                Register
                            </button>
                            <div className="text-center">
                                <p className="text-gray-600">Already have an account? <a href="#" id="showUserLoginFromReg" className="text-blue-600 hover:underline">Login here</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserLogin;