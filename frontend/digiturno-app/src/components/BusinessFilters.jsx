const BusinessFilters = ({ categories, onFilter }) => {
    return (
        <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-lg font-bold mb-4">Filtrar por categoría</h3>
            <ul className="space-y-2">
                <li>
                    <button onClick={() => onFilter('all')} className="text-blue-600 hover:underline">
                        Todas las categorías
                    </button>
                </li>
                {categories.map(cat => (
                    <li key={cat.id_categoria}>
                        <button onClick={() => onFilter(cat.id_categoria)} className="text-blue-600 hover:underline">
                            {cat.nombre}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BusinessFilters;
