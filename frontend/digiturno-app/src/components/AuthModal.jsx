import '../App.css';
import { useState, useEffect } from 'react';
import { FaTimes, FaUser, FaStore, FaArrowLeft } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const AuthModal = ({ type, show, onClose, onLogin, onRegisterSuccess }) => {
    const [isRegister, setIsRegister] = useState(false);
    const [successRegister, setSuccessRegister] = useState(false);
    const [registerError, setRegisterError] = useState('');
    const [categorias, setCategorias] = useState([]);
    const [loadingCategorias, setLoadingCategorias] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        businessType: '',
        address: '',
        description: '',
        urlImagen: '',
        horaInicio: '09:00',
        horaFin: '18:00',
        duracionCita: '60'
    });

    const navigate = useNavigate();
    const { create_user, login_user, loginError } = useAuth();

    // Cargar categorías cuando se abre el modal de registro de negocio
    useEffect(() => {
        const loadCategorias = async () => {
            if (show && isRegister && type === 'business') {
                setLoadingCategorias(true);
                try {
                    const API_URL = import.meta.env.VITE_API_URL;
                    const response = await fetch(`${API_URL}/negocio/categorias`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': '*/*'
                        },
                        body: JSON.stringify({
                            targetMethod: 'GET'
                        })
                    });

                    if (response.ok) {
                        const result = await response.json();
                        if (result.success) {
                            setCategorias(result.data);
                        }
                    }
                } catch (error) {
                    console.error('Error cargando categorías:', error);
                } finally {
                    setLoadingCategorias(false);
                }
            }
        };

        loadCategorias();
    }, [show, isRegister, type]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            businessType: '',
            address: '',
            description: '',
            urlImagen: '',
            horaInicio: '09:00',
            horaFin: '18:00',
            duracionCita: '60'
        });
        setRegisterError('');
    };

    const handleLoginUser = () => {
        setIsRegister(false);
        setSuccessRegister(false);
        setRegisterError('');
        resetForm();
    };

    async function handleSubmit(e) {
        e.preventDefault();

        if (isRegister) {
            if (formData.password !== formData.confirmPassword) {
                setRegisterError("¡Las contraseñas no coinciden!");
                return;
            }

            setRegisterError(''); // Limpiar errores previos

            const userData = type === 'user' ? {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                address: formData.address,
                type: 'user',
            } : {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                address: formData.address,
                businessType: formData.businessType,
                description: formData.description,
                urlImagen: formData.urlImagen,
                horaInicio: formData.horaInicio,
                horaFin: formData.horaFin,
                duracionCita: parseInt(formData.duracionCita),
                type: 'business'
            };

            const result = await create_user(userData);
            
            if (result.success) {
                onRegisterSuccess(true);
                setSuccessRegister(true);
            } else {
                setRegisterError(result.message || 'Error en el registro');
            }
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
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header fijo */}
                <div className="p-8 pb-4 border-b border-gray-200">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center">
                            {isRegister && (
                                <button
                                    onClick={() => setIsRegister(false)}
                                    className="mr-3 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                                >
                                    <FaArrowLeft />
                                </button>
                            )}
                            <div>
                                <h3 className="text-3xl font-bold text-gray-800">
                                    {isRegister
                                        ? `Registro ${type === 'user' ? 'Usuario' : 'Negocio'}`
                                        : `Iniciar Sesión`}
                                </h3>
                                <p className="text-gray-600 mt-1">
                                    {isRegister
                                        ? `Crea tu cuenta ${type === 'user' ? 'personal' : 'empresarial'}`
                                        : 'Accede a tu cuenta'}
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose} 
                            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* Mostrar errores */}
                    {!isRegister && loginError && (
                        <div className="mt-4 text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg">
                            <strong>Error:</strong> {loginError}
                        </div>
                    )}

                    {isRegister && registerError && (
                        <div className="mt-4 text-red-600 bg-red-50 border border-red-200 p-4 rounded-lg">
                            <strong>Error:</strong> {registerError}
                        </div>
                    )}
                </div>

                {/* Contenido con scroll */}
                <div className="flex-1 overflow-y-auto p-8 pt-6">

                    <form id="authForm" onSubmit={handleSubmit} className="space-y-6">
                        {isRegister && (
                            <>
                                {/* Información básica */}
                                <div className="bg-gray-50 p-6 rounded-lg">
                                    <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                        {type === 'user' ? <FaUser className="mr-2" /> : <FaStore className="mr-2" />}
                                        Información Básica
                                    </h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-gray-700 mb-2 font-medium">
                                                {type === 'user' ? 'Nombre completo' : 'Nombre del negocio'}
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder={type === 'user' ? 'Ej: Juan Pérez' : 'Ej: Salón Belleza Total'}
                                                required
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className="block text-gray-700 mb-2 font-medium">Correo electrónico</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="ejemplo@correo.com"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 mb-2 font-medium">Número de teléfono</label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="+57 300 123 4567"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 mb-2 font-medium">Dirección</label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Calle 123 #45-67, Ciudad"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {type === 'business' && (
                                    <>
                                        {/* Información del negocio */}
                                        <div className="bg-blue-50 p-6 rounded-lg">
                                            <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                                <FaStore className="mr-2" />
                                                Detalles del Negocio
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-gray-700 mb-2 font-medium">Tipo de negocio</label>
                                                    <select
                                                        name="businessType"
                                                        value={formData.businessType}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        required
                                                        disabled={loadingCategorias}
                                                    >
                                                        <option value="">
                                                            {loadingCategorias ? 'Cargando categorías...' : 'Seleccionar categoría'}
                                                        </option>
                                                        {categorias.map((categoria) => (
                                                            <option key={categoria.idCategoria} value={categoria.idCategoria}>
                                                                {categoria.nombre}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700 mb-2 font-medium">Duración de cita</label>
                                                    <select
                                                        name="duracionCita"
                                                        value={formData.duracionCita}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        required
                                                    >
                                                        <option value="">Seleccionar duración</option>
                                                        <option value="15">15 minutos</option>
                                                        <option value="30">30 minutos</option>
                                                        <option value="45">45 minutos</option>
                                                        <option value="60">1 hora</option>
                                                        <option value="90">1 hora 30 minutos</option>
                                                        <option value="120">2 horas</option>
                                                    </select>
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700 mb-2 font-medium">Hora de inicio</label>
                                                    <input
                                                        type="time"
                                                        name="horaInicio"
                                                        value={formData.horaInicio}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        required
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700 mb-2 font-medium">Hora de fin</label>
                                                    <input
                                                        type="time"
                                                        name="horaFin"
                                                        value={formData.horaFin}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        required
                                                    />
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label className="block text-gray-700 mb-2 font-medium">Descripción del negocio <span className="text-gray-500">(opcional)</span></label>
                                                    <textarea
                                                        name="description"
                                                        value={formData.description}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        rows="3"
                                                        placeholder="Describe brevemente tu negocio, servicios que ofreces, especialidades..."
                                                    />
                                                </div>

                                                <div className="md:col-span-2">
                                                    <label className="block text-gray-700 mb-2 font-medium">URL de imagen <span className="text-gray-500">(opcional)</span></label>
                                                    <input
                                                        type="url"
                                                        name="urlImagen"
                                                        value={formData.urlImagen}
                                                        onChange={handleChange}
                                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                        placeholder="https://ejemplo.com/imagen-del-negocio.jpg"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}

                        {/* Campos para inicio de sesión - diseño compacto */}
                        {!isRegister && (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    🔑 Acceso a tu cuenta
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2 font-medium">Correo electrónico</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="ejemplo@correo.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2 font-medium">Contraseña</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Tu contraseña"
                                            required
                                            minLength="6"
                                        />
                                    </div>
                                </div>
                                <div className="mt-4 text-center">
                                    <button
                                        type="button"
                                        className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition-all"
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </button>
                                </div>
                            </div>
                        )}

                        {isRegister && type === 'user' && (
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                    <FaUser className="mr-2" />
                                    Información de Contacto
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2 font-medium">Número de celular</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="+57 300 123 4567"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-700 mb-2 font-medium">Dirección</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Calle 123 #45-67, Ciudad"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Sección de seguridad - Solo para registro */}
                        {isRegister && (
                            <div className="bg-green-50 p-6 rounded-lg">
                                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                                    🔒 Seguridad
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-700 mb-2 font-medium">Contraseña</label>
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Mínimo 6 caracteres"
                                            required
                                            minLength="6"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 mb-2 font-medium">Confirmar contraseña</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="Repite la contraseña"
                                            required
                                            minLength="6"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}
                    </form>
                </div>

                {/* Footer fijo con botones */}
                <div className="p-8 pt-4 border-t border-gray-200 bg-white">
                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            form="authForm"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            {isRegister ? '✨ Crear mi cuenta' : '🚀 Iniciar sesión'}
                        </button>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => {
                                    const newIsRegister = !isRegister;
                                    setIsRegister(newIsRegister);
                                    resetForm();
                                }}
                                className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-all"
                            >
                                {isRegister
                                    ? '¿Ya tienes una cuenta? Inicia sesión aquí'
                                    : `¿No tienes una cuenta? Regístrate como ${type === 'user' ? 'usuario' : 'negocio'}`}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;

