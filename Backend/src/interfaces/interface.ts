import { Request, request } from "express"

export interface ExtdReq extends Request{
    payload?:TokenData
    body:{
        user_id:string
        profile_pic:string
        first_name:string
        second_name:string
        email:string
        email_sent:number
        deactivated:number
        role_id:string
        password:string
    }
}

export interface TokenData{
    user_id:string
    first_name:string
    second_name:string
    email:string
    role_id:string
}

export interface User{
    user_id:string
    profile_pic:string
    first_name:string
    second_name:string
    email:string
    email_sent:number
    deactivated:number
    role_id:string
    password:string
}
