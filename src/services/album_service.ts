/**
 * Album Services
 */
import prisma from "../prisma"

export const getAlbums = async (user_id: number) => {
    return await prisma.album.findMany({ where: { user_id } })
}