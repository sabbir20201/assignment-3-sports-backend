import { NextFunction, Request, Response } from "express"
import { AnyZodObject } from "zod"

const validateRequest = (schema: AnyZodObject) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync(req.body)
            next();
        } catch (error) {
            next(error)
            // console.log("error from try catch",error);
            
        }
    }
}

export default validateRequest


// ZodError: [
//     {
//       "code": "invalid_type",
//       "expected": "string",
//       "received": "undefined",
//       "path": [
//         "location"
//       ],
//       "message": "Required"
//     }
//   ]
//       at Object.get error [as error] (F:\level-2.0\assignment\assignment-3\node_modules\zod\lib\types.js:55:31)
//       at ZodObject.parseAsync (F:\level-2.0\assignment\assignment-3\node_modules\zod\lib\types.js:183:22)
//       at processTicksAndRejections (node:internal/process/task_queues:95:5) {
//     issues: [
//       {
//         code: 'invalid_type',
//         expected: 'string',
//         received: 'undefined',
//         path: [Array],
//         message: 'Required'
//       }
//     ],
//     addIssue: [Function (anonymous)],
//     addIssues: [Function (anonymous)],
//     errors: [
//       {
//         code: 'invalid_type',
//         expected: 'string',
//         received: 'undefined',
//         path: [Array],
//         message: 'Required'
//       }
//     ]
//   }
  