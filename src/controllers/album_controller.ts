/**
 * Controller Template
 */
import Debug from 'debug'
import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { getAlbums } from '../services/album_service'

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
export const show = async (req: Request, res: Response) => {}

/**
 * Create an album
 */
export const store = async (req: Request, res: Response) => {}

/**
 * Update an album
 */
export const update = async (req: Request, res: Response) => {}

/**
 * Delete an album
 */
export const destroy = async (req: Request, res: Response) => {}
