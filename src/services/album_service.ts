/**
 * Album Services
 */
import prisma from '../prisma'
import { CreateAlbumData, UpdateAlbumData } from '../types'

export const getAlbums = async (user_id: number) => {
    return await prisma.album.findMany({ where: { user_id } })
}

export const getAlbum = async (id: number) => {
    return await prisma.album.findUnique({ where: { id }, include: { photos: true } })
}

export const createAlbum = async (data: CreateAlbumData) => {
    return await prisma.album.create({ data })
}

export const updateAlbum = async (id: number, data: UpdateAlbumData) => {
    return await prisma.album.update({ data, where: { id } })
}

export const deleteAlbum = async (id: number) => {
    return await prisma.album.delete({ where: { id } })
}