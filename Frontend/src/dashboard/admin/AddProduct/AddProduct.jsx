import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddProductMutation } from '../../../../src/redux/features/products/productsApi';
import TextInput from './TextInput';
import SelectInput from './SelectInput';
import UploadImage from './UploadImage';
import { useNavigate } from 'react-router-dom';

const categories = [
    { label: 'Select Category', value: '' },
    { label: 'Mirrors', value: 'Mirrors' },
    { label: 'Table Decor', value: 'Table Decor' },
    { label: 'Tables', value: 'Tables' },
    { label: 'Wall Accents', value: 'Wall Accents' },
    { label: 'Wall Art', value: 'Wall Art' },
    { label: 'Wall Shelves', value: 'Wall Shelves' }
];

const materials= [
    { label: 'Select Material', value: '' },
    { label: '18K Gold', value: '18K Gold' },
    { label: '22K Gold', value: '22K Gold' },
    { label: '925 Silver', value: '925 Silver' },
    { label: 'Basic Silver', value: 'Basic Silver' },
    { label: 'Imitate Jewelry', value: 'Imitate Jewelry' },


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
    const [mainImage, setMainImage] = useState('');
    const [additionalImages, setAdditionalImages] = useState([]);

    const [addProduct, { isLoading, error }] = useAddProductMutation();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const newProduct = {
          ...product,
          image: mainImage,
          additionalImages,
          author: user?._id, // Ensure author is included
        };
      
        try {
          await addProduct(newProduct).unwrap();
          alert("Product added successfully!");
          navigate("/dashboard/manage-products");
        } catch (err) {
          console.error("Failed to add product:", err); // Log error details
          alert("Failed to add product.");
        }
      };
      
    return (
        <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <TextInput
                    label="Product Name"
                    name="name"
                    placeholder="Ex: Golden Sunburst Mirror"
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
                    <SelectInput
                        label="Material"
                        name="material"
                        value={product.material}
                        onChange={handleChange}
                        options={materials}
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
                        setImage={(url) => setMainImage(url)}
                    />
                    <UploadImage
                        label="Additional Images (Optional)"
                        name="additionalImages"
                        setImage={(urls) => setAdditionalImages(urls)}
                        multiple
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        rows={6}
                        name="description"
                        id="description"
                        value={product.description}
                        placeholder="Write a detailed product description..."
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="isTrending"
                        id="isTrending"
                        checked={product.isTrending}
                        onChange={handleChange}
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="isTrending" className="ml-2 block text-sm text-gray-900">
                        Mark as Trending Product
                    </label>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Adding...' : 'Add Product'}
                    </button>
                </div>
            </form>
            {error && <p className="text-red-500 mt-4">Error adding product: {error.data?.message || 'An error occurred'}</p>}
        </div>
    );
};

export default AddProduct;
