import '../App.css';

const FeaturedComment = () => {
    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
                                JD
                            </div>
                            <div>
                                <h4 className="font-bold">John D.</h4>
                                <div className="flex text-yellow-400">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600">"ScheduleEase has completely transformed how I book appointments. I can find available slots instantly and get reminders so I never miss an appointment. Highly recommended!"</p>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-4">
                                SM
                            </div>
                            <div>
                                <h4 className="font-bold">Sarah M.</h4>
                                <div className="flex text-yellow-400">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star-half-alt"></i>
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600">"As a small business owner, ScheduleEase has helped me manage my appointments efficiently. The automated reminders have significantly reduced no-shows. Great platform!"</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FeaturedComment;