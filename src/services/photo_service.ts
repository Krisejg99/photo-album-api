/**
 * Photo Services
 */
import prisma from "../prisma"
import { CreatePhotoData } from "../types"

export const getPhotos = async () => {
    return await prisma.photo.findMany()
}

export const getPhoto = async (photoId: number) => {
    return await prisma.photo.findUniqueOrThrow({
        where: {
            id: photoId,
        },
        include: {
            albums: true,
        },
    })
}

export const createPhoto = async (data: CreatePhotoData) => {
    // return await prisma.photo.create({ data })
}