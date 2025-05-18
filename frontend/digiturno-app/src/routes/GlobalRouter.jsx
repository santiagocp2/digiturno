import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import Header from '../components/Header';
import Appointment from '../components/BookingModal';
import Dashboard from '../pages/Dashboard';

const Layout = ({ children }) => (
    <>
        <Header />
        {children}
    </>
)

function GlobalRouter() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/home" element={<Layout><Home /></Layout>} />
                <Route path="/appointment_user" element={<Layout><Dashboard handleViewChange={user}/></Layout>} />
                <Route path="/appointment_business" element={<Layout><Dashboard handleViewChange={user}/></Layout>} />
                <Route path="/booking" element={<Layout><Appointment /></Layout>} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default GlobalRouter;