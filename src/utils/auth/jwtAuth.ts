import jwt from 'jsonwebtoken'
import { config } from '../../config/config'

const verifyJwt = (token: string) => {
  return jwt.verify(token, config.jwtSecret)
}

const extractFromBearer = (authorization: string) => {
  const token = authorization.split(' ')[1]
  return verifyJwt(token)
}

export { verifyJwt, extractFromBearer }
