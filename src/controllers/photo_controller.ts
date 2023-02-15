/**
 * Controller Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { matchedData, validationResult } from 'express-validator'
import { createPhoto, deletePhoto, getPhoto, getPhotos, updatePhoto } from '../services/photo_service'

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

        if (!photo) {
            return res.status(404).send({ status: "fail", message: "Could not find photo", })
        }

        if (photo.user_id !== req.token?.sub) {
            return res.status(401).send({ status: "fail", message: "Authorization required", })
        }

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
        const photo = await getPhoto(Number(req.params.photoId))

        if (!photo) {
            return res.status(404).send({ status: "fail", message: "Could not find photo to update", })
        }

        if (photo.user_id !== req.token?.sub) {
            return res.status(401).send({ status: "fail", message: "Authorization required", })
        }

        const result = await updatePhoto(Number(photo.id), validatedData)

        res.send({
            status: "success",
            data: result,
        })
    }
    catch (err) {
        res.status(500).send({
            status: "error",
            message: "Could not update photo in database",
        })
    }
}

/**
 * Delete a photo
 */
export const destroy = async (req: Request, res: Response) => {
    try {
        // Returns null if not found, to be able to send 'Authorization required' error, instead of going to 'catch'
        const photo = await getPhoto(Number(req.params.photoId))

        if (!photo) {
            return res.status(404).send({ status: "fail", message: "Could not find photo to delete", })
        }

        if (photo.user_id !== req.token?.sub) {
            return res.status(401).send({ status: "fail", message: "Authorization required", })
        }

        const result = await deletePhoto(Number(photo.id))

        res.send({
            status: "success",
            data: result,
        })
    }
    catch (err) {
        res.status(500).send({
            status: "error",
            message: "Could not update photo in database",
        })
    }
}
