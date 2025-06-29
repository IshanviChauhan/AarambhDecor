import React, { useState } from "react";
import ProductCards from "./ProductCards";
import ShopFiltering from "./ShopFiltering";
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const filters = {
  categories: [
    "All", "Mirrors", "Table Decor", "Tables", "Wall Accents", "Wall Art", "Wall Shelves", "Table Top",
  ],
  priceRanges: [
    { label: "All", min: '', max: '' },
    { label: "Under Rs. 1500", min: '', max: 1500 },
    { label: "Rs. 1500 - Rs. 3000", min: 1500, max: 3000 },
    { label: "Rs. 3000 - Rs. 5000", min: 3000, max: 5000 },
    { label: "Over Rs. 5000", min: 5000, max: '' },
  ],
};

const ShopPage = () => {
  const [filtersState, setFiltersState] = useState({
    category: 'All',
    priceRange: ''
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(20);

  const { category, priceRange } = filtersState;

  // Determine filters for the query
  const categoryFilter = category !== 'All' ? category : '';
  
  let minPrice = '';
  let maxPrice = '';
  if (priceRange) {
    const [min, max] = priceRange.split('-');
    if (min && min !== '') {
      minPrice = parseFloat(min);
    }
    if (max && max !== '') {
      maxPrice = parseFloat(max);
    }
  }

  // Debug logging
  console.log('Filters:', { category, priceRange, minPrice, maxPrice, categoryFilter });

  const { data: { products = [], totalPages = 1, totalProducts = 0 } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: categoryFilter || undefined,
    minPrice: minPrice !== '' ? minPrice : undefined,
    maxPrice: maxPrice !== '' ? maxPrice : undefined,
    page: currentPage,
    limit: productsPerPage
  });

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFiltersState(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFiltersState({
      category: 'All',
      priceRange: ''
    });
    setCurrentPage(1);
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-lg">Loading products...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-lg text-red-500">Error loading products: {error.message}</div>
    </div>
  );

  const startProduct = (currentPage - 1) * productsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

  return (
    <>
      <section className="section__container3">
        <img 
          src="shoppage.png" 
          alt="Shop Page GIF" 
          className="w-full rounded" 
        />
      </section>
      <section className='section__container min-h-screen bg-gradient-to-r from-primary-light-light via-white to-primary-light-light'>
        <div className='flex flex-col md:flex-row md:gap-12 gap-8'>
          {/* Left Side (Filters) */}
          <div className="md:w-1/4 lg:w-1/5">
            <ShopFiltering
              filters={filters}
              filtersState={filtersState}
              setFiltersState={handleFilterChange}
              clearFilters={clearFilters}
            />
          </div>


          {/* Right Side (Product Display) */}
          <div className="flex-1">
            <h3 className='text-xl font-medium mb-4'>
              Showing {products.length > 0 ? startProduct : 0} to {products.length > 0 ? endProduct : 0} of {totalProducts} products
            </h3>
            <ProductCards products={products} />

            {/* Pagination controls */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-primary text-white rounded-md mr-2"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-primary-dark text-white' : 'bg-gray-300 text-gray-700'} rounded-md mx-1`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-primary text-white rounded-md ml-2"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
