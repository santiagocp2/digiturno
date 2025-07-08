import { createContext, useState } from 'react';

export const GlobalContext = createContext(
    {
        showModal: { user: false, business: false },
        currentView: 'main',
        handleUserAuth(isRegister) { },
        handleBusinessAuth(isRegister) { },
        handleLogin(type) { },
        handleCloseModal() { },
        handleUserSignup() { },
        handleBusinessSignup() { }
    });

export const GlobalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState({ user: false, business: false });
    const [currentView, setCurrentView] = useState('main');

    const handleLogin = (type) => {
        setShowModal({ ...showModal, [type]: true });
    };

    const handleCloseModal = () => {
        setShowModal({ user: false, business: false });
    };

    const handleUserAuth = (isRegister) => {
        if (isRegister) {
            setShowModal({ user: true, business: false }); // Cambiar a login
        } else {
            setCurrentView('userDashboard');
            handleCloseModal();
        }
    };

    const handleBusinessAuth = (isRegister) => {
        if (isRegister) {
            // Aquí normalmente enviarías los datos al backend
            alert('Business registration successful! Please login.');
            setShowModal({ user: false, business: true }); // Cambiar a login
        } else {
            setCurrentView('businessDashboard');
            handleCloseModal();
        }
    };

    const handleUserSignup = () => {
        setShowModal({ user: true, business: false });
    };

    const handleBusinessSignup = () => {
        setShowModal({ user: false, business: true });
    };

    return (
        <GlobalContext.Provider value={
            {
                showModal,
                currentView,
                handleLogin,
                handleCloseModal,
                handleUserAuth,
                handleBusinessAuth,
                handleUserSignup,
                handleBusinessSignup
            }}>
            {children}
        </GlobalContext.Provider>
    );
};