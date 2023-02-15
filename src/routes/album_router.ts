/**
 * Router Template
 */
import express from 'express'
import { index,	show, store, update, destroy, } from '../controllers/album_controller'
import { createAlbumValidations } from '../validations/album_validations'
const router = express.Router()

/**
 * GET /resource
 */
router.get('/', index)

/**
 * GET /resource/:resourceId
 */
router.get('/:resourceId', show)

/**
 * POST /resource
 */
router.post('/', createAlbumValidations, store)

/**
 * PATCH /resource/:resourceId
 */
router.patch('/:resourceId', update)

/**
 * DELETE /resource/:resourceId
 */
router.delete('/:resourceId', destroy)

export default router
