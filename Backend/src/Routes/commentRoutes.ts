import { Router } from "express";
import { verifyUser } from "../Middleware/verifyUser";
import { addComment, deleteComment, getAllComments, getAnswerComments, updateComment } from "../Controllers/commentController";


export const commentRoutes=Router()

commentRoutes.post('/add/:answer_id',addComment)
commentRoutes.put('/update/:comment_id',updateComment)
commentRoutes.get('/get/:answer_id',getAnswerComments)
commentRoutes.get('/all',getAllComments)
commentRoutes.delete('/delete/:comment_id',deleteComment)