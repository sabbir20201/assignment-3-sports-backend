// import { request, Request, Response } from "express";
// import { UserServices} from "./user.service";

// const signUp = async (req: Request, res: Response) => {
//     try {
//         const userData = req.body;
//         const isUserExist = await UserServices.findUserByEmail(userData.email)
//         if(isUserExist){
//             throw new Error("User already exist")
//         }
//         const result = await UserServices.signUpIntoDB(userData)

//         res.status(200).json({
//             success: true,
//             message: 'create a  users successfully',
//             data: result
//         })
        
//     } catch (error) {
//         console.log(error);
        
//     }

// }
// const login = async(req:Request, res: Response)=>{
//   try {
//     const data = req.body
//     const isUserExist = await UserServices.findUserByEmail(data.email)
//     if(!isUserExist){
//         throw new Error('user not found')
//     }

//     const userData = {
//         email: isUserExist.email,
//         role: isUserExist.role
//     }
//     res.status(200).json({
//         success: true,
//         message:'user login successfully',
//         data: data
//     })
//   } catch (error) {
//     console.log(error);
    
//   }
// }
//  const getAllUser = async(req:Request, res: Response)=>{
//       try {
//         const result = await UserServices.getAllUserFromDB()
//         res.status(200).json({
//             success: true,
//             message: 'get all users',
//             data: result
//         })

//       } catch (error) {
//         console.log(error);
//       }
//  }

// export const UserController = {
//     signUp,
//     getAllUser,
//     login
// } 