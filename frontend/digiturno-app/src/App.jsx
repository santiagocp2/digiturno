import './App.css';
import GlobalRouter from './routes/GlobalRouter';
import { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PopularBusinesses from './components/PopularBusinesses';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import BusinessDashboard from './components/BusinessDashboard';
import FeaturedComment from './components/FeaturedComment';
import CTA from './components/CTA';

function App() {
  const [showModal, setShowModal] = useState({ user: false, business: false });
  const [currentView, setCurrentView] = useState('main');
  const [user, setUser] = useState(null);
  const [business, setBusiness] = useState(null);

  const handleLogin = (type) => {
    setShowModal({ ...showModal, [type]: true });
  };

  const handleCloseModal = () => {
    setShowModal({ user: false, business: false });
  };

  const handleUserAuth = (userData, isRegister) => {
    if (isRegister) {
      console.log('User registered:', userData);
      // Aquí normalmente enviarías los datos al backend
      alert('Registration successful! Please login.');
      setShowModal({ user: true, business: false }); // Cambiar a login
    } else {
      setUser(userData);
      setCurrentView('userDashboard');
      handleCloseModal();
    }
  };

  const handleBusinessAuth = (businessData, isRegister) => {
    if (isRegister) {
      console.log('Business registered:', businessData);
      // Aquí normalmente enviarías los datos al backend
      alert('Business registration successful! Please login.');
      setShowModal({ user: false, business: true }); // Cambiar a login
    } else {
      setBusiness(businessData);
      setCurrentView('businessDashboard');
      handleCloseModal();
    }
  };

  const handleLogout = () => {
    setUser(null);
    setBusiness(null);
    setCurrentView('main');
  };

  const handleUserSignup = () => {
    setShowModal({ user: true, business: false });
  };

  const handleBusinessSignup = () => {
    setShowModal({ user: false, business: true });
  };
  return (
    <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
      <Header
        onUserLogin={() => handleLogin('user')}
        onBusinessLogin={() => handleLogin('business')}
        user={user}
        business={business}
        onLogout={handleLogout}
      />

      <main className="flex-grow">
        {currentView === 'main' && (
          <>
            <HeroSection />
            <PopularBusinesses />
            <HowItWorks />
            <FeaturedComment />
            <CTA
              onUserSignup={handleUserSignup}
              onBusinessSignup={handleBusinessSignup}
            />
          </>
        )}

        {currentView === 'userDashboard' && <UserDashboard user={user} />}
        {currentView === 'businessDashboard' && <BusinessDashboard business={business} />}
      </main>

      <Footer />

      <AuthModal
        type="user"
        show={showModal.user}
        onClose={handleCloseModal}
        onLogin={(data) => handleUserAuth(data, false)}
        onRegisterSuccess={(data) => handleUserAuth(data, true)}
      />

      <AuthModal
        type="business"
        show={showModal.business}
        onClose={handleCloseModal}
        onLogin={(data) => handleBusinessAuth(data, false)}
        onRegisterSuccess={(data) => handleBusinessAuth(data, true)}
      />
    </div>
  );
}

export default App;