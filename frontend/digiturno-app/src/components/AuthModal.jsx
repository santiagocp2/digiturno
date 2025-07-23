import '../App.css';
import { useState } from 'react';
import { FaTimes, FaUser, FaStore, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ type, show, onClose, onLogin, onRegisterSuccess }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [successRegister, setSuccessRegister] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        businessType: '',
        address: ''
    });

    const navigate = useNavigate();
    const { create_user, login_user, loginError } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleLoginUser = () => {
        setIsRegister(false);
        setSuccessRegister(false);
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (isRegister) {
            if (formData.password !== formData.confirmPassword) {
                alert("¡Las contraseñas no coinciden!");
                return;
            }

            const userData = type === 'user' ? {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                type: 'user',
            } : {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                address: formData.address,
                businessType: formData.businessType,
                type: 'business'
            };

            await create_user(userData);
            onRegisterSuccess(true);
            setSuccessRegister(true);
        } else {
            const success = await login_user({
                email: formData.email,
                password: formData.password
            });

            if (success) {
                onLogin();
                navigate('/dashboard');
            }
            // Si no fue exitoso, el modal se mantiene abierto y se muestra el error
        }
    };

    if (!show) return null;

    if (successRegister) {
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <FaTimes />
                    </button>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Registro exitoso</h3>
                    <p className="text-gray-600 mb-4">Gracias por registrarte. Ahora puedes iniciar sesión.</p>
                    <button
                        onClick={handleLoginUser}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
                    >
                        Iniciar sesión
                    </button>
                </div>
            </div>
        );
    }

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
                                    ? `Registro ${type === 'user' ? 'usuario' : 'negocio'}`
                                    : `Inicio de sesión ${type === 'user' ? 'usuario' : 'negocio'}`}
                            </h3>
                        </div>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                            <FaTimes />
                        </button>
                    </div>

                    {/* Mostrar error de login */}
                    {!isRegister && loginError && (
                        <div className="mb-4 text-red-600 bg-red-100 border border-red-300 p-2 rounded">
                            {loginError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isRegister && (
                            <>
                                <div>
                                    <label className="block text-gray-700 mb-2">
                                        {type === 'user' ? 'Nombre completo' : 'Nombre del negocio'}
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
                                            <label className="block text-gray-700 mb-2">Tipo de negocio</label>
                                            <select
                                                name="businessType"
                                                value={formData.businessType}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            >
                                                <option value="">Seleccionar tipo de negocio</option>
                                                <option value="salon">Salon & Spa</option>
                                                <option value="medical">Medical</option>
                                                <option value="fitness">Fitness</option>
                                                <option value="consulting">Consulting</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-700 mb-2">Dirección</label>
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
                            <label className="block text-gray-700 mb-2">Correo electrónico</label>
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
                                <label className="block text-gray-700 mb-2">Número de celular</label>
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
                            <label className="block text-gray-700 mb-2">Contraseña</label>
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
                                <label className="block text-gray-700 mb-2">Confirmar contraseña</label>
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
                            {isRegister ? 'Registrarme' : 'Entrar'}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => setIsRegister(!isRegister)}
                                className="text-blue-600 hover:underline"
                            >
                                {isRegister
                                    ? '¿Ya tienes una cuenta? Inicia sesión'
                                    : `¿No tienes una cuenta? Regístrate como ${type === 'user' ? 'usuario' : 'negocio'}`}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
