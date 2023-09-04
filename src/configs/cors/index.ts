import { API_DEVELOPMENT, API_PRODUCTION } from '../envs'

const corsConfig = {
  origin: [API_DEVELOPMENT.PORT, API_PRODUCTION.CLIENT_URL],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  credentials: true
}

export default corsConfig
