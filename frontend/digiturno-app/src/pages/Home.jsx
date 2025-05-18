import '../App.css';
import SearchBar from "../components/SearchBar";
import HowItWorks from '../components/HowItWorks';
import FeaturedComment from '../components/FeaturedComment';
import PopularBusiness from '../components/PopularBusiness';
import GetSarted from '../components/GetStarted';

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