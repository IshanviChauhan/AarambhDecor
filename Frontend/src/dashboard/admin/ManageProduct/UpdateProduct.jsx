import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import TextInput from "../AddProduct/TextInput";
import SelectInput from "../AddProduct/SelectInput";
import UploadImage from "../AddProduct/UploadImage";
import { useFetchProductByIdQuery, useUpdateProductMutation } from "../../../../src/redux/features/products/productsApi";

const categories = [
  { label: "Select Category", value: "" },
  { label: "Mirrors", value: "Mirrors" },
  { label: "Table Decor", value: "Table Decor" },
  { label: "Tables", value: "Tables" },
  { label: "Wall Accents", value: "Wall Accents" },
  { label: "Wall Art", value: "Wall Art" },
  { label: "Wall Shelves", value: "Wall Shelves" },
  { label: "Table Top", value: "Table Top" },
];

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data: productData, isLoading: isProductLoading, error: fetchError } = useFetchProductByIdQuery(id);
  const [updateProduct, { isLoading: isUpdating, error: updateError }] = useUpdateProductMutation();
  
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "",
    description: "",
    isTrending: false,
    size: "",
    material: "",
    image: "",
    additionalImages: [],
  });
  
  const [newMainImage, setNewMainImage] = useState('');
  const [newAdditionalImages, setNewAdditionalImages] = useState([]);

  useEffect(() => {
    if (productData?.product) {
      const p = productData.product;
      setProduct({
        name: p.name || "",
        category: p.category || "",
        price: p.price || "",
        oldPrice: p.oldPrice || "",
        description: p.description || "",
        isTrending: p.isTrending || false,
        size: p.size || "",
        material: p.material || "",
        image: p.image || "",
        additionalImages: p.additionalImages || [],
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct(prevProduct => ({ 
        ...prevProduct, 
        [name]: type === "checkbox" ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProductPayload = {
      ...product,
      image: newMainImage || product.image,
      additionalImages: newAdditionalImages.length > 0 ? newAdditionalImages : product.additionalImages,
      author: user?._id,
    };

    if (!updatedProductPayload.name || !updatedProductPayload.category || !updatedProductPayload.price || !updatedProductPayload.image) {
        alert("Please ensure all required fields are filled: Name, Category, Price, and Main Image.");
        return;
    }

    try {
      await updateProduct({ id, ...updatedProductPayload }).unwrap();
      alert("Product updated successfully!");
      navigate("/dashboard/manage-products");
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product.");
    }
  };

  if (isProductLoading) return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
          <span className="ml-3 text-gray-700 font-medium">Loading product...</span>
        </div>
      </div>
    </div>
  );
  
  if (fetchError) return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="backdrop-blur-xl bg-red-50/80 border border-red-200/50 rounded-2xl p-8 shadow-xl">
        <div className="text-center">
          <i className="ri-error-warning-line text-4xl text-red-500 mb-4"></i>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Product</h3>
          <p className="text-red-600">{fetchError.message}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-6 shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Update Product
              </h2>
              <p className="text-gray-600 mt-2">Edit and update product information</p>
            </div>
            <button 
              onClick={() => navigate("/dashboard/manage-products")}
              className="flex items-center px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-800 backdrop-blur-sm bg-purple-50/50 border border-purple-200/50 rounded-xl hover:bg-purple-100/50 transition-all duration-200"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Back to Products
            </button>
          </div>
        </div>

        {/* Product Form */}
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextInput
              label="Product Name"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <SelectInput
                label="Category"
                name="category"
                value={product.category}
                onChange={handleChange}
                options={categories}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput 
                label="Current Price" 
                name="price" 
                type="number" 
                value={product.price} 
                onChange={handleChange} 
              />
              <TextInput 
                label="Original Price" 
                name="oldPrice" 
                type="number" 
                value={product.oldPrice} 
                onChange={handleChange}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput 
                label="Material" 
                name="material" 
                placeholder="E.g., 'Gold Plated' or 'Sterling Silver'" 
                value={product.material} 
                onChange={handleChange}
              />
              <TextInput 
                label="Size/Dimensions" 
                name="size" 
                value={product.size} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="space-y-4">
              <div className="p-6 backdrop-blur-sm bg-blue-50/50 border border-blue-200/30 rounded-xl">
                <UploadImage 
                  label="Update Main Product Image" 
                  name="mainImage" 
                  setImage={(url) => setNewMainImage(url)} 
                />
                {product.image && !newMainImage && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Current Main Image:</p>
                    <img 
                      src={product.image} 
                      alt="Current Main" 
                      className="w-32 h-32 object-cover rounded-xl shadow-lg border border-white/30" 
                    />
                  </div>
                )}
              </div>
              
              <div className="p-6 backdrop-blur-sm bg-blue-50/50 border border-blue-200/30 rounded-xl">
                <UploadImage 
                  label="Update Additional Product Images" 
                  name="additionalImages" 
                  setImage={(urls) => setNewAdditionalImages(urls)} 
                  multiple 
                />
                {product.additionalImages.length > 0 && newAdditionalImages.length === 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Current Additional Images:</p>
                    <div className="flex gap-3 flex-wrap">
                      {product.additionalImages.map((img, index) => (
                        <img 
                          key={index} 
                          src={img} 
                          alt={`Additional ${index + 1}`} 
                          className="w-20 h-20 object-cover rounded-lg shadow-md border border-white/30" 
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Product Description
              </label>
              <textarea
                rows={6}
                name="description"
                id="description"
                value={product.description}
                onChange={handleChange}
                className="w-full px-4 py-3 backdrop-blur-sm bg-white/70 border border-gray-200/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm transition-all duration-200"
                placeholder="Describe the product features, materials, and benefits..."
              />
            </div>
            
            <div className="flex items-center p-4 backdrop-blur-sm bg-yellow-50/50 border border-yellow-200/30 rounded-xl">
              <input
                type="checkbox"
                name="isTrending"
                id="isTrending"
                checked={product.isTrending}
                onChange={handleChange}
                className="h-5 w-5 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="isTrending" className="ml-3 block text-sm font-medium text-gray-900">
                ⭐ Mark as Trending Product
              </label>
            </div>
            
            <div className="flex justify-end pt-4">
              <button 
                type="submit" 
                className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating Product...
                  </div>
                ) : (
                  "Update Product"
                )}
              </button>
            </div>
          </form>
          
          {updateError && (
            <div className="mt-6 p-4 backdrop-blur-sm bg-red-50/80 border border-red-200/50 rounded-xl">
              <div className="flex items-center">
                <i className="ri-error-warning-line text-red-500 text-lg mr-2"></i>
                <p className="text-red-700 text-sm">
                  Error: {updateError.data?.message || "An error occurred while updating the product"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
