import { Strategy, ExtractJwt } from 'passport-jwt'
import { config } from '../../../config/config'
import { extractFromBearer } from '../jwtAuth'
const options = {
  secretOrKey: config.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const JwtStrategy = new Strategy(options, async (payload, next) => {
  //const { jwtFromRequest: token } = options
  return next(null, payload)
})
export default JwtStrategy
