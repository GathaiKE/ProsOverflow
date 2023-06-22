import cron from 'node-cron'
import mssql from 'mssql'
import nodemailer from 'nodemailer';
import { ConfigOpts, MessageOpts, User } from '../Interfaces/interfaces';
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname,'../../.env')})
import ejs from 'ejs';
import configOptions from '../helpers/sendMail';
import {sqlConfig} from '../Configurations/sqlConfig'
import sendEmail from '../helpers/sendMail';


export const welcomeEmail =async()=>{
    const pool=await mssql.connect(sqlConfig)

    const users:User[]= (await(await pool.request()).execute('getNewUsers')).recordset

    console.log(users);

    for(let user of users){

        ejs.renderFile(path.resolve(__dirname, 'Templates/welcome.ejs'), { first_name: user.first_name, second_name:user.second_name }, async(error, html) => {
            try {
                let messageOptions: MessageOpts = {
                    from: process.env.EMAIL as string,
                    to: user.email,
                    subject: "Welcome To Pro's Overflow 😎",
                    html
                }

                await sendEmail(messageOptions)

                await pool.request().input('user_id',user.user_id).execute('emailSent')
            } catch (error:any) {
                return error.message
            }   
        })
    }
    
}
