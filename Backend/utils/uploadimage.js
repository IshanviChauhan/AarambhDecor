const cloudinary = require("cloudinary").v2;

const isCloudinaryConfigured =
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET;

if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

module.exports = (file) => {
  // file = base64 encoded image or video string
  return new Promise((resolve, reject) => {
    if (!isCloudinaryConfigured) {
      const errorMessage =
        "Image upload service is not configured. Please check environment variables.";
      console.error(errorMessage);
      return reject(new Error(errorMessage));
    }

    cloudinary.uploader.upload(file, opts, (error, result) => {
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      }
      console.error(
        "Cloudinary Upload Error:",
        error ? error.message : "An unknown error occurred"
      );
      return reject(new Error(error ? error.message : "Image upload failed"));
    });
  });
};
