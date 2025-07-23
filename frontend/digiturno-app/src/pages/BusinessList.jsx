import { useEffect, useState } from 'react';
import BusinessCard from '../components/BusinessCard';
import BusinessFilters from '../components/BusinessFilters';

const BusinessList = () => {
    const [businesses, setBusinesses] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch('http://52.14.112.147:8080/negocio')
            .then(res => res.json())
            .then(data => {
                setBusinesses(data.data || []);
                setFiltered(data.data || []);
            });

        fetch('http://52.14.112.147:8080/categorias') // Crear si no existe
            .then(res => res.json())
            .then(data => setCategories(data.data || []));
    }, []);

    const handleFilter = (catId) => {
        if (catId === 'all') {
            setFiltered(businesses);
        } else {
            setFiltered(businesses.filter(b => b.idCategoria === Number(catId)));
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 p-6 bg-gray-50 min-h-screen">
            <aside className="md:w-1/4 w-full">
                <BusinessFilters categories={categories} onFilter={handleFilter} />
            </aside>

            <section className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(business => (
                    <BusinessCard key={business.idNegocio} business={business} />
                ))}
            </section>
        </div>
    );
};

export default BusinessList;
