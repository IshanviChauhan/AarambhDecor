import { Link } from "react-router-dom";
import RatingStar from "../../components/RatingStar";
import { useAddItemToCartMutation } from "../../redux/features/cart/cartApi";
import { useSelector } from "react-redux";
import { useState } from "react";

const ProductCards = ({ products }) => {
  const [addItemToCart, { isLoading }] = useAddItemToCartMutation();
  const userId = useSelector((state) => state.auth.user?._id);
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
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      {products.map((product) => (
        <div key={product._id} className="group relative">
          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-stone-100">
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="absolute bottom-4 right-4">
              <button
                onClick={() => handleAddToCart(product)}
                disabled={isLoading && addedProductId === product._id}
                className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 ${
                  addedProductId === product._id
                    ? "bg-green-500 text-white"
                    : "bg-white/80 text-stone-700 opacity-0 group-hover:opacity-100 backdrop-blur-sm hover:bg-primary hover:text-white"
                }`}
              >
                {isLoading && addedProductId === product._id ? (
                  <i className="ri-loader-4-line animate-spin text-xl"></i>
                ) : addedProductId === product._id ? (
                  <i className="ri-check-line text-xl"></i>
                ) : (
                  <i className="ri-shopping-cart-2-line text-xl"></i>
                )}
              </button>
            </div>
          </div>
          <div className="mt-4 text-center">
            <h3 className="text-sm font-medium text-stone-800">
              <Link to={`/shop/${product._id}`}>
                <span aria-hidden="true" className="absolute inset-0" />
                {product.name}
              </Link>
            </h3>
            <div className="mt-1 flex items-center justify-center text-yellow-500">
              <RatingStar rating={product.rating} />
            </div>
            <p className="mt-1 text-sm font-semibold text-stone-900">
              Rs {product.price}
              {product.oldPrice && <span className="ml-2 line-through text-stone-500">Rs {product.oldPrice}</span>}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
