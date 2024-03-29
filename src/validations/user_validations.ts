/**
 * User Validations
 */
import { body } from 'express-validator'
import { isExistingEmail } from './custom_validations/user_custom_validations'

export const createUserValidations = [
    body('email')
        .isString().withMessage("has to be a string").bail()
        .isEmail().withMessage("has to be a valid email")
        .custom(isExistingEmail),
    body('password')
        .isString().withMessage("has to be a string").bail()
        .isLength({ min: 6 }).withMessage("has to be at least 6 chars long"),
    body('first_name')
        .isString().withMessage("has to be a string").bail()
        .trim()
        .isLength({ min: 3 }).withMessage("has to be at least 3 chars long"),
    body('last_name')
        .isString().withMessage("has to be a string").bail()
        .trim()
        .isLength({ min: 3 }).withMessage("has to be at least 3 chars long"),
]

export const loginValidations = [
    body('email')
        .isString().withMessage("has to be a string")
        .isEmail().withMessage("has to be a valid email")
        .custom(isExistingEmail),
    body('password')
        .isString().withMessage("has to be a string")
        .isLength({ min: 6 }).withMessage("has to be at least 6 chars long"),
]