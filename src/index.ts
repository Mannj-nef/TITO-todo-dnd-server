import express from 'express'
import { API_DEVELOPMENT } from './configs/envs'
import router from './routers'
import corsConfig from './configs/cors'
import cors from 'cors'
import connectDb from './databases'

const app = express()
const port = API_DEVELOPMENT.PORT || 3083

// config cors
app.use(cors(corsConfig))

connectDb()

// body parser
app.use(express.json())

// router
app.use(router)

// listern port
app.listen(port, () => {
  console.log(`server listion on port ${port}`)
})
