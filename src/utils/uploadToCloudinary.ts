export const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dlyfy9dhs"); 
  
    const response = await fetch("https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload", {
      method: "POST",
      body: formData,
    });
  
    const data = await response.json();
  
    if (!response.ok) {
      throw new Error(data.error?.message || "Cloudinary 업로드 실패");
    }
  
    return data.secure_url as string; 
  };