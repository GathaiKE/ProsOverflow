"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRoutes = void 0;
const express_1 = require("express");
const questionController_1 = require("../Controllers/questionController");
const verifyUser_1 = require("../Middleware/verifyUser");
exports.questionRoutes = (0, express_1.Router)();
exports.questionRoutes.post('/post', verifyUser_1.verifyUser, questionController_1.postQuestion);
exports.questionRoutes.get('/all', verifyUser_1.verifyUser, questionController_1.getAllQuestions);
exports.questionRoutes.get('/single/:question_id', verifyUser_1.verifyUser, questionController_1.getSingleQuestion);
exports.questionRoutes.put('/update/:question_id', verifyUser_1.verifyUser, questionController_1.updateQuestion);
exports.questionRoutes.delete('/delete/:question_id', verifyUser_1.verifyUser, questionController_1.deleteQuestion);