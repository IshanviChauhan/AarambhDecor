import { useState, useEffect } from "react";
import { useFetchDealQuery, useUpdateDealMutation } from "./../../../redux/features/deals/dealsApi";
import axios from "axios";
import { getBaseUrl } from "../../../utils/baseURL";
import UploadImage from "../AddProduct/UploadImage";

const Deals = () => {
  const { data: deal, isLoading, error, refetch } = useFetchDealQuery();
  const [updateDeal, { isLoading: isUpdating }] = useUpdateDealMutation();
  
  const [dealData, setDealData] = useState({
    title: "",
    description: "",
    discount: 0,
    image: "",
    endDate: "",
    categories: [],
    isActive: true
  });
  const [newImage, setNewImage] = useState('');
  const [availableCategories, setAvailableCategories] = useState([]);

  // Fetch available categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/deal/categories`);
        setAvailableCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (deal && deal.endDate) {
      setDealData({
        title: deal.title || "",
        description: deal.description || "",
        discount: deal.discount || 0,
        image: deal.imageUrl || "",
        endDate: deal.endDate ? new Date(deal.endDate).toISOString().substring(0, 16) : "",
        categories: deal.categories || [],
        isActive: deal.isActive !== undefined ? deal.isActive : true
      });
    }
  }, [deal]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDealData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleCategoryChange = (category) => {
    setDealData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const handleImageUpload = (url) => {
    setNewImage(url);
  };

  const handleApplyToProducts = async () => {
    try {
      const response = await axios.post(`${getBaseUrl()}/api/deal/apply-to-products`);
      alert(`Success! Applied deal to ${response.data.affectedProducts} products.`);
      // Refresh deal data to update product count
      refetch();
    } catch (error) {
      console.error("Error applying deal to products:", error);
      alert("Failed to apply deal to products.");
    }
  };

  const handleRemoveFromProducts = async () => {
    try {
      await axios.post(`${getBaseUrl()}/api/deal/remove-from-products`);
      alert("Success! Removed deal from all products.");
      // Refresh deal data to update product count
      refetch();
    } catch (error) {
      console.error("Error removing deal from products:", error);
      alert("Failed to remove deal from products.");
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...dealData,
      image: newImage || dealData.image, // Use new image if uploaded, otherwise keep existing
    };

    try {
      // Update the deal - backend will automatically handle removing old deals and applying new ones
      console.log("Updating deal...");
      const result = await updateDeal(payload).unwrap();
      
      console.log("Deal updated successfully:", result);
      
      // Refresh deal data to ensure UI is up to date
      refetch();
      
      // Provide user feedback based on deal status and categories
      if (dealData.isActive && dealData.categories.length > 0) {
        const productCount = result.applicableProducts || 0;
        alert(`Deal updated successfully! 
        
✅ Removed previous deal from all products
✅ Applied new deal to ${productCount} products in selected categories: ${dealData.categories.join(", ")}

The deal is now active and being applied to products.`);
      } else if (!dealData.isActive) {
        alert(`Deal updated successfully! 
        
✅ Deal has been deactivated
✅ Removed deal discounts from all products

The deal is saved but not active.`);
      } else {
        alert(`Deal updated successfully! 
        
✅ Deal settings saved
⚠️ No categories selected, so no products are affected

Please select categories if you want this deal to apply to products.`);
      }
    } catch (err) {
      console.error("Failed to update deal:", err);
      alert("Failed to update deal. Please try again.");
    }
  };

  if (isLoading) return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6">
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-xl">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-gray-700 font-medium">Loading deal...</span>
        </div>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6">
      <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-xl">
        <div className="text-center">
          <i className="ri-error-warning-line text-4xl text-red-500 mb-4"></i>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Deal</h3>
          <p className="text-red-600">{error.message}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 shadow-xl">
          <h2 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Manage Deals & Banners
          </h2>
          <p className="text-gray-600 mt-2">Update promotional deals and banner content</p>
        </div>

        {/* Deal Form */}
        <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                  Deal Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={dealData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-all duration-200"
                  placeholder="e.g., Summer Sale"
                />
              </div>
              
              <div>
                <label htmlFor="discount" className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount (%)
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={dealData.discount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm font-numeric transition-all duration-200"
                  placeholder="Enter discount percentage"
                />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={dealData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-all duration-200"
                placeholder="Briefly describe the deal"
                rows="4"
              />
            </div>

            {/* Categories Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Applicable Categories
              </label>
              <p className="text-xs text-gray-600 mb-4">Select categories where this deal will be applied</p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {availableCategories.map((category) => (
                  <label key={category} className="flex items-center p-3 backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl cursor-pointer hover:bg-white/70 transition-all duration-200">
                    <input
                      type="checkbox"
                      checked={dealData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                      className="rounded border-gray-300 text-primary focus:ring-primary focus:ring-2 mr-3"
                    />
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
              {dealData.categories.length > 0 && (
                <div className="mt-4 p-3 bg-blue-50/50 border border-blue-200/30 rounded-xl">
                  <p className="text-sm font-medium text-blue-800">
                    Selected Categories: {dealData.categories.join(", ")}
                  </p>
                </div>
              )}
            </div>

            {/* Active Status */}
            <div className="flex items-center justify-between p-4 backdrop-blur-sm bg-white/50 border border-gray-200/50 rounded-xl">
              <div>
                <label htmlFor="isActive" className="text-sm font-semibold text-gray-700">
                  Deal Status
                </label>
                <p className="text-xs text-gray-600">Enable or disable this deal</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={dealData.isActive}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div>
              <label htmlFor="endDate" className="block text-sm font-semibold text-gray-700 mb-2">
                Deal End Date
              </label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={dealData.endDate}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-sm transition-all duration-200"
              />
            </div>
            
            <div className="p-6 backdrop-blur-sm bg-blue-50/50 border border-blue-200/30 rounded-xl">
              <UploadImage
                label="Deal Banner Image"
                name="dealImage"
                setImage={handleImageUpload}
              />
              {dealData.image && !newImage && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Current Banner:</p>
                  <img 
                    src={dealData.image} 
                    alt="Current Deal Banner" 
                    className="w-48 h-auto rounded-xl shadow-lg border border-white/30" 
                  />
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-4">
              <div className="space-x-3">
                {/* <button
                  type="button"
                  onClick={handleApplyToProducts}
                  className="px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                >
                  Apply Deal to Products
                </button>
                <button
                  type="button"
                  onClick={handleRemoveFromProducts}
                  className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-200"
                >
                  Remove Deal from Products
                </button> */}
              </div>
              <button 
                type="submit" 
                className="px-8 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary to-primary-dark rounded-xl hover:from-primary-dark hover:to-primary shadow-lg focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                disabled={isUpdating}
              >
                {isUpdating ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating Deal...
                  </div>
                ) : (
                  "Update Deal"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Deals;
