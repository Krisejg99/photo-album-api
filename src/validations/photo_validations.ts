/**
 * Photo Validations
 */
import { body } from 'express-validator'

export const createPhotoValidations = [
    body('title')
        .isString().withMessage('has to be a string').bail()
        .isLength({ min: 3 }).withMessage('has to be at least 3 chars long'),
    body('url')
        .isURL().withMessage('has to ba a URL'),
    body('comment')
        .optional()
        .isString().withMessage('has to be a string').bail()
        .isLength({ min: 3 }).withMessage('has to be at least 3 chars long'),
]