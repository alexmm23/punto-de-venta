import { Schema, model } from 'mongoose'
import { User, UserMethods, UserModel } from '../types/user.type'

const Users = new Schema<User, UserModel, UserMethods>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: false,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  }
})

Users.methods.toClient = function () {
  return {
    id: this._id as unknown as string,
    name: this.name,
    email: this.email,
    lastName: this.lastName
  }
}

export default model('User', Users)
