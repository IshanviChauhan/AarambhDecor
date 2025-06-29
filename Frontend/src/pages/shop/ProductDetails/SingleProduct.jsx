import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productsApi";
import { useAddItemToCartMutation } from "../../../redux/features/cart/cartApi";
import RatingStar from "../../../components/RatingStar";
import ReviewsCard from "../reviews/ReviewsCard";
// import EstimatedDeliverySection from "./EstimatedDeliverySection";
import RecommendedProducts from "./Recommendtaion/RecommendedProducts";

const SingleProduct = ({ refetchCart }) => {
  const { id } = useParams();
  const { data, error, isLoading } = useFetchProductByIdQuery(id);
  const [addItemToCart] = useAddItemToCartMutation();
  const userId = useSelector((state) => state.auth.user?._id);
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);
  const [isShippingOpen, setShippingOpen] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const singleProduct = useMemo(() => data?.product || {}, [data]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    console.log("Fetched single product:", data);
  }, [data]);

  useEffect(() => {
    setCurrentImage(singleProduct.image);
  }, [singleProduct]);

  const productReviews = data?.reviews || [];
  const [currentImage, setCurrentImage] = useState(singleProduct.image);

  useEffect(() => {
    // Fetch recommended products from your API or define them manually
    const fetchRecommendedProducts = async () => {
      // Example: Replace this with your fetch logic
      const response = await fetch("/api/recommended-products"); // Adjust the endpoint
      const data = await response.json();
      setRecommendedProducts(data);
    };

    fetchRecommendedProducts();
  }, []);
  useEffect(() => {
    console.log("Fetched Product Data:", data);
  }, [data]);

  useEffect(() => {
    console.log("Single Product Data:", singleProduct);
  }, [singleProduct]);

  const handleAddToCart = async () => {
    const product = {
      productId: singleProduct._id,
      name: singleProduct.name,
      price: singleProduct.price,
      image: singleProduct.image,
      quantity: 1,
      material: singleProduct.metal,
      userId,
    };

    try {
      const response = await addItemToCart(product).unwrap();
      console.log("Add to cart response:", response);
      if (typeof refetchCart === "function") {
        refetchCart();
      }
    } catch (err) {
      console.error("Failed to add product to cart:", err);
    }
  };

  if (isLoading) return <div className="loader">Loading...</div>;
  if (error) return <p>Error loading product. Please try again later.</p>;

  const toggleDescription = () => {
    setDescriptionOpen((prevState) => !prevState);
  };

  const toggleShipping = () => {
    setShippingOpen((prevState) => !prevState);
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    
    try {
      if (navigator.share) {
        // Use native share API if available (mobile devices)
        await navigator.share({
          title: singleProduct.name,
          text: `Check out this amazing product: ${singleProduct.name}`,
          url: currentUrl,
        });
      } else {
        // Fallback to clipboard copy
        await navigator.clipboard.writeText(currentUrl);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback: try to copy to clipboard
      try {
        await navigator.clipboard.writeText(currentUrl);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (clipboardError) {
        console.error('Clipboard copy failed:', clipboardError);
      }
    }
  };


  if (typeof document !== 'undefined' && !document.getElementById('custom-animations')) {
    const style = document.createElement('style');
    style.id = 'custom-animations';
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-in-out;
      }
      .hover-lift {
        transition: transform 0.2s ease-in-out;
      }
      .hover-lift:hover {
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-primary-light-light via-white to-primary-light-light">
      <section className="py-1">
        <div className="section__container">
          <div className="flex items-center space-x-1 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <Link to="/shop" className="hover:text-primary transition-colors duration-200">
              Shop
            </Link>
            <i className="ri-arrow-right-s-line text-gray-400"></i>
            <span className="text-gray-800 font-medium">{singleProduct.name}</span>
          </div>
        </div>
      </section>

      <section className="section__container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative group">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src={currentImage || "/path/to/placeholder.jpg"}
                  alt={singleProduct.name || "Product image"}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              <button
                onClick={() => setCurrentImage(singleProduct.image)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  currentImage === singleProduct.image 
                    ? "border-primary shadow-md scale-105" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={singleProduct.image}
                  alt="Primary"
                  className="w-full h-full object-cover"
                />
              </button>
              {singleProduct.additionalImages?.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(img)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    currentImage === img 
                      ? "border-primary shadow-md scale-105" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Reference ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            {/* Product Header */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {singleProduct.name}
              </h1>
              
              {singleProduct.description && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {singleProduct.description}
                </p>
              )}
            </div>

            {/* Price Section */}
            <div className="space-y-3">
              <div className="flex items-baseline space-x-4">
                <span className="text-4xl font-bold text-primary">
                  Rs. {singleProduct.price?.toLocaleString()}
                </span>
                {singleProduct.oldPrice && singleProduct.oldPrice !== singleProduct.price && (
                  <span className="text-xl text-gray-400 line-through">
                    Rs.{singleProduct.oldPrice?.toLocaleString()}
                  </span>
                )}
                {singleProduct.oldPrice && singleProduct.oldPrice !== singleProduct.price && (
                  <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                    {Math.round(((singleProduct.oldPrice - singleProduct.price) / singleProduct.oldPrice) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* Deal Information */}
              {singleProduct.dealTitle && (
                <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-800 font-semibold text-sm">🎉 Active Deal</span>
                  </div>
                  <p className="text-green-700 font-medium mt-1">{singleProduct.dealTitle}</p>
                  {singleProduct.dealDiscount && (
                    <p className="text-green-600 text-sm mt-1">
                      Save {singleProduct.dealDiscount}% on this product!
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-3 p-4 bg-white/20 backdrop-blur-md rounded-xl border border-white/30">
              <div className="flex items-center space-x-2">
                <RatingStar rating={singleProduct.rating || 0} />
              </div>
              <span className="text-sm text-gray-600">Based on customer reviews</span>
            </div>

            {/* Product Details Accordion */}
            <div className="space-y-3">
              <button
                onClick={toggleDescription}
                className="flex justify-between items-center w-full pl-5 pt-2 pr-5 pb-2 text-left bg-white/20 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/30 hover:border-white/40 transition-all duration-200 shadow-sm"
              >
                <span className="text-lg font-semibold text-gray-900">Product Specifications</span>
                <div className={`transform transition-transform duration-200 ${isDescriptionOpen ? 'rotate-180' : ''}`}>
                  <i className="ri-arrow-down-s-line text-xl text-gray-600"></i>
                </div>
              </button>
              
              {isDescriptionOpen && (
                <div className="p-5 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl space-y-4 animate-fadeIn">
                  {singleProduct.category && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Category</span>
                      <span className="text-gray-900 font-semibold">{singleProduct.category}</span>
                    </div>
                  )}
                  {singleProduct.material && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Material</span>
                      <span className="text-gray-900 font-semibold">{singleProduct.material}</span>
                    </div>
                  )}
                  {singleProduct.size && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">Size</span>
                      <span className="text-gray-900 font-semibold">{singleProduct.size}</span>
                    </div>
                  )}
                  {singleProduct.metal && (
                    <div className="flex justify-between items-center py-2">
                      <span className="font-medium text-gray-700">Material</span>
                      <span className="text-gray-900 font-semibold">{singleProduct.material}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="bg-gradient-to-r from-primary to-primary-dark text-white font-semibold py-2 px-5 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-3"
                disabled={isLoading || error}
              >
                <i className="ri-shopping-cart-line text-xl"></i>
                <span className="text-lg">Add to Cart</span>
              </button>
              
              <button 
                onClick={handleShare}
                className="flex items-center justify-center space-x-2 py-2 px-5 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/30 hover:border-white/40 transition-all duration-200 relative"
              >
                <i className={`ri-${shareSuccess ? 'check' : 'share'}-line`}></i>
                <span className="text-lg font-semibold">
                  {shareSuccess ? 'Copied!' : 'Share'}
                </span>
                {shareSuccess && (
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-sm px-3 py-1 rounded-md">
                    Link copied to clipboard!
                  </div>
                )}
              </button>
            </div>

            {/* Shipping Information */}
            <div className="space-y-2">
              <button
                onClick={toggleShipping}
                className="flex justify-between items-center w-full pl-5 pt-2 pr-5 pb-2  text-left bg-white/20 backdrop-blur-md border border-white/30 rounded-xl hover:bg-white/30 hover:border-white/40 transition-all duration-200 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <i className="ri-truck-line text-xl text-primary"></i>
                  <span className="text-lg font-semibold text-gray-900">Shipping & Returns</span>
                </div>
                <div className={`transform transition-transform duration-200 ${isShippingOpen ? 'rotate-180' : ''}`}>
                  <i className="ri-arrow-down-s-line text-xl text-gray-600"></i>
                </div>
              </button>
              
              {isShippingOpen && (
                <div className="p-5 bg-white/15 backdrop-blur-md border border-white/25 rounded-xl space-y-3 animate-fadeIn">
                  <div className="flex items-center space-x-3 text-green-700">
                    <i className="ri-check-line text-lg"></i>
                    <span>Free express shipping on all orders</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-700">
                    <i className="ri-check-line text-lg"></i>
                    <span>Standard delivery: 3-5 business days</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-700">
                    <i className="ri-check-line text-lg"></i>
                    <span>Express delivery: 1-2 business days</span>
                  </div>
                  <div className="flex items-center space-x-3 text-blue-700">
                    <i className="ri-gift-line text-lg"></i>
                    <span>Free shipping on orders above Rs. 1,500</span>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-xl">
              <div className="text-center space-y-2">
                <i className="ri-shield-check-line text-2xl text-green-600"></i>
                <div className="text-sm font-medium text-gray-700">Secure Payment</div>
              </div>
              <div className="text-center space-y-2">
                <i className="ri-award-line text-2xl text-blue-600"></i>
                <div className="text-sm font-medium text-gray-700">Quality Assured</div>
              </div>
              <div className="text-center space-y-2">
                <i className="ri-customer-service-2-line text-2xl text-purple-600"></i>
                <div className="text-sm font-medium text-gray-700">24/7 Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Products Section - Full Width */}
      <section className="section__container py-5">
        <div className="flex justify-center">
          <RecommendedProducts products={recommendedProducts} />
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12">
        <div className="section__container bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 p-6">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              See what our customers are saying about this product
            </p>
          </div>
          <div>
            <ReviewsCard productReviews={productReviews} />
          </div>
        </div>
      </section>
    </div>
  );
};

SingleProduct.propTypes = {
  refetchCart: PropTypes.func,
};

export default SingleProduct;
