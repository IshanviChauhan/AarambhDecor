import React, { useState, useEffect } from "react";
import { useFetchDealQuery, useUpdateDealMutation } from "./../../../redux/features/deals/dealsApi";
import axios from "axios";
import { getBaseUrl } from "../../../utils/baseURL";
import UploadImage from "../AddProduct/UploadImage";

const Deals = () => {
  const { data: deal, isLoading, error } = useFetchDealQuery();
  const [updateDeal, { isLoading: isUpdating }] = useUpdateDealMutation();
  
  const [dealData, setDealData] = useState({
    title: "",
    description: "",
    discount: 0,
    image: "",
    endDate: ""
  });
  const [newImage, setNewImage] = useState('');

  useEffect(() => {
    if (deal && deal.endDate) {
      setDealData({
        title: deal.title || "",
        description: deal.description || "",
        discount: deal.discount || 0,
        image: deal.imageUrl || "",
        endDate: deal.endDate ? new Date(deal.endDate).toISOString().substring(0, 16) : "",
      });
    }
  }, [deal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDealData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (url) => {
    setNewImage(url);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...dealData,
      image: newImage || dealData.image, // Use new image if uploaded, otherwise keep existing
    };

    try {
      await updateDeal(payload).unwrap();
      alert("Deal updated successfully!");
    } catch (err) {
      console.error("Failed to update deal:", err);
      alert("Failed to update deal.");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading deal: {error.message}</p>;

  return (
    <div className="deals-admin">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Deals & Banners</h2>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={dealData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="e.g., Summer Sale"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={dealData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
            placeholder="Briefly describe the deal"
            rows="3"
          />
        </div>
        <div>
          <label htmlFor="discount" className="block text-sm font-medium text-gray-700">Discount (%)</label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={dealData.discount}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="datetime-local"
            id="endDate"
            name="endDate"
            value={dealData.endDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>
        
        <div>
            <UploadImage
                label="Deal Banner Image"
                name="dealImage"
                setImage={handleImageUpload}
            />
            {dealData.image && !newImage && (
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700">Current Image:</p>
                    <img src={dealData.image} alt="Current Deal Banner" className="mt-2 w-48 h-auto rounded-md shadow-md" />
                </div>
            )}
        </div>

        <div className="flex justify-end">
          <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Deal"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Deals;
