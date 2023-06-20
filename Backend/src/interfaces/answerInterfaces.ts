import { Request } from "express";
import { TokenData } from "./interface";

export interface ExtendedAnsReq extends Request{
    payload?:TokenData
    body:{
        answer_id:string
        answer:string
        question_id:string
        user_id:string
        upvotes:number
        downvotes:number
        accepted:number
    }
    params:{
        question_id:string
        answer_id:string
    }
}

export interface Answer {
    answer_id:string
    answer:string
    question_id:string
    user_id:string
    upvotes:number
    downvotes:string
    accepted:number
}