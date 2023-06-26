import cron from 'node-cron';
import { welcomeEmail } from './emailsController/welcome';
import { acceptAnswerEmail } from './emailsController/acceptAnswerEmail';

cron.schedule('*/10 * * * * *', async () => {
    await acceptAnswerEmail();
});

cron.schedule('*/2 * * * * *', async () => {
    await welcomeEmail();
    
});




