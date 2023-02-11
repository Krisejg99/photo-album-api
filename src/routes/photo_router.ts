/**
 * Router Template
 */
import express from 'express'
import { body } from 'express-validator'
import { index, show, store, update, destroy } from '../controllers/photo_controller'
import { createPhotoValidations } from '../validations/photo_validations'
const router = express.Router()

/**
 * GET /photos
 */
router.get('/', index)

/**
 * GET /photos/:photoId
 */
router.get('/:photoId', show)

/**
 * POST /photos
 */
router.post('/', createPhotoValidations, store)

/**
 * PATCH /photos/:photoId
 */
router.patch('/:photoId', [], update)

/**
 * DELETE /photos/:photoId
 */
router.delete('/:photoId', destroy)

export default router
