import { Link } from "react-router-dom";
import RatingStar from "../../components/RatingStar";
import { useAddItemToCartMutation } from "../../redux/features/cart/cartApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import PropTypes from "prop-types";

const ProductCards = ({ products }) => {
  const [addItemToCart, { isLoading }] = useAddItemToCartMutation();
  const userId = useSelector((state) => state.auth.user?._id); // Get user ID from Redux
  const [addedProductId, setAddedProductId] = useState(null);

  const handleAddToCart = async (product) => {
    if (!userId) {
      console.error("User is not logged in.");
      return;
    }

    try {
      await addItemToCart({
        productId: product._id,
        name: product.name,
        image: product.image, // Include the image field here
        price: product.price,
        quantity: 1,
        userId: userId,
      });

      setAddedProductId(product._id); // Temporarily mark product as added for feedback
      setTimeout(() => setAddedProductId(null), 1500); // Clear feedback after 1.5s
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <div key={product._id} className="bg-white/30 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative">
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="max-h-96 md:h-80 w-full object-cover"
              />
            </Link>

            <button
              onClick={() => handleAddToCart(product)}
              disabled={isLoading}
              className={`absolute top-3 right-3 flex items-center justify-center ${
                addedProductId === product._id
                  ? "bg-green-500"
                  : "bg-primary hover:bg-primary-dark"
              } p-1.5 text-white rounded transition duration-300`}
            >
              {isLoading && addedProductId === product._id ? (
                <i className="ri-loader-line animate-spin"></i> // Loading spinner
              ) : addedProductId === product._id ? (
                <span className="ri-check-line"></span> // Success icon
              ) : (
                <i className="ri-shopping-cart-2-line"></i> // Default cart icon
              )}
            </button>
          </div>
          <div className="product__card__content">
            <h4 className="text-base sm:text-lg md:text-xl lg:text-2xl font-heading">
              {product.name}
            </h4>
            <div className="price-section">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm sm:text-base md:text-lg lg:text-xl font-numeric font-bold text-primary">
                  Rs. {product.price?.toLocaleString()}
                </span>
                {product.oldPrice && product.oldPrice !== product.price && (
                  <>
                    <span className="text-xs sm:text-sm md:text-base text-gray-500 line-through">
                      Rs. {product.oldPrice?.toLocaleString()}
                    </span>
                    {product.dealDiscount && (
                      <span className="text-xs sm:text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                        {product.dealDiscount}% OFF
                      </span>
                    )}
                  </>
                )}
              </div>
              {product.dealTitle && (
                <p className="text-xs text-green-600 font-medium mt-1">
                  🎉 {product.dealTitle}
                </p>
              )}
            </div>
            <RatingStar rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

ProductCards.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductCards;
