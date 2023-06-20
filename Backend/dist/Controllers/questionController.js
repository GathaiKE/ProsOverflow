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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = exports.updateQuestion = exports.getSingleQuestion = exports.getAllQuestions = exports.postQuestion = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../configuration/config");
const uuid_1 = require("uuid");
//Post Question
const postQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const question_id = (0, uuid_1.v4)();
        const upvotes = 0;
        const downvotes = 0;
        const { title, body, tags } = req.body;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        yield (yield pool).request()
            .input('question_id', question_id)
            .input('title', title)
            .input('body', body)
            .input('user_id', (_a = req.payload) === null || _a === void 0 ? void 0 : _a.user_id[0])
            .input('upvotes', upvotes)
            .input('downvotes', downvotes)
            .execute('postQuestion');
        const updatedTags = tags.map((tag) => {
            tag.tag_id = (0, uuid_1.v4)();
            return tag;
        });
        const tag_id = updatedTags.map((tag) => tag.tag_id);
        const tag = updatedTags.map((tag) => tag.tag);
        for (let i = 0; i < updatedTags.length; i++) {
            let existingTag = yield (yield (yield pool).request().input('tag_id', tag_id[i]).execute('getSingleTag')).recordset;
            if (!existingTag[0]) {
                yield (yield pool).request()
                    .input('tag_id', tag_id[i])
                    .input('tag', tag[i])
                    .execute('addTag');
            }
            yield (yield pool).request()
                .input('question_id', question_id)
                .input('tag_id', tag_id[i])
                .execute('addQuestionTag');
        }
        return res.status(200).json({ message: "Question added successfully!" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.postQuestion = postQuestion;
//Get All questions
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let Questions = (yield (yield pool).request().execute('getQuestions')).recordset;
        if (!Questions[0]) {
            return res.status(404).json({ message: "No questions available" });
        }
        let qs = {};
        for (let i = 0; i < Questions.length; i++) {
            const q = Questions[i];
            const { tag_id, tag, question_id } = q, rest = __rest(q, ["tag_id", "tag", "question_id"]);
            let tags = qs[question_id] ? qs[question_id]['tags'] : [];
            qs[question_id] = rest;
            tags.push({ tag, tag_id });
            qs[question_id]['tags'] = tags;
        }
        return res.status(201).json(qs);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getAllQuestions = getAllQuestions;
//Get Single Question
const getSingleQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question_id } = req.params;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let question = (yield (yield pool).request().input('question_id', question_id).execute('getSingleQuestion')).recordset;
        if (!question[0]) {
            return res.status(404).json({ message: "The question was not found" });
        }
        let qs = {};
        for (let i = 0; i < question.length; i++) {
            const q = question[i];
            const { tag_id, tag, question_id } = q, rest = __rest(q, ["tag_id", "tag", "question_id"]);
            let tags = qs[question_id] ? qs[question_id]['tags'] : [];
            qs[question_id] = rest;
            tags.push({ tag, tag_id });
            qs[question_id]['tags'] = tags;
        }
        return res.status(201).json(qs);
        // return res.status(200).json(question)
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getSingleQuestion = getSingleQuestion;
// update Question
const updateQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, tags } = req.body;
        const { question_id } = req.params;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let question = (yield (yield pool).request().input('question_id', question_id).execute('getQ4Update')).recordset;
        if (!question[0]) {
            return res.status(404).json({ message: "Question not found" });
        }
        else {
            (yield pool).request()
                .input('question_id', question_id)
                .input('title', title)
                .input('body', body)
                .execute('updateQuestion');
            return res.status(200).json({ message: "Update Successful😎!" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.updateQuestion = updateQuestion;
//Delete question
const deleteQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { question_id } = req.params;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let question = (yield (yield pool).request().input('question_id', question_id).execute('getSingleQuestion')).recordset;
        if (!question[0]) {
            return res.status(404).json({ message: "Question does not exist" });
        }
        (yield pool).request()
            .input('question_id', question_id)
            .execute('deleteQuestionTags');
        (yield pool).request()
            .input('question_id', question_id)
            .execute('deleteQuestion');
        return res.status(200).json({ message: "Deleted!" });
    }
    catch (error) {
    }
});
exports.deleteQuestion = deleteQuestion;
