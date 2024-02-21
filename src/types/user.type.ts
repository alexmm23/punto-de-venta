import type {Model} from 'mongoose'

export type User = {
    id? : string
    name: string
    lastName?: string
    email: string 
    password: string
}

export type UserModel = Model<User>