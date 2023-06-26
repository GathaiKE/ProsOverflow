import mssql from 'mssql';
import { MessageOpts, User } from '../Interfaces/interfaces';
import dotenv from 'dotenv';
import path from 'path';
import ejs from 'ejs';
import { sqlConfig } from '../Configurations/sqlConfig';
import sendEmail from '../helpers/sendMail';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const welcomeEmail = async () => {
try {
const pool = await mssql.connect(sqlConfig);
const users: User[] = (await (await pool.request()).execute('getNewUsers')).recordset;


for (let user of users) {
    
    ejs.renderFile(
    path.resolve(__dirname, '../Templates/welcome.ejs'),
    { first_name: user.first_name, second_name: user.second_name },
    async (error, html) => {
        try {
        let messageOptions: MessageOpts = {
            from: "briannjeri9@gmail.com",
            to: user.email,
            subject: "Welcome To Pro's Overflow 😎",
            html,
        };

        await sendEmail(messageOptions);

        await pool.request().input('user_id', user.user_id).execute('emailSent');
        } catch (error:any) {
        throw new Error(error.message);
        }
    }
    );
}
} catch (error) {
throw new Error('Failed to connect to the database.');
}
};
