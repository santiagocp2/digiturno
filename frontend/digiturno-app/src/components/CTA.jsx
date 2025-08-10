import '../App.css';

const CTA = ({ onUserSignup, onBusinessSignup }) => {
  return (
    <section className="py-16 gradient-bg text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">¿Estas listo para empezar?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Únase a los usuarios y empresas que ya están simplificando su proceso de programación.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={onUserSignup}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-all"
          >
            Registrarse como usuario
          </button>
          <button
            onClick={onBusinessSignup}
            className="bg-blue-800 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-900 transition-all"
          >
            Registrarse como negocio
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
