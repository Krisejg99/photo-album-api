import express from "express"
import album_router from './album_router'
import photo_router from './photo_router'

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
 * /login
 */
router.use('/login')

/**
 * /refresh
 */
router.use('/refresh')

/**
 * /register
 */
router.use('/register')

/**
 * /albums
 */
router.use('/albums', album_router)

/**
 * /photos
 */
router.use('/photos', photo_router)

export default router
