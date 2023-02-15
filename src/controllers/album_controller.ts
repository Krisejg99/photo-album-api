/**
 * Controller Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { connectPhotoToAlbum, createAlbum, deleteAlbum, getAlbum, getAlbums, updateAlbum } from '../services/album_service'

const debug = Debug('photo-album-api:album_controller')

/**
 * Get all albums
 */
export const index = async (req: Request, res: Response) => {
    try {
        const albums = await getAlbums(Number(req.token?.sub))

        res.send({
            status: "success",
            data: albums,
        })
    }
    catch (err) {
        res.status(500).send({
            status: "error",
            message: "Could not get albums in database",
        })
    }
}

/**
 * Get a single album
 */
export const show = async (req: Request, res: Response) => {
    const album_id = Number(req.params.albumId)
    const user_id = Number(req.token?.sub)

    try {
        const album = await getAlbum(album_id, user_id)

        if (!album) {
            return res.status(404).send({ status: "fail", message: `Could not find album with id ${album_id}`, })
        }

        res.send({
            status: "success",
            data: album,
        })
    }
    catch (err) {
        res.status(500).send({
            status: "error",
            message: "Could not get album in database",
        })
    }
}

/**
 * Create an album
 */
export const store = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		})
	}

    const { title } = matchedData(req)

    try {
        const album = await createAlbum({
            title,
            user_id: Number(req.token?.sub),
        })

        res.status(201).send({
            status: "success",
            data: album,
        })
    }
    catch (err) {
        res.status(500).send({
            status: "error",
            message: "Could not create album in database",
        })    
    }
}

/**
 * Update an album
 */
export const update = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		})
	}
    const validatedData = matchedData(req)
    const album_id = Number(req.params.albumId)
    const user_id = Number(req.token?.sub)


    try {
        // Returns null if not found, to be able to send 404 fail with message, instead of going to 'catch'
        const album = await getAlbum(album_id, user_id)

        if (!album) {
            return res.status(404).send({ status: "fail", message: `Could not find album with id ${album_id} to update`, })
        }

        const updatedAlbum = await updateAlbum(album.id, validatedData)

        res.send({
            status: "success",
            data: updatedAlbum,
        })
    }
    catch (err) {
        res.status(500).send({
            status: "error",
            message: "Could not update album in database",
        })
    }
}

/**
 * Delete an album
 */
export const destroy = async (req: Request, res: Response) => {
    const album_id = Number(req.params.albumId)
    const user_id = Number(req.token?.sub)
    try {
        // Returns null if not found, to be able to send 404 fail with message, instead of going to 'catch'
        const album = await getAlbum(album_id, user_id)

        if (!album) {
            return res.status(404).send({ status: "fail", message: `Could not find album with id ${album_id} to delete`, })
        }

        const deletedAlbum = await deleteAlbum(album.id)

        res.send({
            status: "success",
            data: deletedAlbum,
        })
    }
    catch (err) {
        res.status(500).send({
            status: "error",
            message: "Could not update album in database",
        })
    }
}
