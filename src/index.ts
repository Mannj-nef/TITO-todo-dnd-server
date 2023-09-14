import express from 'express'
import { API_DEVELOPMENT } from './configs/envs'
import router from './routers'
import corsConfig from './configs/cors'
import cors from 'cors'
import database from './databases'
import exceptionHandling from './middlewares/errors'

// Start server
const startServer = async () => {
  try {
    await database.connectDb()

    const app = express()
    const port = API_DEVELOPMENT.PORT || 3083

    // config cors
    app.use(cors(corsConfig))

    // body parser
    app.use(express.json())

    // router
    app.use(router)

    // handle error
    app.use(exceptionHandling)

    // database.refreshTokens.deleteMany({
    //   user_id: new ObjectId('64f82da405e0161caf15d670')
    // })

    // listern port
    app.listen(port, () => {
      console.log(`server listion on port ${port}`)
    })
  } catch (error) {
    throw Error
    process.exit(0)
  }
}

startServer()
