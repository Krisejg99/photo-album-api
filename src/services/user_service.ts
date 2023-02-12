/**
 * User Services
 */
import prisma from "../prisma"
import { CreateUserData } from "../types"

export const getUserByEmail = async (email: string) => {
    return await prisma.user.findUnique({ where: { email }})
}

export const getUserById = async (id: number) => {
    return await prisma.user.findUnique({ where: { id }})
}

export const createUser = async (data: CreateUserData) => {
    return await prisma.user.create({ data })
}