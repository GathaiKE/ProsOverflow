import { Request, Response } from "express";
import mssql from 'mssql'
import { sqlConfig } from "../configuration/config";
import {v4 as uuid} from 'uuid'
import { ExtdQuestReq, Question } from "../interfaces/questions";
import { Tag } from "../interfaces/questions";


//Post Question
export const postQuestion=async(req:ExtdQuestReq,res:Response)=>{
    try {
        const question_id=uuid()
        const upvotes=0
        const downvotes=0
        const {title,body,tags}=req.body
        const pool=mssql.connect(sqlConfig)        
        await (await pool).request()
        .input('question_id',question_id)
        .input('title',title)
        .input('body',body)
        .input('user_id',req.payload?.user_id[0])
        .input('upvotes',upvotes)
        .input('downvotes',downvotes)
        .execute('postQuestion')

        const updatedTags = tags.map((tag) => {
            tag.tag_id = uuid();
            return tag
        });

        const tag_id = updatedTags.map((tag) => tag.tag_id)
        const tag = updatedTags.map((tag) => tag.tag)

        for(let i=0;i<updatedTags.length;i++){


            let existingTag:Tag[]= await (await (await pool).request().input('tag_id',tag_id[i]).execute('getSingleTag')).recordset

            if(!existingTag[0]){
                await (await pool).request()
                .input('tag_id',tag_id[i])
                .input('tag',tag[i])
                .execute('addTag')
            }
            

            await (await pool).request()
            .input('question_id',question_id)
            .input('tag_id',tag_id[i])
            .execute('addQuestionTag')
        }

        

        return res.status(201).json({message:"Question added successfully!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


//Get All questions
export const getAllQuestions = async(req:Request,res:Response)=>{
    try {
        const pool=mssql.connect(sqlConfig)
        let Questions:Question[]= (await (await pool).request().execute('getQuestions')).recordset

        if(!Questions[0]){
            return res.status(404).json({message:"No questions available"})
        }
        let qs={}

        for (let i=0; i<Questions.length; i++) {  
            const q = Questions[i]     
            const {tag_id, tag, question_id, ...rest} = q
            let tags = qs[question_id] ? qs[question_id]['tags'] : []
            qs[question_id] = rest
            tag_id ? tags.push({tag, tag_id}) : ''
            qs[question_id]['tags'] = tags
        }

        // console.log(qs[0].tag)
    
        // console.log(Questions[0], qs.length);
        
        return res.status(200).json(qs)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Get Single Question

export const getSingleQuestion=async(req:Request<{question_id:string}>,res:Response)=>{
    try {
        const {question_id}=req.params
        const pool=mssql.connect(sqlConfig)
        let question:Question[]=(await (await pool).request().input('question_id',question_id).execute('getSingleQuestion')).recordset

        if(!question[0]){
            return res.status(404).json({message:"The question was not found"})
        }
            let qs={}

            for (let i=0; i<question.length; i++) {  
                const q = question[i]          
                const {tag_id, tag, question_id, ...rest} = q
                let tags = qs[question_id] ? qs[question_id]['tags'] : []
                qs[question_id] = rest
                tag_id ? tags.push({tag, tag_id}) : ''
                qs[question_id]['tags'] = tags
            }
            return res.status(201).json(qs)
            // return res.status(200).json(question)
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// update Question

export const updateQuestion=async(req:ExtdQuestReq,res:Response)=>{
    try {
        const {title,body,tags}=req.body
        const{question_id}=req.params
        const pool=mssql.connect(sqlConfig)
        let question:Question[]=(await (await pool).request().input('question_id',question_id).execute('getQ4Update')).recordset

        if(!question[0]){
            return res.status(404).json({message:"Question not found"})
        } else{
            (await pool).request()
            .input('question_id',question_id)
            .input('title',title)
            .input('body',body)
            .execute('updateQuestion')
            
        return res.status(200).json({message:"Update Successful😎!"})
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}


//Delete question

export const deleteQuestion=async(req:ExtdQuestReq,res:Response)=>{
    try {
        const {question_id}=req.params
        const pool=mssql.connect(sqlConfig)

        let question:Question[]=(await (await pool).request().input('question_id',question_id).execute('getSingleQuestion')).recordset

        if(!question[0]){
            return res.status(404).json({message:"Question does not exist"})
        }
        // (await pool).request()
        //     .input('question_id',question_id)
        //     .execute('deleteQuestionTags')

            ;(await pool).request()
            .input('question_id',question_id)
            .execute('deleteQuestion')

            return res.status(200).json({message:"Deleted!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}