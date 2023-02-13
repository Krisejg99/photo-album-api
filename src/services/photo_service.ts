/**
 * Photo Services
 */
import prisma from '../prisma'
import { CreatePhotoData } from '../types'

export const getPhotos = async (user_id: number) => {
    return await prisma.photo.findMany({ where: { user_id } })
}

export const getPhoto = async (id: number) => {
    return await prisma.photo.findUnique({ where: { id } })
}

export const createPhoto = async (data: CreatePhotoData) => {
    return await prisma.photo.create({ data })
}