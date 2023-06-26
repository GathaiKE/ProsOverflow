import { ConfigOpts, MessageOpts } from "../Interfaces/interfaces";
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname,'../../.env')})

let configOptions: ConfigOpts = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user:process.env.EMAIL as string,
        pass:process.env.PASS as string
    }
    }

    let createTrans=(configOptions:ConfigOpts)=>{
        return nodemailer.createTransport(configOptions);
    }

    let sendEmail = async(messageOpts:MessageOpts)=>{
        let transporter= createTrans(configOptions)
    await transporter.sendMail(messageOpts,(error,res)=>{
        error?error:res.response
    })
    }

    export default sendEmail