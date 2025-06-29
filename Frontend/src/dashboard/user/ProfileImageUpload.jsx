import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getBaseUrl } from '../../utils/baseURL';
import avatarImg from "../../assets/avatar.png";

const ProfileImageUpload = ({ currentImage, onImageUpdate, className = "" }) => {
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(currentImage || avatarImg);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    // Update preview when currentImage prop changes
    useEffect(() => {
        setPreviewImage(currentImage || avatarImg);
    }, [currentImage]);

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file (JPG, PNG, GIF)');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        try {
            setLoading(true);
            
            // Convert to base64
            const base64 = await convertBase64(file);
            
            // Create preview immediately for better UX
            setPreviewImage(base64);
            
            // Upload to server
            const response = await axios.post(`${getBaseUrl()}/api/uploadImage`, { 
                image: base64 
            });
            
            const imageUrl = response.data;
            
            // Update with final uploaded URL
            setPreviewImage(imageUrl);
            onImageUpdate(imageUrl);
            
            // Show success message
            setUploadSuccess(true);
            setTimeout(() => setUploadSuccess(false), 3000);
            
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
            // Revert to previous image on error
            setPreviewImage(currentImage || avatarImg);
        } finally {
            setLoading(false);
            // Clear the input so same file can be selected again
            event.target.value = '';
        }
    };

    const removeImage = () => {
        setPreviewImage(avatarImg);
        onImageUpdate('');
    };

    return (
        <div className={`relative ${className}`}>
            {/* Hidden File Input */}
            <input
                id="profileImageUpload"
                type="file"
                accept="image/*"
                onChange={uploadImage}
                className="hidden"
                disabled={loading}
            />

            {/* Upload Controls */}
            <div className="mt-1 flex flex-col items-center space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    <label
                        htmlFor="profileImageUpload"
                        className={`group inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-2xl transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                            loading
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg hover:shadow-xl hover:from-primary-dark hover:to-primary'
                        }`}
                    >
                        <div className="flex items-center space-x-2">
                            <div className={`p-1 rounded-full ${loading ? 'bg-gray-300' : 'bg-white/20'}`}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                </svg>
                            </div>
                            <span>{loading ? 'Uploading...' : 'Choose Photo'}</span>
                        </div>
                    </label>

                    {previewImage !== avatarImg && !loading && (
                        <button
                            type="button"
                            onClick={removeImage}
                            className="group inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-2xl hover:bg-red-100 hover:border-red-300 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                        >
                            <div className="flex items-center space-x-2">
                                <div className="p-1 rounded-full bg-red-100 group-hover:bg-red-200 transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </div>
                                <span>Remove</span>
                            </div>
                        </button>
                    )}
                </div>

                {/* Upload Instructions */}
                <div className="text-center">
                    <p className="text-xs text-gray-600 font-medium">
                        Supported: JPG, PNG, GIF • Max: 5MB
                    </p>
                </div>
            </div>
            
            {/* Success Message */}
            {uploadSuccess && (
                <div className="mt-2 p-2 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-xs text-green-600 text-center font-medium">
                        ✓ Photo uploaded successfully!
                    </p>
                </div>
            )}
        </div>
    );
};

ProfileImageUpload.propTypes = {
    currentImage: PropTypes.string,
    onImageUpdate: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default ProfileImageUpload;