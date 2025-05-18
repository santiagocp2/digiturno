import '../App.css';

const BusinessLogin = () => {

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl shadow-lg bg-white">
                <h1 className="text-2xl font-semibold text-center">Business Login</h1>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input type="password" id="password" required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500" />
                    </div>
                    <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">Login</button>
                </form>
            </div>
        </div>
    );
}

export default BusinessLogin;