import express,{json} from 'express'
import { userRoutes } from './Routes/userRoutes'
import { questionRoutes } from './Routes/questionRoutes'
import { answerRoutes } from './Routes/answerRoutes'
import { commentRoutes } from './Routes/commentRoutes'
import cors from 'cors'

const app=express()
app.use(json()),
app.use(cors())

app.use('/users',userRoutes)
app.use('/questions',questionRoutes)
app.use('/answers',answerRoutes)
app.use('/comments',commentRoutes)

app.listen(4000,()=>{
    console.log("Fungua Server Kijana!");
})

export default app
