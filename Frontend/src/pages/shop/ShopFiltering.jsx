import React, { useState } from 'react';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
    const { category, color, priceRange } = filtersState;
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    return (
        <div className="space-y-1 flex-shrink-0 p-5 bg-white border border-gray-200 rounded-xl shadow-sm w-full">
            <div className="flex justify-between items-center pb-3 border-b border-gray-200 mb-2">
                <h3 className="text-lg font-bold text-gray-800">Filters</h3>
                <button 
                    onClick={clearFilters}
                    className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                >
                    Clear All
                </button>
            </div>
            
            {/* Category Filter */}
            <div className="py-4">
                <h4 className="font-semibold text-gray-700 mb-3">Category</h4>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                        onBlur={() => setTimeout(() => setIsCategoryOpen(false), 150)}
                        className="capitalize cursor-pointer w-full pl-3 pr-10 py-2 text-left border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary transition flex justify-between items-center"
                    >
                        {category}
                        <i className={`ri-arrow-down-s-line transition-transform duration-200 ${isCategoryOpen ? 'rotate-180' : ''}`}></i>
                    </button>
                    {isCategoryOpen && (
                        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200">
                            <ul className="py-1 max-h-60 overflow-auto">
                                {filters.categories.map(cat => (
                                    <li
                                        key={cat}
                                        onClick={() => {
                                            setFiltersState({ ...filtersState, category: cat });
                                            setIsCategoryOpen(false);
                                        }}
                                        className="capitalize cursor-pointer px-3 py-2 text-sm text-gray-700 hover:bg-primary-light hover:text-primary-dark"
                                    >
                                        {cat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Color Filter */}
            <div className="py-4 border-t border-gray-200">
                <h4 className='font-semibold text-gray-700 mb-3'>Color</h4>
                <div className="space-y-2">
                    {filters.colors.map(col => (
                        <label key={col} className='capitalize cursor-pointer flex items-center text-gray-600 p-2 rounded-md hover:bg-gray-100 transition'>
                            <input
                                type="radio"
                                name="color"
                                value={col}
                                checked={color === col}
                                onChange={e => setFiltersState({ ...filtersState, color: e.target.value })}
                                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                            />
                            <span className='ml-3 text-sm font-medium'>{col}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range Filter */}
            <div className="py-4 border-t border-gray-200">
                <h4 className='font-semibold text-gray-700 mb-3'>Price Range</h4>
                <div className="space-y-2">
                    {filters.priceRanges.map(range => {
                        const value = (range.min !== '' || range.max !== '') ? `${range.min}-${range.max}` : '';
                        return (
                            <label key={range.label} className='capitalize cursor-pointer flex items-center text-gray-600 p-2 rounded-md hover:bg-gray-100 transition'>
                                <input
                                    type="radio"
                                    name="priceRange"
                                    value={value}
                                    checked={priceRange === value}
                                    onChange={e => setFiltersState({ ...filtersState, priceRange: e.target.value })}
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                                />
                                <span className='ml-3 text-sm font-medium'>{range.label}</span>
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ShopFiltering;
