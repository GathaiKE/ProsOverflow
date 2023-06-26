import { Router } from "express";
import { acceptAnswer, deleteAnswer, downvote, getAnswers, getQuestionAnswer, postAnswer, updateAnswer, upvote } from "../Controllers/answerController";
import { verifyUser } from "../Middleware/verifyUser";



export const answerRoutes= Router()


answerRoutes.post('/post/:question_id', postAnswer)
answerRoutes.get('/all',getAnswers)
answerRoutes.get('/question/:question_id',getQuestionAnswer)
answerRoutes.delete('/delete/:answer_id',deleteAnswer)
answerRoutes.put('/update/:answer_id',updateAnswer)
answerRoutes.put('/upvote/:answer_id',upvote)
answerRoutes.put('/downvote/:answer_id',downvote)
answerRoutes.put('/accept/:answer_id',acceptAnswer)