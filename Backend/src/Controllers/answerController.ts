import { Response } from "express";
import { Answer, ExtendedAnsReq } from "../interfaces/answerInterfaces";
import mssql from 'mssql'
import { sqlConfig } from "../configuration/config";
// import { Question } from "../interfaces/interface";
import {v4 as uuid} from 'uuid'
import { Question } from "../interfaces/questions";




//Post an answer
export const postAnswer=async(req:ExtendedAnsReq,res:Response)=>{
    try {
        const answer_id=uuid()
        const {answer}=req.body
        const {question_id}=req.params
        let upvotes=0
        let downvotes=0
        let accepted=0
        const pool=mssql.connect(sqlConfig);


        let question:Question[]=(await (await pool).request().input('question_id',question_id).execute('getSingleQuestion')).recordset

        if(!question[0]){
            return res.status(404).json({message:"Question not found"})
        }
        (await pool).request()
        .input('answer_id',answer_id)
        .input('answer',answer)
        .input('question_id',question_id)
        .input('user_id',req.payload?.user_id[0])
        .input('upvotes',upvotes)
        .input('downvotes',downvotes)
        .input('accepted',accepted)
        .execute('postAnswer')

        return res.status(201).json({message:'Thank you for your response'})
    } catch (error:any) {
        
    }
}

//Get all answers

export const getAnswers=async(req:ExtendedAnsReq,res:Response)=>{
    try {
        const pool=mssql.connect(sqlConfig)

        let answers:Answer[]=(await (await pool).request().execute('getAllAnswers')).recordset

        if(answers.length){
            return res.status(200).json(answers)
        }
        return res.status(404).json({message:"No answers found"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Get single Question answers
export const getQuestionAnswer=async(req:ExtendedAnsReq,res:Response)=>{
    try {
        const {question_id}=req.params
        const pool=mssql.connect(sqlConfig)
        let answers:Answer[]=(await (await pool).request().input('question_id',question_id).execute('getQuestionAnswers')).recordset

        if(answers.length){
            return res.status(200).json(answers)
        }else{
            return res.status(404).json({message:"No answers yet"})
        }
    } catch (error:any) {
        return res.status(500).json(error.mesage)
    }
}

//Delete Answer

export const deleteAnswer=async(req:ExtendedAnsReq,res:Response)=>{
    try {
        const {answer_id}=req.params
        const pool=mssql.connect(sqlConfig)

        let answer:Answer[]=(await (await pool).request().input('answer_id',answer_id).execute('getAnswer')).recordset

        if(answer.length){
            (await pool).request().input('answer_id',answer_id).execute('deteleAnswer')

            return res.status(200).json({message:"Deleted!"})
        } else{
            return res.status(404).json({message:"Answer not found"})
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


//Update Answer

export const updateAnswer=async(req:ExtendedAnsReq,res:Response)=>{
    try {
        const {answer_id}=req.params
        const {answer}=req.body
        const pool=mssql.connect(sqlConfig)

        let existingAnswer:Answer[]=(await (await pool).request().input('answer_id',answer_id).execute('getAnswer')).recordset

        if(existingAnswer.length){
            (await pool).request().input('answer_id',answer_id).input('answer',answer).execute('updateAnswer')
            return res.status(201).json({message:"Update Successful"})
        } else{
            return res.status(404).json({message:"Answer not found"})
        }

    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Upvote Answer

export const upvote=async(req:ExtendedAnsReq,res:Response)=>{
    try {
        const {answer_id}=req.params
        const pool=mssql.connect(sqlConfig)

        let answer:Answer[]=(await (await pool).request().input('answer_id',answer_id).execute('getAnswer')).recordset
        if(answer.length){
            let upvotes:number=answer[0].upvotes + 1;
            // console.log(answer[0].upvotes);
            
            (await pool).request().input('answer_id',answer_id).input('upvotes',upvotes).execute('upvote')

            return res.status(200).json(answer)
        } else{
            return res.status(404).json({message:"Answer not found"})
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Downvote Answer

export const downvote=async(req:ExtendedAnsReq,res:Response)=>{
    try {
        const {answer_id}=req.params
        const pool=mssql.connect(sqlConfig)

        let answer:Answer[]=(await (await pool).request().input('answer_id',answer_id).execute('getAnswer')).recordset

        if(answer.length){
            let downvotes= 1
            console.log(typeof(answer[0].downvotes));
            
            (await pool).request().input('answer_id',answer_id).input('downvotes',downvotes).execute('downvoteAnswer')

            return res.status(200).json(answer)
        } else{
            return res.status(404).json({message:"Answer not found"})
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Accept Answer

export const acceptAnswer=async(req:ExtendedAnsReq,res:Response)=>{
    try {
        const {answer_id}=req.params
        const pool=mssql.connect(sqlConfig)

        let answer:Answer[]=(await (await pool).request().input('answer_id',answer_id).execute('getAnswer')).recordset

        if(answer.length){
            (await pool).request().input('answer_id',answer_id).execute('acceptAnswer')
            
            return res.status(200).json(answer)
        } else{
            return res.status(404).json({message:"Answer not found"})
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}