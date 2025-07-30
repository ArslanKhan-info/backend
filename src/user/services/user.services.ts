import { RootFilterQuery } from "mongoose"
import { UserModel } from "../model/user.model"
import { User } from "../types/user.types"



export const getUserById =async () => {

}

export const findUserByWhere =async (where:RootFilterQuery<User>) => {
    try{
        console.log(where)
        const user = UserModel.findOne(where)
        if(user) return user 
        return null
    }catch(err){
        throw err
    }
}

