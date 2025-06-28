import React from 'react';
import PropTypes from 'prop-types';

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
    const { category, priceRange } = filtersState;

    return (
        <div className="space-y-5 flex-shrink-0">
            <h3>Filters</h3>

            {/* Category Filter */}
            <div className="flex flex-col space-y-2">
                <h4 className='font-medium text-lg'>Category</h4>
                <hr />
                {filters?.categories.map(cat => (
                    <label key={cat} className='capitalize cursor-pointer'>
                        <input
                            type="radio"
                            name="category"
                            value={cat}
                            checked={category === cat}
                            onChange={e => setFiltersState({ ...filtersState, category: e.target.value })}
                        />
                        <span className='ml-1'>{cat}</span>
                    </label>
                ))}
            </div>

            {/* Color Filter */}
            {/* <div className="flex flex-col space-y-2">
                <h4 className='font-medium text-lg'>Color</h4>
                <hr />
                {filters.colors.map(col => (
                    <label key={col} className='capitalize cursor-pointer'>
                        <input
                            type="radio"
                            name="color"
                            value={col}
                            checked={color === col}
                            onChange={e => setFiltersState({ ...filtersState, color: e.target.value })}
                        />
                        <span className='ml-1'>{col}</span>
                    </label>
                ))}
            </div> */}

            {/* Price Range Filter */}
            <div className="flex flex-col space-y-2">
                <h4 className='font-medium text-lg'>Price Range</h4>
                <hr />
                {filters?.priceRanges.map(range => {
                    let value = '';
                    if (range.label === 'All') {
                        value = '';
                    } else if (range.min !== '' && range.max !== '') {
                        value = `${range.min}-${range.max}`;
                    } else if (range.min !== '' && range.max === '') {
                        value = `${range.min}-`;
                    } else if (range.min === '' && range.max !== '') {
                        value = `-${range.max}`;
                    }
                    
                    return (
                        <label key={range.label} className='capitalize cursor-pointer'>
                            <input
                                type="radio"
                                name="priceRange"
                                value={value}
                                checked={priceRange === value}
                                onChange={e => setFiltersState({ ...filtersState, priceRange: e.target.value })}
                            />
                            <span className='ml-1'>{range.label}</span>
                        </label>
                    );
                })}
            </div>

            {/* Clear Filters Button */}
            <button className="bg-primary py-1 px-4 text-white rounded" onClick={clearFilters}>
                Clear All Filters
            </button>
        </div>
    );
};
ShopFiltering.propTypes = {
    filters: PropTypes.object.isRequired,
    filtersState: PropTypes.object.isRequired,
    setFiltersState: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
};

export default ShopFiltering;
