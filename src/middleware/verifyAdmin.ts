import { NextFunction, Request, Response } from "express";
import { USER_ROLE } from "../module/user/user.constants";

export const verifyAdmin = (req: Request, res: Response, next:NextFunction)=>{
      const {role} = (req as any).user;
      console.log(role);
      if(role !== USER_ROLE.ADMIN){
        return res.status(303).json({
          success: false,
          message: "Access denied"
        })
      }
      next()
}

// export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
//     const { role } = (req as any).user; // Assuming the user role comes from JWT
//     console.log(role);
    
//     if (role !== 'admin') {
//       return res.status(403).json({ success: false, message: "Access denied" });
//     }
//     next();
//   };