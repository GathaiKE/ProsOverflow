import { Request, Response } from "express";
import {v4 as uuid} from 'uuid'
import { ExtdReq, User } from "../interfaces/interface";
import { userValidateSchema } from "../Helpers/userValidate";
import mssql from 'mssql'
import { sqlConfig } from "../configuration/config";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname, '../../.env')})


//Register
export const register= async(req:ExtdReq, res:Response)=>{
    try {
        const {profile_pic, first_name,second_name,email,password}=req.body 
        let user_id=uuid()
        let email_sent=0
        let deactivated=0
        let role_id=2
        const error=userValidateSchema.validate(req.body)
        const pool=await mssql.connect(sqlConfig)
        let user:User[]= await (await pool.request().input('email',email).execute('getUserByEmail')).recordset
        if(user.length){
            return res.status(409).json({message:"User already exists!"})
        } else{
            let hashedPassword=await bcrypt.hash(password,10)
            await pool.request()
            .input('user_id',user_id)
            .input('profile_pic',profile_pic)
            .input('first_name',first_name)
            .input('second_name',second_name)
            .input('email',email)
            .input('email_sent',email_sent)
            .input('deactivated',deactivated)
            .input('password',hashedPassword)
            .execute('register')

            await pool.request()
            .input('user_id',user_id)
            .input('role_id',role_id)
            .execute('addUserRole')
            
            return res.status(201).json({message:"Welcome to Pro's Overflow!"})
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Log In

export const logIn= async(req:ExtdReq,res:Response)=>{
    try {
        const pool= await mssql.connect(sqlConfig)
        const {email,password} = req.body

        let user:User[]=(await pool.request().input('email',email).execute('getUserByEmail')).recordset
        

        if(!user[0]){
            return res.status(404).json({message:"Wrong Email!"})
        } else{
            let correctPassword= await bcrypt.compare(password,user[0].password)

            if(!correctPassword){
                return res.status(404).json({message:"Wrong password!"})
            } else{
                const payload= user.map(usr=>{
                    const {password,email_sent,deactivated,...rest}=usr
                    return rest
                })

            const token=jwt.sign(payload[0],process.env.SECRET_KEY as string)
            // ,{expiresIn:"3600s"}
            const first_name=payload[0].first_name 
            const second_name=payload[0].second_name 
            const user_id=payload[0].user_id[0]
            const email=payload[0].email
            const profile_pic=payload[0].profile_pic

            let role=payload[0].role_id[0]=="1"?"admin":"user"
                
            return res.status(201).json({message:"Log In was Successfull!",token,role,first_name,second_name,user_id,email,profile_pic})
            }
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Get all Users

export const getUsers = async(req:ExtdReq,res:Response)=>{
    try {
        const {page}=req.params
        const pagesize=10
        const totalpages=+''
        const pool = await mssql.connect(sqlConfig)
        let users:User[]= (await (await pool.request()).input('pageNumber',page).input('pageSize',pagesize).input('totalPages',totalpages).execute('getChattyUsers')).recordset
        if(users){
            console.log("userslist",users)
            return res.status(200).json(users)
        } else{
            return res.status(404).json({message:"No Users available"})
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Get user by Id
export const getUserById = async(req:ExtdReq,res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        console.log(req.payload);
        
        if(req.payload){
            let user:User[]=(await (await pool.request()).input('user_id',req.payload.user_id[0]).execute('getUserById')).recordset
            
            if(!user[0]){
                return res.status(404).json({message:"User not found!"})
            }

            return res.status(200).json(user[0])
            
        }
    } catch (error:any) {
        console.log("Server check");
        
        return res.status(500).json(error.message)
    }
}

//Get user by email
export const getUserByEmail=async(req:ExtdReq,res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        if(req.payload){
            let user:User[]=await (await pool.request().input('email',req.payload.email).execute('getUserByEmail')).recordset

            if(user.length){
                return res.status(200).json(user)
            } else{
                return res.status(404).json({message:"User not found!"})
            }
        } else{
            return res.status(404).json({message:"no token available!"})
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Update A User

export const updateUser= async(req:ExtdReq,res:Response)=>{
    try {
        const {profile_pic, first_name, second_name, email}=req.body
        const pool = await mssql.connect(sqlConfig)
        if(!req.payload){
            return res.status(404).json({message:"User not found!"})
        } else{
            await pool.request()
            .input('profile_pic',profile_pic)
            .input('first_name',first_name)
            .input('second_name',second_name)
            .input('email',email)
            .input('user_id',req.payload.user_id[0])
            .execute('updateUser')

            return res.status(201).json({message:"Update successfull!"})
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

// Deactivate

export const deactivate= async(req:ExtdReq,res:Response)=>{
    try {
        const pool = await mssql.connect(sqlConfig)
        if(!req.payload){
            return res.status(404).json({message:"Invalid token!"})
        } else{
            await pool.request()
            .input('user_id',req.payload.user_id[0]).execute('deactivateUser')

            return res.json({message:"We are sad to see you leave😥"})
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}

//Get Deactivated Users

export const getInactive=async(req:ExtdReq,res:Response)=>{
    try {
        const pool = mssql.connect(sqlConfig)
        let exusers:User[]=(await (await pool).request().execute('deactivatedUsers')).recordset

        if(exusers.length===0){
            return res.status(404).json({message:"All users are still active."})
        } else{
            return res.status(200).json(exusers)
        }
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}