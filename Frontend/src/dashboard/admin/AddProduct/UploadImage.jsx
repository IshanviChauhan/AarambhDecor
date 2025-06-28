import React, { useState } from 'react';
import axios from 'axios';
import { getBaseUrl } from '../../../utils/baseURL';

const UploadImage = ({ label, name, setImage, multiple = false }) => {
    const [loading, setLoading] = useState(false);
    const [urls, setUrls] = useState([]);
    const [error, setError] = useState('');

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => resolve(fileReader.result);
            fileReader.onerror = (error) => reject(error);
        });
    };

    const uploadSingleImage = (base64) => {
        setLoading(true);
        setError('');
        return axios
            .post(`${getBaseUrl()}/api/uploadImage`, { image: base64 })
            .then((res) => {
                const imageUrl = res.data;
                setUrls((prev) => [...prev, imageUrl]);
                return imageUrl;
            })
            .catch((err) => {
                console.error(err);
                setError('Image upload failed. Please try again.');
                return null;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const uploadImages = async (event) => {
        const files = Array.from(event.target.files);
        if (files.length === 0) return;

        setUrls([]); // Reset previous uploads for this component instance
        const uploadedUrls = [];

        for (const file of files) {
            const base64 = await convertBase64(file);
            const url = await uploadSingleImage(base64);
            if (url) {
                uploadedUrls.push(url);
            }
        }

        if (uploadedUrls.length > 0) {
            setImage(multiple ? uploadedUrls : uploadedUrls[0]);
        }
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                    <i className="ri-image-add-line text-4xl text-gray-400"></i>
                    <div className="flex text-sm text-gray-600">
                        <label
                            htmlFor={name}
                            className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-dark focus-within:outline-none"
                        >
                            <span>Upload files</span>
                            <input onChange={uploadImages} name={name} id={name} type="file" className="sr-only" multiple={multiple} accept="image/*" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
            </div>
            {loading && <p className="mt-2 text-sm text-blue-600">Uploading...</p>}
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            {urls.length > 0 && (
                <div className="mt-4">
                    <p className="text-sm font-medium text-green-600 mb-2">Upload successful!</p>
                    <div className="flex flex-wrap gap-4">
                        {urls.map((url, index) => (
                            <img key={index} src={url} alt={`Uploaded preview ${index + 1}`} className="w-24 h-24 object-cover rounded-md shadow-md" />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
