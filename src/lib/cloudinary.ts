export const cloudinaryConfig = {
    cloudName: 'damgnsraa',
    uploadPreset: 'portfolio_uploads',
};

// Upload file to Cloudinary
export async function uploadToCloudinary(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);
    // Note: unauthenticated uploads rely on the preset for access control.
    // Make sure your Cloudinary Settings > Security > "PDF and ZIP files delivery" is unchecked (public).

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/auto/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw error;
    }
}

// Upload image specifically
export async function uploadImage(file: File): Promise<string> {
    return uploadToCloudinary(file);
}

// Upload PDF (for CV) - using 'raw' to avoid image delivery restrictions
export async function uploadPDF(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', cloudinaryConfig.uploadPreset);

    try {
        // Use 'raw' resource type for documents
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/raw/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Upload failed');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Cloudinary PDF upload error:', error);
        throw error;
    }
}
