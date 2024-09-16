// import { TUser } from "./user.interface"
// import { User } from "./user.model"

// const findUserByEmail = async(email: string)=>{
//     const result = await User.findOne({email: email})
//     return result
// }

// const signUpIntoDB = async(payload: TUser)=>{
//     const user = new User(payload)
//     const result = await user.save()
//     return result
// }
// const  getAllUserFromDB = async()=>{
//     const result = User.find()
//     return result
// }
// export const UserServices = {
//     findUserByEmail,
//     signUpIntoDB,
//     getAllUserFromDB
// }