import {Schema, model} from 'mongoose'
import {User, UserModel} from '../types/user.type'

const Users = new Schema<User, UserModel>({
    name:{
        type: String,
        required: true,
        trim: true
    },
    lastName:{
        type: String,
        required: false,
        trim: true
    },
    email:{
        type:String,
        required: true,
        unique: true,
        index: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    }
})

export default model('User', Users)