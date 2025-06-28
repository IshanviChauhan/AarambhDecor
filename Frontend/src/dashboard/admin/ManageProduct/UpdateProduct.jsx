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
];

const metals = [
  { label: "Select Metal", value: "" },
  { label: "18K Gold", value: "18K Gold" },
  { label: "22K Gold", value: "22K Gold" },
  { label: "925 Silver", value: "925 Silver" },
  { label: "Basic Silver", value: "Basic Silver" },
  { label: "Imitate Jewelry", value: "Imitate Jewelry" },
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
    metal: "",
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
        metal: p.metal || "",
        image: p.image || "",
        additionalImages: p.additionalImages || [],
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({ ...product, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProductPayload = {
      ...product,
      image: newMainImage || product.image,
      additionalImages: newAdditionalImages.length > 0 ? newAdditionalImages : product.additionalImages,
      author: user?._id,
    };

    try {
      await updateProduct({ id, ...updatedProductPayload }).unwrap();
      alert("Product updated successfully!");
      navigate("/dashboard/manage-products");
    } catch (err) {
      console.error("Failed to update product:", err);
      alert("Failed to update product.");
    }
  };

  if (isProductLoading) return <p>Loading product...</p>;
  if (fetchError) return <p className="text-red-500">Error fetching product: {fetchError.message}</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Update Product</h2>
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
            <TextInput label="Price" name="price" type="number" value={product.price} onChange={handleChange} />
            <TextInput label="Old Price" name="oldPrice" type="number" value={product.oldPrice} onChange={handleChange}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectInput label="Metal" name="metal" value={product.metal} onChange={handleChange} options={metals}/>
            <TextInput label="Size" name="size" value={product.size} onChange={handleChange} />
        </div>
        <div>
            <UploadImage label="Update Main Image" name="mainImage" setImage={(url) => setNewMainImage(url)} />
            {product.image && !newMainImage && <img src={product.image} alt="Current Main" className="w-32 h-32 object-cover rounded mt-2 shadow-md" />}
        </div>
        <div>
            <UploadImage label="Update Additional Images" name="additionalImages" setImage={(urls) => setNewAdditionalImages(urls)} multiple />
            {product.additionalImages.length > 0 && newAdditionalImages.length === 0 && (
                <div className="flex gap-2 mt-2">
                    {product.additionalImages.map((img, index) => <img key={index} src={img} alt={`Current Additional ${index}`} className="w-20 h-20 object-cover rounded shadow-md" />)}
                </div>
            )}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            rows={6}
            name="description"
            id="description"
            value={product.description}
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
          <label htmlFor="isTrending" className="ml-2 block text-sm text-gray-900">Mark as Trending</label>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark" disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Product"}
          </button>
        </div>
      </form>
      {updateError && <p className="text-red-500 mt-4">Error: {updateError.data?.message || "An error occurred"}</p>}
    </div>
  );
};

export default UpdateProduct;
