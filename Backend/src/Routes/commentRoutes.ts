import { Router } from "express";
import { verifyUser } from "../Middleware/verifyUser";
import { addComment, deleteComment, getAnswerComments, updateComment } from "../Controllers/commentController";


export const commentRoutes=Router()

commentRoutes.post('/add/:answer_id',verifyUser,addComment)
commentRoutes.put('/update/:comment_id',verifyUser,updateComment)
commentRoutes.get('/get/:answer_id',verifyUser,getAnswerComments)
commentRoutes.delete('/delete/:comment_id',verifyUser,deleteComment)