import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCards from '../shop/ProductCards';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';

const CategoryPage = () => {
  const { categoryName } = useParams();

  // Use the fetchAllProducts query, passing the category name
  const { data, error, isLoading } = useFetchAllProductsQuery({
    category: categoryName !== 'all' ? categoryName.replace(/\+/g, ' ') : '', // Filter by category, or get all if 'all'
  });

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Category images mapping
  const categoryImages = {
    "Mirrors": '/1.png',
    "Table Decor": '/2.png',
    "Tables": '/3.png',
    "Wall Accents": '/4.png',
    "Wall Art": '/5.png',
    "Wall Shelves": '/6.png',
    "all": '/default.jpg' // Default image for 'all' or unspecified categories
  };

  // Get image URL based on categoryName
  const decodedCategoryName = categoryName.replace(/\+/g, ' ');
  const categoryImage =
    categoryImages[decodedCategoryName] || '/images/default.jpg'; // Fallback to default

  return (
    <>
      <section >
        <div className="relative">
          <img
            src={categoryImage}
            alt={`${decodedCategoryName} banner`}
            className="w-full h-full  rounded-lg"
          />
       
        </div>
      </section>

      <div className="section__container">
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading products.</p>
        ) : data?.products?.length > 0 ? (
          <ProductCards products={data.products} />
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
