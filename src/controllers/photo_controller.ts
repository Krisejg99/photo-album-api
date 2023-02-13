/**
 * Controller Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createPhoto, getPhoto, getPhotos } from '../services/photo_service'

// Create a new debug instance
const debug = Debug('photo-album-api:photo_controller')

/**
 * Get all photos
 */
export const index = async (req: Request, res: Response) => {
    try {
        const photos = await getPhotos(Number(req.token?.sub))

        res.send({
            status: "success",
            data: photos,
        })
    }
    catch (err) {
        res.status(500).send({
            status: "error",
            message: "Could not get photos in database",
        })
    }
}

/**
 * Get a single photo
 */
export const show = async (req: Request, res: Response) => {
    try {
        const photo = await getPhoto(Number(req.params.photoId))

        res.send({
            status: "success",
            data: photo,
        })
    }
    catch (err) {
        res.status(500).send({
            status: "error",
            message: "Could not get photo in database",
        })
    }
}

/**
 * Create a photo
 */
export const store = async (req: Request, res: Response) => {
    const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		})
	}

    const { title, url, comment } = matchedData(req)

    try {
        const photo = await createPhoto({
            title,
            url,
            comment,
            user_id: Number(req.token?.sub),
        })

        res.status(201).send({
            status: "success",
            data: photo,
        })
    }
    catch (err) {
        res.status(500).send({
            status: "error",
            message: "Could not create photo in database",
        })    
    }
}

/**
 * Update a photo
 */
export const update = async (req: Request, res: Response) => {}

/**
 * Delete a photo
 */
export const destroy = async (req: Request, res: Response) => {}
