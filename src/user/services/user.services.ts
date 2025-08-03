import { RootFilterQuery } from "mongoose"
import { UserModel } from "../model/user.model"
import { User } from "../types/user.types"



export const findCompleteUserById = async (id: string) => {
    try {
        const user = await UserModel.findById(id)
        if (user) {
            return {
                user_details: {
                    user: user
                }
            }
        } else {
            return false
        }
    } catch (err) {
        throw err
    }
}

export const findUserByWhere = async (where: RootFilterQuery<User>) => {
    try {
        const user = UserModel.findOne(where)
        if (user) return user
        return null
    } catch (err) {
        throw err
    }
}

export const createUser = async (userData:User) => {
    try {
        const user =await UserModel.create(userData)
        return user
    } catch (err) {
        throw err
    }
}