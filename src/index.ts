import express from 'express'
import { API_DEVELOPMENT } from './configs/envs'
import router from './routers'
import corsConfig from './configs/cors'
import cors from 'cors'

const app = express()
const port = API_DEVELOPMENT.PORT || 3083

// config cors
app.use(cors(corsConfig))

// body parser
app.use(express.json())

// router
app.use(router)

// listern port
app.listen(port, () => {
  console.log(`server listion on port ${port}`)
})
