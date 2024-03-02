import { Strategy } from 'passport-local'
import UserService from '../../../services/user.service'
import bcrypt from 'bcrypt'
import boom from '@hapi/boom'
import { User } from '../../../types/user.type'

const options = { usernameField: 'email', passwordField: 'password' }
const service = new UserService()

const LocalStrategy = new Strategy(options, async (email, password, next) => {
  try {
    const user: User = await service.findByEmail(email)
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password)
      delete user.password
      if (isMatch) {
        next(null, user)
      } else {
        next(boom.unauthorized('User or password not valid'), false)
      }
    } else {
      next(boom.unauthorized('User or password not valid'), false)
    }
  } catch (error) {
    next(error)
  }
})

export default LocalStrategy
