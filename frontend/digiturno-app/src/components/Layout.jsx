import { useGlobal } from '../hooks/useGlobal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AuthModal from '../components/AuthModal';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Layout = () => {

    const {
        showModal,
        handleLogin,
        handleCloseModal,
        handleUserAuth,
        handleBusinessAuth
    } = useGlobal();

    const { user, business, handleLogout } = useAuth();
    return (
        <>
            <Header
                onUserLogin={() => handleLogin('user')}
                onBusinessLogin={() => handleLogin('business')}
                user={user}
                business={business}
                onLogout={handleLogout}
            />
            <Outlet />
            <AuthModal
                type="user"
                show={showModal.user}
                onClose={handleCloseModal}
                onLogin={handleUserAuth}
                onRegisterSuccess={handleUserAuth}
            />

            <AuthModal
                type="business"
                show={showModal.business}
                onClose={handleCloseModal}
                onLogin={handleBusinessAuth}
                onRegisterSuccess={handleBusinessAuth}
            />
            <Footer />
        </>
    );
};
export default Layout;
