import { ZodError } from "zod"

const handleZodError = (err: ZodError)=>{
    const handleError = err.issues.map(error => {
        return {
          path: error.path[error.path.length -1],
          message: error.message
        }
      })
      const statusCode = 404;
      return {
        statusCode,
        message: err.name,
        errorSources: handleError
      }
}
  export default handleZodError