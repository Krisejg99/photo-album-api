/**
 * Album Router
 */
import express from 'express'
import { index,	show, store, update, destroy, connect, disconnect } from '../controllers/album_controller'
import { connectPhotoValidations, createAlbumValidations, updateAlbumValidations } from '../validations/album_validations'
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
router.patch('/:albumId', updateAlbumValidations, update)

/**
 * DELETE /albums/:albumId
 */
router.delete('/:albumId', destroy)

/**
 * POST /albums/:albumId/photos
 */
router.post('/:albumId/photos', connectPhotoValidations, connect)

/**
 * DELETE /albums/:albumId/photos/:photoId
 */
router.delete('/:albumId/photos/:photoId', disconnect)

export default router
