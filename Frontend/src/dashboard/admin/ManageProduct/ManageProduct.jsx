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

    if (isLoading) return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-gray-700 font-body">Loading products...</p>
            </div>
        </div>
    );
    
    if (error) return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-8 text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-red-600 font-body">Failed to load products.</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary/10 via-white to-primary/5 p-4 sm:p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900">Manage Products</h2>
                            <p className="text-gray-600 font-body mt-1">View, edit, and manage your product inventory</p>
                        </div>
                        <Link to="/dashboard/add-new-post" className="inline-flex items-center justify-center py-3 px-6 border border-transparent shadow-lg text-sm font-medium rounded-xl text-white bg-primary hover:bg-primary-dark transition-all duration-300 hover:scale-105">
                            <i className="ri-add-line -ml-1 mr-2"></i>
                            Add New Product
                        </Link>
                    </div>
                </div>

                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl overflow-hidden">
                    {/* Mobile view - Card layout */}
                    <div className="block sm:hidden">
                        <div className="p-4 space-y-4">
                            {products.map((product) => (
                                <div key={product._id} className="bg-white/30 backdrop-blur-sm border border-white/40 rounded-xl p-4 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-start space-x-4">
                                        <img src={product.image} alt={product.name} className="h-16 w-16 object-cover rounded-lg flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/shop/${product._id}`} className="text-lg font-heading font-semibold text-gray-900 hover:text-primary block mb-1">{product.name}</Link>
                                            <p className="text-sm text-gray-600 font-body mb-3">{formatDate(product.createdAt)}</p>
                                            <div className="flex space-x-2">
                                                <Link to={`/dashboard/update-product/${product._id}`} className="inline-flex items-center px-3 py-1.5 border border-primary/30 text-primary bg-primary/10 hover:bg-primary/20 rounded-lg text-sm font-medium transition-all duration-300">
                                                    <i className="ri-edit-2-line mr-1"></i>
                                                    Edit
                                                </Link>
                                                <button onClick={() => handleDelete(product._id)} disabled={isDeleting} className="inline-flex items-center px-3 py-1.5 border border-red-300 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-all duration-300">
                                                    <i className="ri-delete-bin-6-line mr-1"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Desktop view - Table layout */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="min-w-full">
                            <thead>
                                <tr className="border-b border-white/20">
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Date Added</th>
                                    <th scope="col" className="px-6 py-4 text-center text-xs font-body font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-white/10 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded-lg shadow-md" />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Link to={`/shop/${product._id}`} className="text-sm font-heading font-medium text-gray-900 hover:text-primary transition-colors duration-200">{product.name}</Link>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-body text-gray-600">
                                            {formatDate(product.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <div className="flex items-center justify-center space-x-2">
                                                <Link to={`/dashboard/update-product/${product._id}`} className="inline-flex items-center justify-center w-8 h-8 text-primary bg-primary/20 hover:bg-primary/30 rounded-lg transition-all duration-300 hover:scale-110">
                                                    <i className="ri-edit-2-line text-sm"></i>
                                                </Link>
                                                <button onClick={() => handleDelete(product._id)} disabled={isDeleting} className="inline-flex items-center justify-center w-8 h-8 text-red-600 bg-red-100 hover:bg-red-200 rounded-lg transition-all duration-300 hover:scale-110">
                                                    <i className="ri-delete-bin-6-line text-sm"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="bg-white/30 backdrop-blur-sm border-t border-white/20 px-6 py-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <p className="text-sm font-body text-gray-700">
                                Showing <span className="font-numeric font-medium">{startProduct}</span> to <span className="font-numeric font-medium">{endProduct}</span> of <span className="font-numeric font-medium">{totalProducts}</span> results
                            </p>
                            <div className="flex space-x-2">
                                <button 
                                    onClick={() => handlePageChange(currentPage - 1)} 
                                    disabled={currentPage === 1} 
                                    className="relative inline-flex items-center px-4 py-2 border border-white/30 text-sm font-medium rounded-xl text-gray-700 bg-white/50 hover:bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                    <i className="ri-arrow-left-line mr-2"></i>
                                    Previous
                                </button>
                                <button 
                                    onClick={() => handlePageChange(currentPage + 1)} 
                                    disabled={currentPage === totalPages} 
                                    className="relative inline-flex items-center px-4 py-2 border border-white/30 text-sm font-medium rounded-xl text-gray-700 bg-white/50 hover:bg-white/70 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                >
                                    Next
                                    <i className="ri-arrow-right-line ml-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageProducts;
