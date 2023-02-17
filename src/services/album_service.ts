/**
 * Album Services
 */
import Debug from 'debug'
import prisma from '../prisma'
import { CreateAlbumData, UpdateAlbumData } from '../types'

const debug = Debug('photo-album-api:album_service')

/**
 * 
 * @param user_id number
 * @returns all albums with the given user_id
 */
export const getAlbums = async (user_id: number) => {
    return await prisma.album.findMany({ where: { user_id } })
}

/**
 * 
 * @param id album_id, number
 * @param user_id number
 * @returns the album with the given params
 */
export const getAlbum = async (id: number, user_id: number) => {
    return await prisma.album.findFirst({ where: { id, user_id }, include: { photos: true } })
}

/**
 * 
 * @param data - { title: string, user_id: number }
 * @returns the created album
 */
export const createAlbum = async (data: CreateAlbumData) => {
    return await prisma.album.create({ data })
}

/**
 * 
 * @param id number
 * @param data - { title?: string }
 * @returns the updated album
 */
export const updateAlbum = async (id: number, data: UpdateAlbumData) => {
    return await prisma.album.update({ data, where: { id } })
}

/**
 * 
 * @param id number
 * @returns the deleted album
 */
export const deleteAlbum = async (id: number) => {
    return await prisma.album.delete({ where: { id } })
}

/**
 * 
 * @param album_id number
 * @param photo_ids number
 * @returns the album and all its photos
 */
export const addPhotoToAlbum = async (album_id: number, photo_ids: object) => {
    return await prisma.album.update({
        where: {
            id: album_id,
        },
        data: {
            photos: {
                connect: photo_ids,
            },
        },
        include: {
            photos: true,
        },
    })
}
