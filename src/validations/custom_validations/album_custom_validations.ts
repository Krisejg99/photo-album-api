import { getPhoto } from "../../services/photo_service"

/**
 * Album Custom Validations
 */
export const isExistingPhoto = async (photoId: number) => {
    const photo = await getPhoto(photoId)
    if (!photo) {
        return Promise.reject("Could not find photo")
    }
}