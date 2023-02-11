/**
 * Controller Template
 */
import Debug from "debug"
import { Request, Response } from "express"
import { validationResult } from "express-validator"
import prisma from "../prisma"

// Create a new debug instance
const debug = Debug("photo-album-api:user_controller")

/**
 * Login a user
 */
export const login = async (req: Request, res: Response) => {}

/**
 * Register a user
 */
export const register = async (req: Request, res: Response) => {}

/**
 * Refresh access_token
 */
export const refresh = async (req: Request, res: Response) => {}
