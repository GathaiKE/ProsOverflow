import { Router } from "express";
import { getAllQuestions, postQuestion,getSingleQuestion, updateQuestion, deleteQuestion, getUserQuestons, getTags} from "../Controllers/questionController";
import { verifyUser } from "../Middleware/verifyUser";


export const questionRoutes=Router()

questionRoutes.post('/post',verifyUser,postQuestion)
questionRoutes.get('/all/:pageNumber',verifyUser,getAllQuestions)
questionRoutes.get('/user/:pageNumber',verifyUser,getUserQuestons)
questionRoutes.get('/single/:question_id',verifyUser,getSingleQuestion)
questionRoutes.get('/tags',verifyUser,getTags)
questionRoutes.put('/update/:question_id',verifyUser,updateQuestion)
questionRoutes.delete('/delete/:question_id',verifyUser,deleteQuestion)