import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddProductMutation } from '../../../../src/redux/features/products/productsApi';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useNavigate } from 'react-router-dom';
import Select from "react-select";

const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Mirrors', value: 'Mirrors' },
    { label: 'Table Decor', value: 'Table Decor' },
    { label: 'Tables', value: 'Tables' },
    { label: 'Wall Accents', value: 'Wall Accents' },
    { label: 'Wall Art', value: 'Wall Art' },
    { label: 'Wall Shelves', value: 'Wall Shelves' },
    { label: 'Table Top', value: 'Table Top' }
];

const AddProduct = () => {
    const { user } = useSelector((state) => state.auth);
    const [product, setProduct] = useState({
        name: '',
        category: '',
        price: '',
        oldPrice: '',
        description: '',
        isTrending: false,
        size: '',
        material: '' 
    });
    const [newImage, setNewImage] = useState('');
    const [additionalImages, setAdditionalImages] = useState([]);

    const [addProduct, { isLoading, error }] = useAddProductMutation();
    const navigate = useNavigate();

    // const handleChange = (e) => {
    //     const { name, value, type, checked } = e.target;
    //     setProduct(prevProduct => ({
    //         ...prevProduct,
    //         [name]: type === 'checkbox' ? checked : value
    //     }));
    // };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value
        });
    };
 const handleImageUpload = (url) => {
    setNewImage(url);
  };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!product.name || !product.category || !product.price || !mainImage) {
            alert("Please fill in all required fields: Name, Category, Price, and Main Image.");
            return;
        }
      
        const newProduct = {
          ...product,
          image: newImage || product.image,
          additionalImages,
          author: user?._id, // Ensure author is included
        };
      
        console.log("Submitting Product Data:", newProduct); // Debug payload

        try {
        //   const response = await addProduct(newProduct).unwrap();
          await addProduct(newProduct).unwrap();
          alert("Product added successfully!");
          navigate("/shop");
        } catch (err) {
          console.error("Failed to add product:", err); // Log error details
          alert("Failed to add product.");
        }
      };
      
    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6">
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6">
                    <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 mb-2">Add New Product</h2>
                    <p className="text-gray-600 font-body">Create a new product for your store inventory</p>
                </div>

                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6 sm:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <TextInput
                            label="Product Name"
                            name="name"
                            placeholder="E.g., 'Timeless Round Mirror'"
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
                                label="Price"
                                name="price"
                                type="number"
                                placeholder="50"
                                value={product.price}
                                onChange={handleChange}
                            />
                            <TextInput
                                label="Old Price (Optional)"
                                name="oldPrice"
                                type="number"
                                placeholder="100"
                                value={product.oldPrice}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <TextInput
                                label="Material"
                                name="material"
                                value={product.material}
                                onChange={handleChange}
                                placeholder="E.g., 'Metal'"
                            />
                            <TextInput
                                label="Size"
                                name="size"
                                value={product.size}
                                onChange={handleChange}
                                placeholder="E.g., '12 inch' or 'Small'"
                            />
                        </div>

                        <div className="space-y-4">
                            <UploadImage
                                label="Main Product Image"
                                name="mainImage"
                                setImage={handleImageUpload}
                            />
                            <UploadImage
                                label="Additional Images (Optional)"
                                name="additionalImages"
                                setImage={(urls) => setAdditionalImages(urls)}
                                multiple
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-body font-medium text-gray-700 mb-2">
                                Description
                            </label>
                            <textarea
                                rows={6}
                                name="description"
                                id="description"
                                value={product.description}
                                placeholder="Write a detailed product description..."
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 font-body"
                            />
                        </div>

                        <div className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isTrending"
                                    id="isTrending"
                                    checked={product.isTrending}
                                    onChange={handleChange}
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                />
                                <label htmlFor="isTrending" className="ml-3 block text-sm font-body text-gray-900">
                                    Mark as Trending Product
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex justify-center py-3 px-8 border border-transparent shadow-xl text-sm font-medium rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark transition-all duration-300 hover:scale-105"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Adding...
                                    </>
                                ) : (
                                    <>
                                        <i className="ri-add-line mr-2"></i>
                                        Add Product
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                    {error && (
                        <div className="mt-4 bg-red-100/80 backdrop-blur-sm border border-red-300 rounded-xl p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-body text-red-800">Error adding product: {error.data?.message || 'An error occurred'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
