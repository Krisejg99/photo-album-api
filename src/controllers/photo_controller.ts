/**
 * Controller Template
 */
import Debug from "debug"
import prisma from "../prisma"
import jwt from 'jsonwebtoken'
import { Request, Response } from "express"
import { validationResult } from "express-validator"
import { createPhoto, getPhoto, getPhotos } from "../services/photo_service"
import { JwtPayload } from '../types'
import { refresh } from "./user_controller"
import { getUserById } from "../services/user_service"

// Create a new debug instance
const debug = Debug("photo-album-api:photo_controller")

/**
 * Get all photos
 */
export const index = async (req: Request, res: Response) => {
    try {
        const photos = await getPhotos()

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

    if (!req.headers.authorization) {
		return res.status(401).send({
            status: "fail",
            message: "Authorization required",
        })
	}
    
    const [ authSchema, token ] = req.headers.authorization.split(' ')

    if (authSchema.toLocaleLowerCase() !== 'bearer') {
        return res.status(401).send({
            status: "fail",
            message: "Authorization required",
        })
    }
    
    const decoded_access_token = jwt.decode(token)
    if (!decoded_access_token) {

        return res.status(401).send({
            status: "fail",
            message: "Authorization required",
        })
    }

    const user = await getUserById(Number(decoded_access_token?.sub))
    if (!user) {
        return res.status(401).send({
            status: "fail",
            message: "Authorization required",
        })
    }

    const { title, url, comment } = req.body

    try {
        const photo = await prisma.photo.create({
            data: {
                title,
                url,
                comment,
                user_id: user.id,
            },
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
