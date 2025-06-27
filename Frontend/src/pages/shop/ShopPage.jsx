import React, { useState } from "react";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
  categories: [
    "All", "Earrings", "Necklaces", "Studs", "Bracelets", "Chain","Rings", "Anklets",
    "Idols & Coins", "Men's Jewellery", "Kid's Jewellery", "Bridal Jewellery", "Fashion Jewellery", "Gold Jewellery",
  ],
  colors: ["All", "Silver", "Gold", "Rose Gold", "Platinum"],
  priceRanges: [
    { label: "All", min: '', max: '' },
    { label: "Under RS 1500", min: 0, max: 1500 },
    { label: "RS 1500 - RS 3000", min: 1500, max: 3000 },
    { label: "RS 3000 - RS 5000", min: 3000, max: 5000 },
    { label: "Over RS 5000", min: 5000, max: '' },
  ],
};

const ShopPage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filtersState, setFiltersState] = useState({
    category: 'All',
    color: 'All',
    priceRange: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  const { category, color, priceRange } = filtersState;

  const categoryFilter = category !== 'All' ? category : '';
  const colorFilter = color !== 'All' ? color : '';

  let minPrice = '';
  let maxPrice = '';
  if (priceRange) {
    const [min, max] = priceRange.split('-').map(val => val.trim());
    minPrice = min || '';
    maxPrice = max || '';
  }
  
  const { data: { products = [], totalPages = 1, totalProducts = 0 } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: categoryFilter || undefined,
    color: colorFilter || undefined,
    minPrice: minPrice !== '' ? Number(minPrice) : undefined,
    maxPrice: maxPrice !== '' ? Number(maxPrice) : undefined,
    page: currentPage,
    limit: productsPerPage
  });

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const clearFilters = () => {
    setFiltersState({
      category: 'All',
      color: 'All',
      priceRange: ''
    });
    setCurrentPage(1);
  };

  const startProduct = totalProducts > 0 ? (currentPage - 1) * productsPerPage + 1 : 0;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className="section__container3">
        <img 
          src="/shoppage.png" 
          alt="Shop All Collections" 
          className="w-full h-auto object-cover" 
        />
      </section>
      <section className='section__container'>
        <div className='flex flex-col lg:flex-row lg:gap-8'>
          {/* Filter Toggle for Mobile */}
          <div className="lg:hidden mb-4 flex justify-between items-center">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="btn flex items-center gap-2"
            >
              <i className="ri-filter-3-line"></i>
              {isFilterOpen ? 'Hide' : 'Show'} Filters
            </button>
            <p className="text-sm text-gray-600">
                Showing {startProduct}-{endProduct} of {totalProducts}
            </p>
          </div>

          {/* Left Side (Filters) */}
          <div className={`lg:w-1/4 lg:block ${isFilterOpen ? 'block' : 'hidden'}`}>
            <ShopFiltering
              filters={filters}
              filtersState={filtersState}
              setFiltersState={setFiltersState}
              clearFilters={clearFilters}
            />
          </div>

          {/* Right Side (Product Display) */}
          <div className="lg:w-3/4">
             <div className="hidden lg:flex justify-between items-center mb-4">
                <h3 className='text-md font-medium'>
                  Showing {startProduct} to {endProduct} of {totalProducts} products
                </h3>
                {/* Sorting dropdown can be added here */}
             </div>
            
            {isLoading && <p>Loading products...</p>}
            {error && <p className="text-red-500">Error loading products.</p>}
            {!isLoading && products.length === 0 && <p>No products found matching your criteria.</p>}
            
            <ProductCards products={products} />

            {/* Pagination controls */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center gap-2">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-gray-600">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50"
                >
                    Next
                </button>
                </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
