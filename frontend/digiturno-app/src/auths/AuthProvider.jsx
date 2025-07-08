import { createContext, useState } from 'react';

export const AuthContext = createContext(
    {
        IsAuth: false,
        API_URL: '',
        user: null,
        business: null,
        loading: false,
        showLoading() { },
        hideLoading() { },
        handleLogout() { },
        create_user: (data) => { },
        login_user: (data) => { }
    }
);

export const AuthProvider = ({ children }) => {
    const [IsAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState(null);
    const [business, setBusiness] = useState(null);
    const [token, setToken] = useState(null);
    // Import the API URL from environment variables
    const API_URL = import.meta.env.VITE_API_URL;

    const [loadingCount, setLoadingCount] = useState(0);
    const loading = loadingCount > 0;
    const showLoading = () => setLoadingCount(prev => prev + 1);
    const hideLoading = () => setLoadingCount(prev => Math.max(0, prev - 1));

    const handleLogout = () => {
        setUser(null);
        setBusiness(null);
    };

    async function create_user(data) {
        const { name, email, password, type, phone, address } = data;
        try {
            showLoading();
            const response = await fetch(`${API_URL}/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                },
                body: JSON.stringify(
                    {
                        nombre: name,
                        apellido: '',
                        correo: email,
                        contrasena: password,
                        telefono: phone,
                        direccion: address,
                        rol: (type === 'user' ? 'CLIENTE' : 'NEGOCIO')
                    }
                )
            });
            if (response.ok) {
                console.log('Registro exitoso');
                const data_response = await response.json();
                if (type === 'user') {
                    setUser({
                        id: data_response.id,
                        name: data_response.nombre,
                        email: data_response.correo,
                        role: data_response.rol
                    });
                } else {
                    setBusiness({
                        id: data_response.id,
                        name: data_response.nombre,
                        email: data_response.correo,
                        role: data_response.rol
                    });
                }
            } else {
                console.log('Error en el registro:', response.statusText);
            }
        } catch (error) {
            console.log(error);
        } finally {
            hideLoading();
        }
    }

    async function login_user(data) {
        const { email, password } = data;
        try {
            showLoading();
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                },
                body: JSON.stringify(
                    {
                        correo: email,
                        contrasena: password
                    }
                )
            });
            if (response.ok) {
                const data_response = await response.json();
                setToken(data_response.token);
                console.log('Inicio de sesión exitoso: ', data_response);
            } else {
                console.log('Error en el inicio de sesión:', response.statusText);
            }
        } catch (error) {
            console.log(error);
        } finally {
            hideLoading();
            setIsAuth(true);
        }
    }
    return (
        <AuthContext.Provider value={{
            IsAuth,
            user,
            business,
            loading,
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
