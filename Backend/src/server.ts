import express,{json} from 'express'
import { userRoutes } from './Routes/userRoutes'
import { questionRoutes } from './Routes/question'
import { answerRoutes } from './Routes/answerRoutes'
import { commentRoutes } from './Routes/commentRoutes'

const app=express()
app.use(json())

app.use('/users',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answers',answerRoutes)
app.use('/comments',commentRoutes)

app.listen(4000,()=>{
    console.log("Fungua Server Kijana!");
})

export default app
