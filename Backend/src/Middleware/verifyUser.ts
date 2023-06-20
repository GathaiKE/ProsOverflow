import { NextFunction, Response } from "express"
import { ExtdReq, TokenData } from "../interfaces/interface"
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname, '../../.env')})


export const verifyUser = (req:ExtdReq,res:Response,next:NextFunction)=>{
    try {
        const token = req.headers['token'] as string
        if(!token){
            return res.status(401).json({message:"User not authorized!"})
        }
            const tokenData=jwt.verify(token,process.env.SECRET_KEY as string) as TokenData
            req.payload=tokenData

    } catch (error:any) {
        return res.status(403).json({message:error.message})
    }
    next()
}