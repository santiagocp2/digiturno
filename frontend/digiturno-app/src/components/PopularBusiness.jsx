import '../App.css';
import BusinessCard from './BusinessCard';

const PopularBusiness = () => {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Popular Businesses</h2>
                <BusinessCard />
                <div className="text-center mt-10">
                    <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all">
                        View All Businesses
                    </button>
                </div>
            </div>
        </section>
    );
}

export default PopularBusiness;