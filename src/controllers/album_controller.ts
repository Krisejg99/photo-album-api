/**
 * Controller Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createAlbum, getAlbum, getAlbums, updateAlbum } from '../services/album_service'

const debug = Debug('album-album-api:album_controller')

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
    try {
        const album = await getAlbum(Number(req.params.albumId))

        if (!album || album.user_id !== req.token?.sub) {
            return res.status(401).send({
                status: "fail",
                message: "Authorization required",
            })
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

    try {
        // Returns null if not found, to be able to send 'Authorization required' error, instead of going to 'catch'
        const album = await getAlbum(Number(req.params.albumId))

        if (!album || album.user_id !== req.token?.sub) {
            return res.status(401).send({
                status: "fail",
                message: "Authorization required",
            })
        }

        const result = await updateAlbum(Number(album.id), validatedData)

        res.send({
            status: "success",
            data: result,
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
export const destroy = async (req: Request, res: Response) => {}
