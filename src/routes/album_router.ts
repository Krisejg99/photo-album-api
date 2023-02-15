/**
 * Album Router
 */
import express from 'express'
import { index,	show, store, update, destroy, } from '../controllers/album_controller'
import { createAlbumValidations } from '../validations/album_validations'
const router = express.Router()

/**
 * GET /albums
 */
router.get('/', index)

/**
 * GET /albums/:albumId
 */
router.get('/:albumId', show)

/**
 * POST /albums
 */
router.post('/', createAlbumValidations, store)

/**
 * PATCH /albums/:albumId
 */
router.patch('/:albumId', update)

/**
 * DELETE /albums/:albumId
 */
router.delete('/:albumId', destroy)

export default router
