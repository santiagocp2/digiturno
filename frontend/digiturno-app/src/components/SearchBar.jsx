import '../App.css';

const SearchBar = () => {

    return (
        <section className="gradient-bg text-white py-16">
            <div className="container mx-auto px-4 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Book Appointments Effortlessly</h1>
                <p className="text-xl mb-8 max-w-2xl mx-auto">Find the best local businesses and schedule appointments with just a few clicks.</p>
                <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
                    <div className="p-4">
                        <div className="flex">
                            {/* <input type="text" placeholder="Search for businesses..." className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-gray-800"> */}
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-all">
                                <i className="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default SearchBar;