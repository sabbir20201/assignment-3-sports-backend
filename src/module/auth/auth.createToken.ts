import jwt from "jsonwebtoken"

export const createToken = (payload, secret, expireTime)=>{
    return jwt.sign(payload, secret, {
        expiresIn: expireTime
    })
}