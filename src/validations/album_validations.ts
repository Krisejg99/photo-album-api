/**
 * Photo Validations
 */
import { body } from 'express-validator'
import { isExistingPhoto } from './custom_validations/album_custom_validations'

export const createAlbumValidations = [
    body('title')
        .isString().withMessage("has to be a string").bail()
        .isLength({ min: 3 }).withMessage("has to be at least 3 chars long"),
]

export const updateAlbumValidations = [
    // Not optional since it's the only one
    body('title')
        .isString().withMessage("has to be a string").bail()
        .isLength({ min: 3 }).withMessage("has to be at least 3 chars long"),
]

export const connectPhotoValidations = [
    body('photo_id')
    .isInt().withMessage("has to be a number")
    .not().isString().withMessage("has to be a number").bail()
    .custom(isExistingPhoto),
]