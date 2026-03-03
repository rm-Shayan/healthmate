import cloudinary from "@/lib/services/cloudinary";

export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string,
  mimeType: string
) => {

  const base64File = fileBuffer.toString("base64");

  const result = await cloudinary.uploader.upload(
    `data:${mimeType};base64,${base64File}`,
    {
      folder,
      resource_type: "auto",
    }
  );

  console.log("--- CLOUDINARY UPLOAD RESULT ---");
  console.log("Public ID:", result.public_id);
  console.log("Resource Type:", result.resource_type);
  console.log("Format:", result.format);
  console.log("URL:", result.secure_url);

  return result;
};