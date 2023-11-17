import axios from 'axios'
import jwt from 'jsonwebtoken'
import { OAUTH_2_GOOGLE } from '~/configs/envs/'
import { IGetTokenOauthRequest } from '~/types/request/oauth'

export const getInforUser = async (code: string) => {
  const requestBody: IGetTokenOauthRequest = {
    code,
    client_id: OAUTH_2_GOOGLE.CLIENT_ID,
    client_secret: OAUTH_2_GOOGLE.CLINET_SECRET,
    redirect_uri: OAUTH_2_GOOGLE.REDIRECT_SERVER,
    grant_type: 'authorization_code'
  }

  const { data } = await axios.post(OAUTH_2_GOOGLE.TOKEN_URL, requestBody)

  const decoded_token = jwt.decode(data.id_token)

  return decoded_token
}
