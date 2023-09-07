interface IErrorWithStatus {
  message: string
  statusCode: number
  path?: string
}

class CustomError extends Error {
  statusCode: number
  message: string
  path?: string

  constructor({ statusCode, message, path }: IErrorWithStatus) {
    super()
    this.statusCode = statusCode
    this.message = message
    this.path = path
  }
}

export default CustomError
