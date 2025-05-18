import '../App.css';
import SearchBar from "../components/HeroSection";
import HowItWorks from '../components/HowItWorks';
import FeaturedComment from '../components/FeaturedComment';
import PopularBusiness from '../components/PopularBusinesses';
import GetSarted from '../components/CTA';

function Home() {

    return (
        <div>
            <SearchBar />
            <div id="mainContent">
                {/* <!-- Popular Businesses Section --> */}
                <PopularBusiness />

                {/* <!-- How It Works Section --> */}
                <HowItWorks />

                {/* <!-- Testimonials Section --> */}
                <FeaturedComment />

                {/* <!-- CTA Section --> */}
                <GetSarted />
            </div>
            <br />
        </div>
    );
}

export default Home;