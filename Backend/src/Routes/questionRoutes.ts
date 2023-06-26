import { Router } from "express";
import { getAllQuestions, postQuestion,getSingleQuestion, updateQuestion, deleteQuestion} from "../Controllers/questionController";
import { verifyUser } from "../Middleware/verifyUser";


export const questionRoutes=Router()

questionRoutes.post('/post',postQuestion)
questionRoutes.get('/all/:pageNumber',getAllQuestions)
questionRoutes.get('/single/:question_id',getSingleQuestion)
questionRoutes.put('/update/:question_id',updateQuestion)
questionRoutes.delete('/delete/:question_id',deleteQuestion)