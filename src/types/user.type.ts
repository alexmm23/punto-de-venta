import type { Model } from 'mongoose'
import type { Request } from 'express'

export type User = {
  id?: string
  name: string
  lastName?: string
  email: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}

export type UserRequestType = Request & {
  user: User
}
export type UserModel = Model<User>
