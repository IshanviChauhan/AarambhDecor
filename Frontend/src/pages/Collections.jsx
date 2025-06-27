import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProducts();
        // Assuming the backend returns { products: [...] }
        setProducts(response.data.products || []);
      } catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center p-10 font-semibold">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-text-dark">Our Collection</h1>
      {products.length === 0 ? (
        <p className="text-center text-text-light">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg shadow-md overflow-hidden bg-white transition-transform transform hover:-translate-y-1 hover:shadow-xl">
              <img 
                src={(product.images && product.images[0]) || 'https://placehold.co/600x400.png'} 
                alt={product.name} 
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-text-dark truncate" title={product.name}>{product.name}</h2>
                {product.category && <p className="text-sm text-text-light mt-1">{product.category}</p>}
                <p className="text-primary font-bold mt-2 text-xl">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Collections;
