import React from 'react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
    const { category, color, priceRange } = filtersState;

    return (
        <div className="space-y-6 flex-shrink-0 p-6 bg-gray-50 rounded-lg shadow-sm w-full">
            <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Filters</h3>

            {/* Category Filter */}
            <div className="flex flex-col space-y-2">
                <h4 className='font-medium text-lg text-gray-700'>Category</h4>
                <select
                    name="category"
                    value={category}
                    onChange={e => setFiltersState({ ...filtersState, category: e.target.value })}
                    className="capitalize cursor-pointer w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    {filters.categories.map(cat => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            </div>

            {/* Color Filter */}
            <div className="flex flex-col space-y-2">
                <h4 className='font-medium text-lg text-gray-700'>Color</h4>
                {filters.colors.map(col => (
                    <label key={col} className='capitalize cursor-pointer flex items-center text-gray-600'>
                        <input
                            type="radio"
                            name="color"
                            value={col}
                            checked={color === col}
                            onChange={e => setFiltersState({ ...filtersState, color: e.target.value })}
                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                        />
                        <span className='ml-2'>{col}</span>
                    </label>
                ))}
            </div>

            {/* Price Range Filter */}
            <div className="flex flex-col space-y-2">
                <h4 className='font-medium text-lg text-gray-700'>Price Range</h4>
                {filters.priceRanges.map(range => {
                    const value = (range.min !== '' || range.max !== '') ? `${range.min}-${range.max}` : '';
                    return (
                        <label key={range.label} className='capitalize cursor-pointer flex items-center text-gray-600'>
                            <input
                                type="radio"
                                name="priceRange"
                                value={value}
                                checked={priceRange === value}
                                onChange={e => setFiltersState({ ...filtersState, priceRange: e.target.value })}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            />
                            <span className='ml-2'>{range.label}</span>
                        </label>
                    );
                })}
            </div>

            {/* Clear Filters Button */}
            <button className="w-full bg-primary py-2 px-4 text-white rounded-md hover:bg-primary-dark transition-colors duration-300" onClick={clearFilters}>
                Clear All Filters
            </button>
        </div>
    );
};

export default ShopFiltering;
