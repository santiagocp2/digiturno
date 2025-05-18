import '../App.css';
import { FaSearch } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="gradient-bg text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Reserva citas sin esfuerzo</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Encuentra los mejores negocios y agenda citas con solo unos clics.
        </p>
        
        <div className="max-w-md mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="p-4">
            <div className="flex">
              <input
                type="text"
                placeholder="Buscar negocios..."
                className="flex-grow px-4 py-3 rounded-l-lg focus:outline-none text-gray-800"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-all">
                <FaSearch />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;