"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerRoutes = void 0;
const express_1 = require("express");
const answerController_1 = require("../Controllers/answerController");
const verifyUser_1 = require("../Middleware/verifyUser");
exports.answerRoutes = (0, express_1.Router)();
exports.answerRoutes.post('/post/:question_id', verifyUser_1.verifyUser, answerController_1.postAnswer);
exports.answerRoutes.get('/all', verifyUser_1.verifyUser, answerController_1.getAnswers);
exports.answerRoutes.get('/question/:question_id', verifyUser_1.verifyUser, answerController_1.getQuestionAnswer);
exports.answerRoutes.delete('/delete/:answer_id', verifyUser_1.verifyUser, answerController_1.deleteAnswer);
exports.answerRoutes.put('/update/:answer_id', verifyUser_1.verifyUser, answerController_1.updateAnswer);
exports.answerRoutes.put('/upvote/:answer_id', verifyUser_1.verifyUser, answerController_1.upvote);
exports.answerRoutes.put('/downvote/:answer_id', verifyUser_1.verifyUser, answerController_1.downvote);
exports.answerRoutes.put('/accept/:answer_id', verifyUser_1.verifyUser, answerController_1.acceptAnswer);
