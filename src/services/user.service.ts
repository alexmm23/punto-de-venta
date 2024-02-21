import Users from '../models/user.model'
import {User} from '../types/user.type'
import boom from '@hapi/boom'

class UserService{
    async create(user: User){
        const newUser = await Users.create(user).catch((error)=>{
            console.log('Could not save user', error)
        })
        return newUser
    }
    async findAll(){
        const users = await Users.find().catch((error)=>{
            console.log('Error while connecting to the DB', error)
        })
        if(!users){
            throw boom.notFound("Users not found")
        }
        return users
    }
}

export default UserService