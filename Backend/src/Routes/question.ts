import { Router } from "express";
import { getAllQuestions, postQuestion,getSingleQuestion, updateQuestion, deleteQuestion} from "../Controllers/questionController";
import { verifyUser } from "../Middleware/verifyUser";


export const questionRoutes=Router()

questionRoutes.post('/post',verifyUser,postQuestion)
questionRoutes.get('/all',verifyUser,getAllQuestions)
questionRoutes.get('/single/:question_id',verifyUser,getSingleQuestion)
questionRoutes.put('/update/:question_id',verifyUser,updateQuestion)
questionRoutes.delete('/delete/:question_id',verifyUser,deleteQuestion)