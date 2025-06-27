import { Link } from "react-router-dom";
import RatingStar from "../../components/RatingStar";
import { useAddItemToCartMutation } from "../../redux/features/cart/cartApi";
import { useSelector } from "react-redux";
import { useState } from "react";

const ProductCards = ({ products }) => {
  const [addItemToCart, { isLoading }] = useAddItemToCartMutation();
  const userId = useSelector((state) => state.auth.user?._id); // Get user ID from Redux
  const [addedProductId, setAddedProductId] = useState(null);

  const handleAddToCart = async (product) => {
    if (!userId) {
      alert("Please log in to add items to your cart.");
      return;
    }

    try {
      await addItemToCart({
        productId: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: 1,
        userId: userId,
      }).unwrap();

      setAddedProductId(product._id);
      setTimeout(() => setAddedProductId(null), 2000);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
      {products.map((product) => (
        <div key={product._id} className="group">
          <div className="relative overflow-hidden rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-300">
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 md:h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </Link>

            <button
              onClick={() => handleAddToCart(product)}
              disabled={isLoading && addedProductId === product._id}
              className={`absolute top-3 right-3 flex items-center justify-center p-2 rounded-full transition duration-300 
              ${addedProductId === product._id ? "bg-green-500 text-white" : "bg-white text-gray-800 hover:bg-primary hover:text-white"}`}
            >
              {isLoading && addedProductId === product._id ? (
                <i className="ri-loader-line animate-spin"></i>
              ) : addedProductId === product._id ? (
                <i className="ri-check-line"></i>
              ) : (
                <i className="ri-shopping-cart-2-line"></i>
              )}
            </button>
          </div>
          <div className="product__card__content">
            <h4 className="text-md md:text-lg font-semibold truncate group-hover:text-primary transition-colors">
              {product.name}
            </h4>
            <div className="flex items-center justify-center gap-2 mt-1">
                <p className="text-md text-gray-800 font-bold">
                Rs {product.price}
                </p>
                {product.oldPrice && <s className="text-sm text-gray-500">Rs {product.oldPrice}</s>}
            </div>
            <div className="mt-1">
                <RatingStar rating={product.rating} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
