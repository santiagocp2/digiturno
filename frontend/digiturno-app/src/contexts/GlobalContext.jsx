import { createContext, useState } from 'react';

export const GlobalContext = createContext(
    {
        showModal: { user: false, business: false },
        handleUserAuth(isRegister) { },
        handleBusinessAuth(isRegister) { },
        handleLogin(type) { },
        handleCloseModal() { },
        handleUserSignup() { },
        handleBusinessSignup() { }
    });

export const GlobalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState({ user: false, business: false });

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
            handleCloseModal();
        }
    };

    const handleBusinessAuth = (isRegister) => {
        if (isRegister) {
            // Aquí normalmente enviarías los datos al backend
            setShowModal({ user: false, business: true }); // Cambiar a login
        } else {
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
