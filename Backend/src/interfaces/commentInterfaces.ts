import { Request } from "express"
import { TokenData } from "./interface"

export interface Comment{
    comment_id:string
    comment:string
    user_id:string
    answer_id:string
}

export interface ExtendedComReq extends Request{
    payload?:TokenData
    body:{
        comment_id:string
        comment:string
        user_id:string
        answer_id:string
    }
    params:{
        comment_id:string
        answer_id:string
    }
}