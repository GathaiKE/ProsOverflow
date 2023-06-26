/*

// Import required dependencies and modules
import nodemailer from 'nodemailer';
import { ConfigOpts, MessageOpts, User } from './Interfaces/interfaces';
import path from 'path';
import dotenv from 'dotenv';
import ejs from 'ejs';
import cron from 'node-cron'
import mssql from 'mssql'
import { sqlConfig } from './Configurations/sqlConfig';


dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Configure the email transport options
let configOptions: ConfigOpts = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL as string,
    pass: process.env.PASS as string
  }
};

let users=async()=>{
  const pool=await mssql.connect(sqlConfig)

  const users:User[]= (await(await pool.request()).execute('getNewUsers')).recordset
  for(let user of users){
    return user
  }
}

// Define the welcomeEmail function to send the welcome email
export async function welcomeEmail() {
  try {
    // Render the welcome email template using EJS
    const renderedTemplate = await ejs.renderFile(path.resolve(__dirname, './Templates/welcome.ejs'), { first_name: "Brian", second_name: "Gathai" });

    // Set the email message options
    let messageOptions: MessageOpts = {
      from: process.env.EMAIL as string,
      to: "",
      subject: "Welcome To Pro's Overflow 😎",
      html: renderedTemplate
    };

    // Create a Nodemailer transporter and send the email
    let transporter = nodemailer.createTransport(configOptions);
    await transporter.sendMail(messageOptions);
    console.log('Welcome email sent successfully!');
  } catch (error) {
    console.error('Error sending welcome email:', error);
  }
}

// Define the acceptAnswerEmail function to send the accept answer email
export async function acceptAnswerEmail() {
  try {
    // Render the accept answer email template using EJS
    const renderedTemplate = await ejs.renderFile(path.resolve(__dirname, './Templates/accepted.ejs'), { answer_id: 12345 });

    // Set the email message options
    let messageOptions: MessageOpts = {
      from: process.env.EMAIL as string,
      to: "recipient_email@gmail.com",
      subject: "Your Answer has been Accepted ✔️",
      html: renderedTemplate
    };

    // Create a Nodemailer transporter and send the email
    let transporter = nodemailer.createTransport(configOptions);
    await transporter.sendMail(messageOptions);
    console.log('Accept answer email sent successfully!');
  } catch (error) {
    console.error('Error sending accept answer email:', error);
  }
}

// Schedule the email tasks to run every two minutes
cron.schedule('2 * * * *', async () => {
  await welcomeEmail();
  await acceptAnswerEmail();
});
*/