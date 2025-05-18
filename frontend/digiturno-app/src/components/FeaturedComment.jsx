import '../App.css';
import { FaStar, FaStarHalfAlt } from 'react-icons/fa';

const FeaturedComment = () => {
    const testimonials = [
        {
            initials: "JD",
            name: "John D.",
            rating: 5,
            comment: "ScheduleEase has completely transformed how I book appointments. I can find available slots instantly and get reminders so I never miss an appointment. Highly recommended!"
        },
        {
            initials: "SM",
            name: "Sarah M.",
            rating: 4.5,
            comment: "As a small business owner, ScheduleEase has helped me manage my appointments efficiently. The automated reminders have significantly reduced no-shows. Great platform!"
        }
    ];

    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
        }

        const remainingStars = 5 - stars.length;
        for (let i = 0; i < remainingStars; i++) {
            stars.push(<FaStar key={`empty-${i}`} className="text-gray-300" />);
        }

        return stars;
    };

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                                    {testimonial.initials}
                                </div>
                                <div>
                                    <h4 className="font-bold">{testimonial.name}</h4>
                                    <div className="flex">
                                        {renderRating(testimonial.rating)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-gray-600">"{testimonial.comment}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturedComment;