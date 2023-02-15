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
    const photo_id = Number(req.params.photoId)
    const user_id = Number(req.token?.sub)

    try {
        const photo = await getPhoto(photo_id, user_id)

        if (!photo) {
            return res.status(404).send({ status: "fail", message: `Could not find photo with id ${photo_id}`, })
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
    const photo_id = Number(req.params.photoId)
    const user_id = Number(req.token?.sub)

    try {
        // Returns null if not found, to be able to send 404 fail with message, instead of going to 'catch'
        const photo = await getPhoto(photo_id, user_id)

        if (!photo) {
            return res.status(404).send({ status: "fail", message: `Could not find photo with id ${photo_id} to update`, })
        }

        const updatedPhoto = await updatePhoto(photo.id, validatedData)

        res.send({
            status: "success",
            data: updatedPhoto,
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
    const photo_id = Number(req.params.photoId)
    const user_id = Number(req.token?.sub)

    try {
        // Returns null if not found, to be able to send 404 fail with message, instead of going to 'catch'
        const photo = await getPhoto(photo_id, user_id)

        if (!photo) {
            return res.status(404).send({ status: "fail", message: `Could not find photo with id ${photo_id} to delete`, })
        }

        const deletedPhoto = await deletePhoto(photo.id)

        res.send({
            status: "success",
            data: deletedPhoto,
        })
    }
    catch (err) {
        res.status(500).send({
            status: "error",
            message: "Could not update photo in database",
        })
    }
}
