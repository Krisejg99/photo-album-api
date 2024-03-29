import express from 'express'
import album_router from './album_router'
import photo_router from './photo_router'
import { register, login, refresh } from '../controllers/user_controller'
import { createUserValidations, loginValidations } from '../validations/user_validations'
import { validateToken } from '../middlewares/auth/jwt'

// instantiate a new router
const router = express.Router()

/**
 * GET /
 */
router.get('/', (req, res) => {
	res.send({
		message: "I AM API, BEEP BOOP",
	})
})

/**
 * POST /login
 */
router.post('/login', loginValidations, login)

/**
 * POST /refresh
 */
router.post('/refresh', refresh)

/**
 * POST /register
 */
router.post('/register', createUserValidations, register)

/**
 * /albums
 */
router.use('/albums', validateToken, album_router)

/**
 * /photos
 */
router.use('/photos', validateToken, photo_router)

export default router
