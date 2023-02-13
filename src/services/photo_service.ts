/**
 * Photo Services
 */
import prisma from '../prisma'
import { CreatePhotoData, UpdatePhotoData } from '../types'

export const getPhotos = async (user_id: number) => {
    return await prisma.photo.findMany({ where: { user_id } })
}

export const getPhoto = async (id: number) => {
    return await prisma.photo.findUnique({ where: { id } })
}

export const createPhoto = async (data: CreatePhotoData) => {
    return await prisma.photo.create({ data })
}

export const updatePhoto = async (id: number, data: UpdatePhotoData) => {
    const photo = await prisma.photo.findUnique({ where: { id } })
    if (!photo) return
    return await prisma.photo.update({ data, where: { id } })
}
