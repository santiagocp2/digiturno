import { FaCut, FaHeartbeat, FaMapMarkerAlt, FaHeart, FaStar } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';

const BusinessCard = ({ business, onBook, showInteractions = true, onFavoriteChange }) => {
    const { user } = useAuth();
    const [isFavorite, setIsFavorite] = useState(false);
    const [userRating, setUserRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    // Cargar calificación del usuario al montar
    useEffect(() => {
        if (user?.id && business?.id) {
            loadFavoriteStatus();
            loadUserRating();
        }
    }, [user?.id, business?.id]);

    const loadFavoriteStatus = async () => {
        try {
            const favoriteResponse = await fetch(`${import.meta.env.VITE_API_URL}/favoritos/isFavorito/${user.id}/${business.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetMethod: 'GET' })
            });
            if (favoriteResponse.ok) {
                const favoriteData = await favoriteResponse.json();
                setIsFavorite(favoriteData.success && (favoriteData.data === true || favoriteData.data === "true" || favoriteData.data === 1));
            }
        } catch (error) {
            console.error('Error loading favorite status:', error);
        }
    };

    // Cargar la calificación del usuario desde la BD
    const loadUserRating = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/calificaciones/negocio/${business.id}/cliente/${user.id}`);
            if (res.ok) {
                const data = await res.json();
                if (data.success && data.data) {
                    setUserRating(data.data.puntaje);
                } else {
                    setUserRating(0);
                }
            }
        } catch (error) {
            console.error('Error loading user rating:', error);
        }
    };

    // Guardar la calificación en la BD
    const handleRating = async (rating) => {
        if (!user?.id || !business?.id) {
            console.error('Faltan datos de usuario o negocio');
            return;
        }
        setUserRating(rating);
        try {
            const fechaFormateada = new Date().toISOString().slice(0, 19);
            const res = await fetch(`${import.meta.env.VITE_API_URL}/calificaciones`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    targetMethod: 'POST',
                    body: {
                        clienteId: user.id,
                        negocioId: business.id,
                        puntaje: rating,
                        comentario: '',
                        fecha: fechaFormateada
                    }
                })
            });
            if (!res.ok) {
                console.error('Error saving rating');
            }
        } catch (error) {
            console.error('Error saving rating:', error);
        }
    };

    const handleFavorite = async () => {
        if (!user?.id) return;

        try {
            const url = `${import.meta.env.VITE_API_URL}/favoritos/${user.id}/${business.id}`;
            const targetMethod = isFavorite ? 'DELETE' : 'POST';
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetMethod })
            });

            if (response.ok) {
                const result = await response.json();
                if (result.success) {
                    const newFavoriteState = !isFavorite;
                    setIsFavorite(newFavoriteState);
                    console.log('✅ Favorito actualizado:', newFavoriteState);
                    // Notificar al componente padre para refrescar
                    if (onFavoriteChange) {
                        onFavoriteChange(business.id, newFavoriteState);
                    }
                }
            }
        } catch (error) {
            console.error('❌ Error updating favorite:', error);
        }
    };

    const getBusinessIcon = (icon) => {
        switch (icon) {
            case 'cut': return <FaCut className="text-4xl text-blue-500" />;
            case 'heartbeat': return <FaHeartbeat className="text-4xl text-red-400" />;
            default: return <FaCut className="text-4xl text-blue-500" />;
        }
    };

    return (
        <div className="relative border rounded-lg overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 bg-white border-gray-200">
            {/* Header con favorito */}
            {showInteractions && user && (
                <div className="absolute top-2 right-2 z-10">
                    <button
                        onClick={handleFavorite}
                        className={`p-2 rounded-full transition-all ${
                            isFavorite 
                                ? 'bg-red-400 text-white shadow-lg' 
                                : 'bg-white text-gray-400 hover:text-red-400 shadow-md'
                        }`}
                    >
                        <FaHeart className="text-lg" />
                    </button>
                </div>
            )}

            <div className="relative">
                {business.urlImagen ? (
                    <img
                        src={business.urlImagen}
                        alt={business.name}
                        className="h-40 w-full object-cover"
                    />
                ) : (
                    <div className="h-40 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-gray-600">
                        <div className="text-center">
                            {getBusinessIcon(business.icon)}
                            <p className="mt-2 text-sm font-medium">Sin imagen</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{business.name}</h3>
                    <div className="flex items-center gap-2">
                        <div className="relative inline-block">
                            {/* Estrella vacía (fondo) */}
                            <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            {/* Estrella llena (superpuesta con clip-path) */}
                            <svg 
                                className="absolute top-0 left-0 w-5 h-5 text-blue-400" 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                                style={{
                                    clipPath: `inset(0 ${100 - (business.rating || 0) * 20}% 0 0)`
                                }}
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <span className="text-sm text-gray-600 font-medium">
                            {Math.round((business.rating || 0) * 20)}%
                        </span>
                    </div>
                </div>

                <p className="text-gray-600 mb-3 text-sm">{business.description}</p>
                
                {business.address && (
                    <div className="flex items-center text-gray-500 mb-4">
                        <FaMapMarkerAlt className="mr-2 text-sm" />
                        <span className="text-sm">{business.address}</span>
                    </div>
                )}

                {/* Calificación del usuario */}
                {showInteractions && user && (
                    <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <div className="text-sm font-semibold text-gray-700 mb-2">Tu calificación:</div>
                        <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => handleRating(star)}
                                    onMouseEnter={() => setHoverRating(star)}
                                    onMouseLeave={() => setHoverRating(0)}
                                    className="transition-all hover:scale-110"
                                >
                                    <FaStar
                                        className={`text-lg ${
                                            star <= (hoverRating || userRating)
                                                ? 'text-blue-400'
                                                : 'text-gray-300'
                                        }`}
                                    />
                                </button>
                            ))}
                            {userRating > 0 && (
                                <span className="text-sm text-gray-600 ml-2">
                                    ({userRating} estrella{userRating !== 1 ? 's' : ''})
                                </span>
                            )}
                        </div>
                    </div>
                )}

                <button
                    onClick={() => onBook(business)}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all font-semibold shadow-md hover:shadow-lg"
                >
                    Reservar turno
                </button>
            </div>
        </div>
    );
};

export default BusinessCard;

