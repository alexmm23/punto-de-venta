import type { Model } from 'mongoose'
import type { Request } from 'express'

export type User = ToClientUser & {
  password: string
  createdAt?: Date
  updatedAt?: Date
}
export type ToClientUser = {
  _id?: string
  name: string
  lastName?: string
  email: string
}
export type UserMethods = {
  toClient: () => ToClientUser
}
export type UserRequestType = Request & {
  user: User
}
export type UserModel = Model<User, {}, UserMethods>
