/**
 * User Custom Validations
 */
import { getUserByEmail } from '../../services/user_service'

export const isValidEmail = async (email: string) => {
    const user = await getUserByEmail(email)
    if (user) {
        return Promise.reject("Email already in use")
    }
}