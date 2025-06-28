import React, { useState } from 'react';
import { useDeleteProductMutation, useFetchAllProductsQuery } from '../../../../src/redux/features/products/productsApi';
import { Link } from 'react-router-dom';
import { formatDate } from './../../../utils/dataFormer';

const ManageProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);

    const { data: { products = [], totalPages = 1, totalProducts = 0 } = {}, error, isLoading, refetch } = useFetchAllProductsQuery({
        page: currentPage,
        limit: productsPerPage
    });

    const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct(id).unwrap();
                alert("Product deleted successfully");
                refetch();
            } catch (error) {
                console.error("Failed to delete the product:", error);
                alert("Failed to delete the product.");
            }
        }
    };

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const startProduct = (currentPage - 1) * productsPerPage + 1;
    const endProduct = startProduct + products.length - 1;

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Failed to load products.</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Manage Products</h2>
                <Link to="/dashboard/add-new-post" className="inline-flex items-center justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark">
                    <i className="ri-add-line -ml-1 mr-2"></i>
                    Add New Product
                </Link>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded-md" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link to={`/shop/${product._id}`} className="text-sm font-medium text-gray-900 hover:text-primary">{product.name}</Link>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {formatDate(product.createdAt)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                                        <Link to={`/dashboard/update-product/${product._id}`} className="text-indigo-600 hover:text-indigo-900 p-1 rounded-md hover:bg-indigo-100 transition">
                                            <i className="ri-edit-2-line text-lg"></i>
                                        </Link>
                                        <button onClick={() => handleDelete(product._id)} disabled={isDeleting} className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-100 transition">
                                            <i className="ri-delete-bin-6-line text-lg"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="px-6 py-4 flex items-center justify-between border-t">
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{startProduct}</span> to <span className="font-medium">{endProduct}</span> of <span className="font-medium">{totalProducts}</span> results
                    </p>
                    <div className="flex-1 flex justify-end">
                        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                            Previous
                        </button>
                        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
