import { sha256 } from 'js-sha256';
import { sha1 } from 'js-sha1';

import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function uplaodImage(imageFile: File, categoryName: string, id: string) {
    let src: string;
    let success: boolean
    try {
        const data = new FormData();
        data.append("file", imageFile);
        data.append("upload_preset", "ml_default");
        data.append("folder", categoryName.toString());
        data.append("public_id", id.toString());
        data.append("tags", categoryName.toString()); // Agregar tags (separados por comas)

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/dp2zvk0tj/image/upload",
            {
                method: "POST",
                body: data
            }
        );

        const { secure_url } = await res.json();
        src = secure_url;
        success = true;

    } catch (error) {
        console.error("Error al subir la imagen a Cloudinary:", error);
        console.log(error)
        src = "";
        success = false
    }

    return {
        src,
        success
    };

}



export async function destroyImage(id: string, category: string) {
    const publicId = `${category}/${id}`

    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log('Imagen eliminada:', result);
        return result;
    } catch (error) {
        console.error('Error al eliminar la imagen:', error);
        throw error;
    }
}

