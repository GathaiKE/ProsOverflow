import mssql from 'mssql'
import { MessageOpts, User } from '../Interfaces/interfaces';
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname,'../../.env')})
import ejs from 'ejs';
import {sqlConfig} from '../Configurations/sqlConfig'
import sendEmail from '../helpers/sendMail';


export const acceptAnswerEmail =async()=>{
    const pool=await mssql.connect(sqlConfig)

    const users:User[]= (await(await pool.request()).execute('getAcceptedAnswerUsers')).recordset

    console.log(users[0].first_name);

    for(let user of users){

        ejs.renderFile(path.resolve(__dirname, 'Templates/accepted.ejs'), { first_name: user.first_name}, async(error, html) => {
            try {
                let messageOptions: MessageOpts = {
                    from: process.env.EMAIL as string,
                    to: user.email,
                    subject: "Congratulations 👏👏",
                    html
                }

                await sendEmail(messageOptions)

                await pool.request().input('user_id',user.user_id[0]).execute('answerEmailSent')
            } catch (error:any) {
                return error.message
            }   
        })
    }
    
}
