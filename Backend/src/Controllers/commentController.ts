import { Request, Response } from "express";
import { ExtendedComReq } from "../interfaces/commentInterfaces";
import {v4 as uuid} from 'uuid'
import mssql from 'mssql'
import { sqlConfig } from "../configuration/config";

//Adding comment
export const addComment=async(req:ExtendedComReq,res:Response)=>{
    try {
        const {comment}=req.body
        const {answer_id}=req.params
        const comment_id=uuid()

        const pool=mssql.connect(sqlConfig);

        (await pool).request()
        .input('comment_id',comment_id)
        .input('comment',comment)
        .input('user_id',req.payload?.user_id[0])
        .input('answer_id',answer_id)
        .execute('postComment')

        return res.status(201).json({message:"Comment Added"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Update Comment
export const updateComment=async(req:ExtendedComReq,res:Response)=>{
    try {
        const {comment}=req.body
        const {comment_id}=req.params
        const pool=mssql.connect(sqlConfig);

        (await pool).request()
        .input('comment',comment)
        .input('comment_id',comment_id)
        .execute('updateComment')

        return res.status(201).json({message:"Update successfull"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Delete Comment

export const deleteComment=async(req:ExtendedComReq,res:Response)=>{
    try {
        const {comment_id}=req.params
        const pool=mssql.connect(sqlConfig);

        (await pool).request().input('comment_id',comment_id).execute('deleteComment')

        return res.status(200).json({message:"Deleted!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Get Questions Comments

export const getAnswerComments=async(req:Request,res:Response)=>{
    try {
        const {answer_id}=req.params
        const pool=mssql.connect(sqlConfig);

        let comments:Comment[]= (await (await pool).request().input('answer_id',answer_id).execute('getcomments')).recordset

        return res.status(200).json(comments)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}
//Get Questions Comments

export const getAllComments=async(req:Request,res:Response)=>{
    try {
        
        const pool=mssql.connect(sqlConfig);
        let comments:Comment[]= (await (await pool).request().execute('getAllComments')).recordset

        if(!comments[0]){
            return res.status(404).json({Message:"Hakuna maoni!"})
        }

        return res.status(200).json(comments)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}