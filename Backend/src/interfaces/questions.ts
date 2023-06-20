import { Request } from "express"
import { TokenData } from "./interface"


export interface Tag{
    tag_id:string
    tag:string
}


export interface Question{
    question_id:string
    title:string
    body:string
    upvotes:number
    downvotes:number
    accepted:number
    tags:[
        {tag_id:string,tag:string}
    ]
}

export interface ExtdQuestReq extends Request{
    payload?:TokenData
    body:{
        question_id:string
        title:string
        body:string
        upvotes:number
        downvotes:number
        accepted:number
        tags:[
            {tag_id:string, tag:string}
        ]
    }
    params:{
        question_id:string
    }
}
