/**
 * Album Services
 */
import prisma from "../prisma"
import { CreateAlbumData } from "../types"

export const getAlbums = async (user_id: number) => {
    return await prisma.album.findMany({ where: { user_id } })
}

export const createAlbum = async (data: CreateAlbumData) => {
    return await prisma.album.create({ data })
}