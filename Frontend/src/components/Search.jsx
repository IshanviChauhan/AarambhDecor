import React, { useState } from "react";
import { useSearchProductsQuery } from "../redux/features/products/productsApi";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { data: filteredProducts = [], error, isLoading } = useSearchProductsQuery(
    searchQuery,
    { skip: !searchQuery }
  );

  const handleProductClick = (productId) => {
    navigate(`/shop/${productId}`);
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onFocus={() => setIsSearchOpen(!!searchQuery)}
          onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsSearchOpen(!!e.target.value);
          }}
          className="w-64 lg:w-80 p-2 pl-10 pr-4 text-sm bg-gray-100 rounded-full text-gray-800 border-2 border-transparent focus:outline-none focus:border-primary focus:bg-white transition-all"
          placeholder="Search for decor..."
        />
        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <i className="ri-search-line"></i>
        </span>
      </div>
      {isSearchOpen && (
        <div className="absolute top-full mt-2 left-0 w-full bg-white shadow-xl rounded-lg p-2 z-50 max-h-96 overflow-y-auto">
          {isLoading && <p className="p-2 text-center text-gray-500">Loading...</p>}
          {error && <p className="p-2 text-center text-red-500">Error loading products.</p>}
          {!isLoading && !error && filteredProducts.length === 0 && (
            <p className="p-2 text-center text-gray-500">No products found for "{searchQuery}".</p>
          )}
          <ul className="divide-y divide-gray-100">
            {filteredProducts.map((product) => (
              <li
                key={product._id}
                className="flex items-center gap-4 p-2 cursor-pointer hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => handleProductClick(product._id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-grow">
                  <p className="font-semibold text-sm text-gray-800">{product.name}</p>
                  <p className="text-sm text-primary">Rs {product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Search;
