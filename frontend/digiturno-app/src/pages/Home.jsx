import '../App.css';
import HeroSection from '../components/HeroSection';
import PopularBusinesses from '../components/PopularBusinesses';
import HowItWorks from '../components/HowItWorks';
import FeaturedComment from '../components/FeaturedComment';
import CTA from '../components/CTA';
import { useGlobal } from '../hooks/useGlobal';

function Home() {
    const { handleUserSignup, handleBusinessSignup } = useGlobal();
    return (
        <div className="bg-gray-50 font-sans min-h-screen flex flex-col">
            <main className="flex-grow">
                <HeroSection />
                <PopularBusinesses />
                <HowItWorks />
                <FeaturedComment />
                <CTA
                    onUserSignup={handleUserSignup}
                    onBusinessSignup={handleBusinessSignup}
                />

            </main>
        </div>
    );
}

export default Home;