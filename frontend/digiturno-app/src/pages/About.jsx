import { 
    FaUsers, 
    FaRocket, 
    FaHeart, 
    FaAward,
    FaCalendarCheck,
    FaHandshake,
    FaLightbulb,
    FaGlobe,
    FaShieldAlt,
    FaClock
} from 'react-icons/fa';

const About = () => {
    const teamMembers = [
        {
            name: "María García",
            role: "CEO & Fundadora",
            description: "Visionaria con más de 10 años en tecnología y servicios",
            image: "👩‍💼"
        },
        {
            name: "Carlos Rodríguez",
            role: "CTO",
            description: "Experto en desarrollo de plataformas escalables",
            image: "👨‍💻"
        },
        {
            name: "Ana López",
            role: "Directora de Experiencia",
            description: "Especialista en diseño UX/UI y satisfacción del cliente",
            image: "👩‍🎨"
        },
        {
            name: "Diego Martín",
            role: "Director Comercial",
            description: "Estratega de crecimiento y relaciones comerciales",
            image: "👨‍💼"
        }
    ];

    const values = [
        {
            icon: <FaRocket className="text-4xl text-blue-600" />,
            title: "Innovación",
            description: "Desarrollamos soluciones tecnológicas que transforman la manera de gestionar citas y servicios"
        },
        {
            icon: <FaHeart className="text-4xl text-red-500" />,
            title: "Compromiso",
            description: "Nos dedicamos completamente a mejorar la experiencia de nuestros usuarios y negocios aliados"
        },
        {
            icon: <FaHandshake className="text-4xl text-green-600" />,
            title: "Confianza",
            description: "Construimos relaciones sólidas basadas en transparencia, seguridad y resultados comprobados"
        },
        {
            icon: <FaLightbulb className="text-4xl text-yellow-500" />,
            title: "Creatividad",
            description: "Pensamos fuera de la caja para crear experiencias únicas que superen las expectativas"
        }
    ];

    const milestones = [
        {
            year: "2023",
            title: "Fundación",
            description: "Nace DigiTurno con la visión de revolucionar la gestión de citas"
        },
        {
            year: "2024",
            title: "Crecimiento",
            description: "Alcanzamos los 100 negocios aliados y 1,000 usuarios activos"
        },
        {
            year: "2025",
            title: "Expansión",
            description: "Lanzamos nuevas funcionalidades y expandimos a nuevas ciudades"
        },
        {
            year: "2026",
            title: "Futuro",
            description: "Objetivo de ser la plataforma líder en gestión de citas en Latinoamérica"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                            Sobre DigiTurno
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90 leading-relaxed">
                            Somos más que una plataforma, somos el puente que conecta a las personas con los servicios que necesitan, 
                            de manera simple, rápida y confiable.
                        </p>
                        <div className="flex justify-center space-x-8 text-sm">
                            <div className="flex items-center space-x-2">
                                <FaCalendarCheck className="text-2xl" />
                                <span>+1000 Citas Gestionadas</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaUsers className="text-2xl" />
                                <span>+500 Negocios Aliados</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaAward className="text-2xl" />
                                <span>4.8★ Calificación Promedio</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center mb-6">
                                <div className="bg-blue-600 p-3 rounded-full mr-4">
                                    <FaRocket className="text-2xl text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800">Nuestra Misión</h2>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Simplificar la vida de las personas y potenciar el crecimiento de los negocios a través de 
                                una plataforma tecnológica que elimine las barreras entre la oferta y la demanda de servicios, 
                                creando experiencias excepcionales para todos nuestros usuarios.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-100 rounded-2xl p-8 shadow-lg">
                            <div className="flex items-center mb-6">
                                <div className="bg-purple-600 p-3 rounded-full mr-4">
                                    <FaGlobe className="text-2xl text-white" />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-800">Nuestra Visión</h2>
                            </div>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Ser la plataforma líder en Latinoamérica para la gestión inteligente de citas y servicios, 
                                reconocida por nuestra innovación, confiabilidad y el impacto positivo que generamos en 
                                la digitalización de pequeños y medianos negocios.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestros Valores</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Los principios que guían cada decisión y acción en DigiTurno
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
                                <div className="mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestro Recorrido</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            La evolución de DigiTurno desde su concepción hasta convertirse en una plataforma líder
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto">
                        <div className="relative">
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-blue-600"></div>
                            
                            {milestones.map((milestone, index) => (
                                <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                                        <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                            <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{milestone.title}</h3>
                                            <p className="text-gray-600">{milestone.description}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full border-4 border-white shadow-lg"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">Nuestro Equipo</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Las mentes brillantes detrás de DigiTurno, comprometidas con la excelencia y la innovación
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center hover:-translate-y-1">
                                <div className="text-6xl mb-4">{member.image}</div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                                <div className="text-blue-600 font-semibold mb-3">{member.role}</div>
                                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-800 mb-4">¿Por Qué Elegirnos?</h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Las razones que nos convierten en la mejor opción para gestionar tus citas
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="bg-gradient-to-br from-green-100 to-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaShieldAlt className="text-3xl text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Seguridad Garantizada</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Tus datos están protegidos con los más altos estándares de seguridad y cifrado
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaClock className="text-3xl text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Disponibilidad 24/7</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Agenda tus citas cuando quieras, donde quieras, sin restricciones de horario
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <FaAward className="text-3xl text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Calidad Superior</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Todos nuestros negocios aliados son verificados y mantienen altos estándares de calidad
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6">¿Listo para Ser Parte de Nuestra Historia?</h2>
                    <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
                        Únete a la revolución digital de la gestión de citas y forma parte de una comunidad que crece cada día
                    </p>
                    
                    <div className="flex flex-col md:flex-row gap-4 justify-center max-w-lg mx-auto">
                        <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
                            Comenzar Ahora
                        </button>
                        <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                            Contactar Equipo
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;

