/**
 * Photo Services
 */
import Debug from 'debug'
import prisma from '../prisma'
import { CreatePhotoData, UpdatePhotoData } from '../types'

const debug = Debug('photo-album-api:photo_service')

/**
 * 
 * @param user_id number
 * @returns all photos with the given user_id
 */
export const getPhotos = async (user_id: number) => {
    return await prisma.photo.findMany({ where: { user_id } })
}

/**
 * 
 * @param id number
 * @param user_id number
 * @returns the photo with the given params
 */
export const getPhoto = async (id: number, user_id: number) => {
    return await prisma.photo.findFirst({ where: { id, user_id } })
}

/**
 * 
 * @param data - { title: string, url: string, comment?: string, user_id: number }
 * @returns the created photo
 */
export const createPhoto = async (data: CreatePhotoData) => {
    return await prisma.photo.create({ data })
}

/**
 * 
 * @param id number
 * @param data - { title?: string, url?: string, comment?: string, }
 * @returns the updated photo
 */
export const updatePhoto = async (id: number, data: UpdatePhotoData) => {
    return await prisma.photo.update({ data, where: { id } })
}

/**
 * 
 * @param id number
 * @returns the deleted photo
 */
export const deletePhoto = async (id: number) => {
    return await prisma.photo.delete({ where: { id } })
}

/**
 * 
 * @param user_id number
 * @param photo_ids number[]
 * @returns an array of all existing photos with the given photo_ids and user_id
 */
export const lookForPhotos = async (user_id: number, photo_ids: number[]) => {
    return prisma.photo.findMany({
        where: {
            user_id,
            id: {
                in: photo_ids,
            },
        },
    })
}