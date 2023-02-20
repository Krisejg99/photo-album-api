/**
 * Photo Validations
 */
import { body } from 'express-validator'

export const createAlbumValidations = [
    body('title')
        .isString().withMessage("has to be a string").bail()
        .trim()
        .isLength({ min: 3 }).withMessage("has to be at least 3 chars long"),
]

export const updateAlbumValidations = [
    // Not optional since it's the only one
    body('title')
        .isString().withMessage("has to be a string").bail()
        .trim()
        .isLength({ min: 3 }).withMessage("has to be at least 3 chars long"),
]

export const connectPhotoValidations = [
    body('photo_id')
        .isInt().withMessage("has to be an integer").bail()
        .not().isString().withMessage("has to be an integer"),

    body('photo_id.*')
        .isInt().withMessage("has to be an integer").bail()
        .not().isString().withMessage("has to be an integer")
        .not().isArray().withMessage("has to be an integer"),
]