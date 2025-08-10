import '../App.css';
import BusinessCard from './BusinessCard';

const PopularBusinesses = () => {
    const businesses = [
        {
            id: 1,
            name: "Elite Salon",
            description: "Professional hair styling and beauty services for men and women.",
            category: "Salon & Spa",
            distance: "1.2 mi",
            rating: 4.5,
            icon: "cut"
        },
        {
            id: 2,
            name: "City Medical",
            description: "Comprehensive healthcare services with expert physicians.",
            category: "Medical",
            distance: "2.5 mi",
            rating: 5,
            icon: "heartbeat"
        },
        {
            id: 3,
            name: "FitZone Gym",
            description: "Personal training and fitness classes with certified trainers.",
            category: "Fitness",
            distance: "0.8 mi",
            rating: 4,
            icon: "dumbbell"
        },
        {
            id: 4,
            name: "Bright Smile Dental",
            description: "Dental care services including cleaning, whitening, and more.",
            category: "Dental",
            distance: "1.7 mi",
            rating: 4,
            icon: "tooth"
        }
    ];

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Negocios populares</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {businesses.map(business => (
                        <BusinessCard key={business.id} business={business} />
                    ))}
                </div>
                <div className="text-center mt-10">
                    <button className="bg-white text-blue-600 border border-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-all">
                        Ver todos los negocios
                    </button>
                </div>
            </div>
        </section>
    );
};

export default PopularBusinesses;
