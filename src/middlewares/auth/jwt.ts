/**
 * JWT Authentication Middleware
 */
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { JwtPayload } from '../../types'

const debug = Debug('photo-album-api:jwt')

export const validateToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).send({
            status: "fail",
            message: "Authorization required",
        })
    }
    
    const [ authSchema, token ] = req.headers.authorization.split(' ')
    
    if (authSchema.toLocaleLowerCase() !== 'bearer') {
        return res.status(401).send({
            status: "fail",
            message: "Authorization required",
        })
    }
    
    try {
        const payload = (jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || "") as unknown) as JwtPayload
        req.token = payload
    }
    catch (err) {
        return res.status(401).send({
            status: "fail",
            message: "Authorization required",
        })
    }

    next()
}