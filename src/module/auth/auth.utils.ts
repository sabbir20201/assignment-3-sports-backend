import bcryptjs from "bcrypt"




export const isPasswordMatched = async(plainPassword: string, hashedPassword: string): Promise<boolean> => {
    const isMatched = await bcryptjs.compare(plainPassword, hashedPassword)
    return isMatched
}