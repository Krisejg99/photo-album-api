/**
 * Controller Template
 */
import bcrypt from 'bcrypt'
import Debug from "debug"
import { Request, Response } from "express"
import { matchedData, validationResult } from "express-validator"
import { createUser } from '../services/user_service'

// Create a new debug instance
const debug = Debug("photo-album-api:user_controller")

/**
 * Login a user
 */
export const login = async (req: Request, res: Response) => {}

/**
 * Register a user
 */
export const register = async (req: Request, res: Response) => {
	const validationErrors = validationResult(req)
	if (!validationErrors.isEmpty()) {
		return res.status(400).send({
			status: "fail",
			data: validationErrors.array()
		})
	}

    const validatedData = matchedData(req)
    const hashedPassword = await bcrypt.hash(validatedData.password, process.env.SALT_ROUNDS || 10)
    validatedData.password = hashedPassword

    const { email, password, first_name, last_name } = validatedData

    try {
        await createUser({
            email,
            password,
            first_name,
            last_name,
        })

        res.status(201).send({
            status: "success",
            data: {
                email,
                first_name,
                last_name,
            },
        })
    }
    catch (err) {
        res.status(500).send({
            status: "error",
            message: "Could not create user in database",
        })
    }
}

/**
 * Refresh access_token
 */
export const refresh = async (req: Request, res: Response) => {}
