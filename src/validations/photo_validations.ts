/**
 * Photo Validations
 */
import { body } from 'express-validator'

export const createPhotoValidations = [
    body('title')
        .isString().withMessage("has to be a string").bail()
        .trim()
        .isLength({ min: 3 }).withMessage("has to be at least 3 chars long"),
    body('url')
        .isURL().withMessage("has to be a URL"),
    body('comment')
        .optional()
        .isString().withMessage("has to be a string").bail()
        .trim()
        .isLength({ min: 3 }).withMessage("has to be at least 3 chars long"),
]

export const updatePhotoValidations = [
    body('title')
        .optional()
        .isString().withMessage("has to be a string").bail()
        .trim()
        .isLength({ min: 3 }).withMessage("has to be at least 3 chars long"),
    body('url')
        .optional()
        .isURL().withMessage("has to be a URL"),
    body('comment')
        .optional()
        .isString().withMessage("has to be a string").bail()
        .trim()
        .isLength({ min: 3 }).withMessage("has to be at least 3 chars long"),
]