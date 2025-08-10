import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
    IsAuth: false,
    API_URL: '',
    user: null,
    business: null,
    typeUser: null,
    loading: false,
    loginError: '',
    isInitialized: false,
    showLoading() { },
    hideLoading() { },
    handleLogout() { },
    create_user: (data) => { },
    login_user: (data) => { }
});

export const AuthProvider = ({ children }) => {
    const [IsAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [business, setBusiness] = useState(null);
    const [typeUser, setTypeUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loginError, setLoginError] = useState('');
    const [loadingCount, setLoadingCount] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false); // ✅ nuevo

    const API_URL = import.meta.env.VITE_API_URL;
    const loading = loadingCount > 0;

    const showLoading = () => setLoadingCount(prev => prev + 1);
    const hideLoading = () => setLoadingCount(prev => Math.max(0, prev - 1));

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedType = localStorage.getItem('typeUser');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedType && storedToken) {
            const parsedUser = JSON.parse(storedUser);
            setToken(storedToken);
            setTypeUser(Number(storedType));
            setIsAuth(true);

            if (Number(storedType) === 1) {
                setUser(parsedUser);
            } else if (Number(storedType) === 2) {
                setBusiness(parsedUser);
            }
        }

        // ✅ aseguramos que isInitialized se active siempre
        setIsInitialized(true);
    }, []);

    const handleLogout = () => {
        setUser(null);
        setBusiness(null);
        setIsAuth(false);
        setTypeUser(null);
        setToken(null);
        setLoginError('');

        localStorage.removeItem('user');
        localStorage.removeItem('typeUser');
        localStorage.removeItem('token');
    };

    async function create_user(data) {
        const { name, email, password, type, phone, address, businessType, description, urlImagen, horaInicio, horaFin, duracionCita } = data;
        try {
            showLoading();
            
            if (type === 'user') {
                // Registro de usuario normal
                const response = await fetch(`${API_URL}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    },
                    body: JSON.stringify({
                        targetMethod: 'POST',
                        body: {
                            nombre: name,
                            apellido: '',
                            correo: email,
                            contrasena: password,
                            telefono: phone,
                            direccion: address,
                            rolId: 1
                        }
                    })
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    console.log('Usuario registrado exitosamente:', result.data);
                    return { success: true, message: 'Usuario registrado exitosamente', data: result.data };
                } else {
                    console.log('Error en el registro:', result);
                    return { success: false, message: result.message || 'Error en el registro' };
                }
            } else {
                // Registro de usuario tipo negocio
                // Primero crear el usuario
                const userResponse = await fetch(`${API_URL}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    },
                    body: JSON.stringify({
                        targetMethod: 'POST',
                        body: {
                            nombre: name,
                            apellido: '',
                            correo: email,
                            contrasena: password,
                            telefono: phone,
                            direccion: address,
                            rolId: 2
                        }
                    })
                });

                const userResult = await userResponse.json();

                if (userResponse.ok && userResult.success) {
                    // Si el usuario se creó exitosamente, crear el negocio
                    const businessResponse = await fetch(`${API_URL}/negocio`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': '*/*'
                        },
                        body: JSON.stringify({
                            targetMethod: 'POST',
                            body: {
                                idUsuario: userResult.data.idUsuario,
                                nombre: name,
                                direccion: address,
                                idCategoria: parseInt(businessType),
                                descripcion: description || `Negocio de categoría ${businessType}`,
                                urlImagen: urlImagen || '',
                                horaInicio: horaInicio || '09:00',
                                horaFin: horaFin || '18:00',
                                duracionCita: duracionCita || 60
                            }
                        })
                    });

                    const businessResult = await businessResponse.json();

                    if (businessResponse.ok && businessResult.success) {
                        console.log('Negocio registrado exitosamente:', businessResult.data);
                        return { success: true, message: 'Negocio registrado exitosamente', data: businessResult.data };
                    } else {
                        console.log('Error al registrar el negocio:', businessResult);
                        return { success: false, message: businessResult.message || 'Error al registrar el negocio' };
                    }
                } else {
                    console.log('Error al registrar el usuario:', userResult);
                    return { success: false, message: userResult.message || 'Error al registrar el usuario' };
                }
            }
        } catch (error) {
            console.log('Error en create_user:', error);
            return { success: false, message: 'Error de conexión con el servidor' };
        } finally {
            hideLoading();
        }
    }

    async function login_user(data) {
        const { email, password } = data;
        try {
            showLoading();
            setLoginError('');

            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                },
                body: JSON.stringify({
                    targetMethod: 'POST',
                    body: {
                        correo: email,
                        contrasena: password
                    }
                })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                const data_user = result.data.user;
                const idTipo = data_user.rolId;

                const userObj = {
                    id: data_user.idUsuario,
                    name: data_user.nombre,
                    email: data_user.correo,
                    role: idTipo
                };

                // ✅ guardar en localStorage
                localStorage.setItem('user', JSON.stringify(userObj));
                localStorage.setItem('typeUser', idTipo);
                localStorage.setItem('token', result.data.token);

                if (idTipo === 1) {
                    setUser(userObj);
                } else if (idTipo === 2) {
                    setBusiness(userObj);
                }

                setTypeUser(idTipo);
                setToken(result.data.token);
                setIsAuth(true);
                return true;
            } else {
                setLoginError(result.message || 'Error desconocido');
                return false;
            }
        } catch (error) {
            console.log('Error en login_user:', error);
            setLoginError('Error de conexión con el servidor');
            return false;
        } finally {
            hideLoading();
        }
    }

    return (
        <AuthContext.Provider value={{
            IsAuth,
            user,
            business,
            typeUser,
            loading,
            loginError,
            isInitialized, // ✅ incluido
            showLoading,
            hideLoading,
            handleLogout,
            create_user,
            login_user
        }}>
            {children}
        </AuthContext.Provider>
    );
};

