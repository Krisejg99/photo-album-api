/**
 * Photo Services
 */
import prisma from '../prisma'
import { CreatePhotoData, UpdatePhotoData } from '../types'

export const getPhotos = async (user_id: number) => {
    return await prisma.photo.findMany({ where: { user_id } })
}

export const getPhoto = async (id: number, user_id: number) => {
    return await prisma.photo.findFirst({ where: { id, user_id } })
}

export const createPhoto = async (data: CreatePhotoData) => {
    return await prisma.photo.create({ data })
}

export const updatePhoto = async (id: number, data: UpdatePhotoData) => {
    return await prisma.photo.update({ data, where: { id } })
}

export const deletePhoto = async (id: number) => {
    return await prisma.photo.delete({ where: { id } })
}