import '../App.css';
// components/AuthModal.jsx
import { useState } from 'react';
import { FaTimes, FaUser, FaStore, FaArrowLeft } from 'react-icons/fa';

const AuthModal = ({ type, show, onClose, onLogin, onRegisterSuccess }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        businessType: '',
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isRegister) {
            // Validar registro
            if (formData.password !== formData.confirmPassword) {
                alert("Passwords don't match!");
                return;
            }

            const userData = type === 'user' ? {
                name: formData.name,
                email: formData.email,
                phone: formData.phone
            } : {
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                businessType: formData.businessType
            };

            onRegisterSuccess(userData);
        } else {
            // Procesar login
            onLogin({
                email: formData.email,
                name: formData.email.split('@')[0] // Simulación
            });
        }
    };

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
                <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            {isRegister && (
                                <button
                                    onClick={() => setIsRegister(false)}
                                    className="mr-2 text-gray-500 hover:text-gray-700"
                                >
                                    <FaArrowLeft />
                                </button>
                            )}
                            <h3 className="text-2xl font-bold text-gray-800">
                                {isRegister
                                    ? `Register as ${type === 'user' ? 'User' : 'Business'}`
                                    : `${type === 'user' ? 'User' : 'Business'} Login`}
                            </h3>
                        </div>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isRegister && (
                            <>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        {type === 'user' ? 'Full Name' : 'Business Name'}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    />
                                </div>

                                {type === 'business' && (
                                    <>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Business Type</label>
                                            <select
                                                name="businessType"
                                                value={formData.businessType}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            >
                                                <option value="">Select business type</option>
                                                <option value="salon">Salon & Spa</option>
                                                <option value="medical">Medical</option>
                                                <option value="fitness">Fitness</option>
                                                <option value="consulting">Consulting</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Address</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        <div>
                            <label className="block text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        {isRegister && type === 'user' && (
                            <div>
                                <label className="block text-gray-700 mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                                minLength="6"
                            />
                        </div>

                        {isRegister && (
                            <div>
                                <label className="block text-gray-700 mb-2">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    minLength="6"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
                        >
                            {isRegister ? 'Register' : 'Login'}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setIsRegister(!isRegister)}
                                className="text-blue-600 hover:underline"
                            >
                                {isRegister
                                    ? 'Already have an account? Login here'
                                    : `Don't have an account? Register as ${type === 'user' ? 'User' : 'Business'}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;