import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.warn(`File uploaded successfully: ${response.secure_url}`);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.error(`Failed to upload file: ${error}`);
    fs.unlinkSync(localFilePath);
    return null;
  }
};


const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    const response = await cloudinary.uploader.destroy(publicId);
    console.log(`File deleted successfully from cloudinary: ${response}`);
  } catch (error) {
    console.error(`Failed to delete file: ${error}`);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary  };