import BusinessCard from './BusinessCard';
import BookingModal from './BookingModal';
import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

const BusinessList = ({ businesses, onBook, showBookingModal, setShowBookingModal, selectedBusiness, setSelectedBusiness, filterCategory = true }) => {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todas');

    const filtered = businesses.filter(b =>
        (!filterCategory || selectedCategory === 'Todas' || b.category === selectedCategory) &&
        b.name.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <>
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Buscar negocios..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="flex-grow px-4 py-3 border rounded-l-lg focus:outline-none"
                />
                {filterCategory && (
                    <select
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                        className="border-t border-b border-r px-4 py-3 focus:outline-none"
                    >
                        <option>Todas</option>
                        <option>General</option>
                    </select>
                )}
                <button className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-all">
                    <FaSearch />
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(business => (
                    <BusinessCard key={business.id} business={business} onBook={onBook} />
                ))}
            </div>

            <BookingModal
                show={showBookingModal}
                onClose={() => setShowBookingModal(false)}
                business={selectedBusiness}
                onConfirm={() => setShowBookingModal(false)}
            />
        </>
    );
};

export default BusinessList;
