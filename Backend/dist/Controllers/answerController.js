"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptAnswer = exports.downvote = exports.upvote = exports.updateAnswer = exports.deleteAnswer = exports.getQuestionAnswer = exports.getAnswers = exports.postAnswer = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../configuration/config");
// import { Question } from "../interfaces/interface";
const uuid_1 = require("uuid");
//Post an answer
const postAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const answer_id = (0, uuid_1.v4)();
        const { answer } = req.body;
        const { question_id } = req.params;
        let upvotes = 0;
        let downvotes = 0;
        let accepted = 0;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let question = (yield (yield pool).request().input('question_id', question_id).execute('getSingleQuestion')).recordset;
        if (!question[0]) {
            return res.status(404).json({ message: "Question not found" });
        }
        (yield pool).request()
            .input('answer_id', answer_id)
            .input('answer', answer)
            .input('question_id', question_id)
            .input('user_id', (_a = req.payload) === null || _a === void 0 ? void 0 : _a.user_id[0])
            .input('upvotes', upvotes)
            .input('downvotes', downvotes)
            .input('accepted', accepted)
            .execute('postAnswer');
        return res.status(201).json({ message: 'Thank you for your response' });
    }
    catch (error) {
    }
});
exports.postAnswer = postAnswer;
//Get all answers
const getAnswers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let answers = (yield (yield pool).request().execute('getAllAnswers')).recordset;
        if (answers.length) {
            return res.status(200).json(answers);
        }
        return res.status(404).json({ message: "No answers found" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getAnswers = getAnswers;
//Get single Question answers
const getQuestionAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question_id } = req.params;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let answers = (yield (yield pool).request().input('question_id', question_id).execute('getQuestionAnswers')).recordset;
        if (answers.length) {
            return res.status(200).json(answers);
        }
        else {
            return res.status(404).json({ message: "No answers yet" });
        }
    }
    catch (error) {
        return res.status(500).json(error.mesage);
    }
});
exports.getQuestionAnswer = getQuestionAnswer;
//Delete Answer
const deleteAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answer_id } = req.params;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let answer = (yield (yield pool).request().input('answer_id', answer_id).execute('getAnswer')).recordset;
        if (answer.length) {
            (yield pool).request().input('answer_id', answer_id).execute('deteleAnswer');
            return res.status(200).json({ message: "Deleted!" });
        }
        else {
            return res.status(404).json({ message: "Answer not found" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.deleteAnswer = deleteAnswer;
//Update Answer
const updateAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answer_id } = req.params;
        const { answer } = req.body;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let existingAnswer = (yield (yield pool).request().input('answer_id', answer_id).execute('getAnswer')).recordset;
        if (existingAnswer.length) {
            (yield pool).request().input('answer_id', answer_id).input('answer', answer).execute('updateAnswer');
            return res.status(201).json({ message: "Update Successful" });
        }
        else {
            return res.status(404).json({ message: "Answer not found" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.updateAnswer = updateAnswer;
//Upvote Answer
const upvote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answer_id } = req.params;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let answer = (yield (yield pool).request().input('answer_id', answer_id).execute('getAnswer')).recordset;
        if (answer.length) {
            let upvotes = answer[0].upvotes + 1;
            console.log(answer[0].upvotes);
            (yield pool).request().input('answer_id', answer_id).input('upvotes', upvotes).execute('upvote');
            return res.status(200).json(answer);
        }
        else {
            return res.status(404).json({ message: "Answer not found" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.upvote = upvote;
//Downvote Answer
const downvote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answer_id } = req.params;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let answer = (yield (yield pool).request().input('answer_id', answer_id).execute('getAnswer')).recordset;
        if (answer.length) {
            let downvotes = 1;
            console.log(typeof (answer[0].downvotes));
            (yield pool).request().input('answer_id', answer_id).input('downvotes', downvotes).execute('downvoteAnswer');
            return res.status(200).json(answer);
        }
        else {
            return res.status(404).json({ message: "Answer not found" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.downvote = downvote;
//Accept Answer
const acceptAnswer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answer_id } = req.params;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let answer = (yield (yield pool).request().input('answer_id', answer_id).execute('getAnswer')).recordset;
        if (answer.length) {
            (yield pool).request().input('answer_id', answer_id).execute('acceptAnswer');
            return res.status(200).json(answer);
        }
        else {
            return res.status(404).json({ message: "Answer not found" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.acceptAnswer = acceptAnswer;
