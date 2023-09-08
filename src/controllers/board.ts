import { Request, Response } from 'express'

const boardController = {
  getBoard: (req: Request, res: Response) => {
    console.log(req.body)

    return res.json({
      message: 'success'
    })
  }
}

export default boardController
