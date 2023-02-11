/**
 * Type Definitions
 */

export type CreateUserData = {
    email: string,
    password: string,
    first_name: string,
    last_name: string,
}

export type JwtPayload = {
    sub: number,
    email: string,
    first_name: string,
    last_name: string,
    iat?: number,
    exp?: number,
}

export type CreatePhotoData = {
    title: string,
    url: string,
    comment?: string,
}