import Users from '../models/user.model'
import { User } from '../types/user.type'
import boom from '@hapi/boom'
import bcrypt from 'bcrypt'

class UserService {
  async create(user: User) {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = await Users.create({
      ...user,
      password: hashedPassword
    }).catch((error) => {
      console.log('Could not save user', error)
    })
    if (!newUser) {
      throw boom.badRequest('Could not create user')
    }
    return newUser
  }
  async findAll() {
    const users = await Users.find().catch((error) => {
      console.log('Error while connecting to the DB', error)
    })
    if (!users) {
      throw boom.notFound('Users not found')
    }
    return users
  }
  async findByEmail(email: string) {
    const user = await Users.findOne({ email }).catch((error) => {
      console.log('Error while connecting to the DB', error)
    })
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user
  }
}

export default UserService
