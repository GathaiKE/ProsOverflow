import { Router } from "express";
import { acceptAnswer, deleteAnswer, downvote, getAnswers, getQuestionAnswer, postAnswer, updateAnswer, upvote } from "../Controllers/answerController";
import { verifyUser } from "../Middleware/verifyUser";



export const answerRoutes= Router()


answerRoutes.post('/post/:question_id',verifyUser, postAnswer)
answerRoutes.get('/all',verifyUser,getAnswers)
answerRoutes.get('/question/:question_id',verifyUser,getQuestionAnswer)
answerRoutes.delete('/delete/:answer_id',deleteAnswer)
answerRoutes.put('/update/:answer_id',verifyUser,updateAnswer)
answerRoutes.put('/upvote/:answer_id',verifyUser,upvote)
answerRoutes.put('/downvote/:answer_id',verifyUser,downvote)
answerRoutes.put('/accept/:answer_id',verifyUser,acceptAnswer)