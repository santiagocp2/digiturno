import { createContext, useState } from 'react';

export const AuthContext = createContext(
    {
        IsAuth: false,
        API_URL: '',
        user: null,
        business: null,
        typeUser: null,
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
    const [typeUser, setTypeUser] = useState(null);
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
        setIsAuth(false);
        setTypeUser(null);
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
                        idTipoUsuario: (type === 'user' ? 1 : 2)
                    }
                )
            });
            if (response.status === 201 || response.ok) {
                const data_user = await response.json();
                if (type === 'user') {
                    setUser({
                        id: data_user.idUsuario,
                        name: data_user.nombre,
                        lastname: data_user.apellido,
                        phone: data_user.telefono,
                        address: data_user.direccion,
                        email: data_user.correo,
                        role: data_user.idTipoUsuario
                    });
                } else if (type === 'business') {
                    setBusiness({
                        id: data_user.idUsuario,
                        name: data_user.nombre,
                        lastname: data_user.apellido,
                        phone: data_user.telefono,
                        address: data_user.direccion,
                        email: data_user.correo,
                        role: data_user.idTipoUsuario
                    });
                }
                setTypeUser(data_user.idTipoUsuario);
            } else {
                console.log('Error en el registro:', response);
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
                const data_user = data_response.data.user;
                const idTipo = data_user.idTipoUsuario; // Assuming the response contains user type
                if (idTipo === 1) {
                    setUser({
                        id: data_user.idUsuario,
                        name: data_user.nombre,
                        lastname: data_user.apellido,
                        phone: data_user.telefono,
                        address: data_user.direccion,
                        email: data_user.correo,
                        role: idTipo
                    });
                } else if (idTipo === 2) {
                    setBusiness({
                        id: data_user.idUsuario,
                        name: data_user.nombre,
                        lastname: data_user.apellido,
                        phone: data_user.telefono,
                        address: data_user.direccion,
                        email: data_user.correo,
                        role: idTipo
                    });
                }
                setTypeUser(idTipo);
                setToken(data_response.data.token);
                await setIsAuth(true);
            } else {
                console.log('Error en el inicio de sesión:', response.statusText);
            }
        } catch (error) {
            console.log(error);
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
