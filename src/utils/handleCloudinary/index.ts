import cloudinary from "../../config/cloudinary";
import { ImportDataType } from "./type";

const handleCloudinary = async (
  isImage: string,
  folderName: string
): Promise<ImportDataType> => {
  try {
     const result = await cloudinary.uploader.upload(isImage, {
      folder: folderName,
     });

     const importData: ImportDataType = {
      secure_url: result.secure_url,
      public_id: result.public_id
     }
     return importData;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error('failed to upload image to cloudinary!');
    };
    throw new Error('unknow error occured!');
  }
};

export default handleCloudinary;