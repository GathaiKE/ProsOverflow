import cron from 'node-cron'
import { welcomeEmail } from './emailsController/welcome';
import { acceptAnswerEmail } from './emailsController/acceptAnswerEmail';


cron.schedule('*/2 * * * *', async() => {
    await welcomeEmail()
    await acceptAnswerEmail()
});


