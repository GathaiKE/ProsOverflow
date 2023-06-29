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
exports.getTags = exports.getUserQuestons = exports.deleteQuestion = exports.updateQuestion = exports.getSingleQuestion = exports.getAllQuestions = exports.postQuestion = void 0;
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../configuration/config");
const uuid_1 = require("uuid");
//Post Question
const postQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log((_a = req.payload) === null || _a === void 0 ? void 0 : _a.user_id[0]);
        const question_id = (0, uuid_1.v4)();
        const upvotes = 0;
        const downvotes = 0;
        const { title, body, tags } = req.body;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        yield (yield pool)
            .request()
            .input("question_id", question_id)
            .input("title", title)
            .input("body", body)
            .input("user_id", (_b = req.payload) === null || _b === void 0 ? void 0 : _b.user_id[0])
            .input("upvotes", upvotes)
            .input("downvotes", downvotes)
            .execute("postQuestion");
        const updatedTags = yield Promise.all(tags.map((tag) => __awaiter(void 0, void 0, void 0, function* () {
            let tag_id = null;
            const existingTag = yield (yield (yield pool)
                .request()
                .input("tag", tag.tag)
                .execute("getTagByName")).recordset;
            if (existingTag.length === 0) {
                tag_id = (0, uuid_1.v4)();
                yield (yield pool)
                    .request()
                    .input("tag_id", tag_id)
                    .input("tag", tag.tag)
                    .execute("addTag");
            }
            else {
                tag_id = existingTag[0].tag_id;
            }
            yield (yield pool)
                .request()
                .input("question_id", question_id)
                .input("tag_id", tag_id)
                .execute("addQuestionTag");
            return {
                tag_id,
                tag: tag.tag
            };
        })));
        return res.status(201).json({ message: "Question added successfully!" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.postQuestion = postQuestion;
//Get All questions
const getAllQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pageSize = 10;
        const { pageNumber } = req.params;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const questions = (yield pool.request().input('pageSize', pageSize).input('pageNumber', pageNumber).execute("gechattyQuestions")).recordset;
        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions available" });
        }
        const result = [];
        for (const question of questions) {
            const { tag_id, tag } = question, rest = __rest(question, ["tag_id", "tag"]);
            let formattedQuestion = result.find((q) => q.title === question.title && q.body === question.body);
            if (!formattedQuestion) {
                formattedQuestion = Object.assign(Object.assign({}, rest), { tags: [] });
                result.push(formattedQuestion);
            }
            if (tag_id && tag) {
                formattedQuestion.tags.push({ tag_id, tag });
            }
        }
        return res.status(200).json(result);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getAllQuestions = getAllQuestions;
//Get Single Question
const getSingleQuestion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { question_id } = req.params;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const questions = (yield pool.request().input("question_id", question_id).execute("getSingleQuestion")).recordset;
        if (questions.length === 0) {
            return res.status(404).json({ message: "Question doesn't exist" });
        }
        const result = [];
        for (const question of questions) {
            const { tag_id, tag } = question, rest = __rest(question, ["tag_id", "tag"]);
            let formattedQuestion = result.find((q) => q.title === question.title && q.body === question.body);
            if (!formattedQuestion) {
                formattedQuestion = Object.assign(Object.assign({}, rest), { tags: [] });
                result.push(formattedQuestion);
            }
            if (tag_id && tag) {
                formattedQuestion.tags.push({ tag_id, tag });
            }
        }
        return res.status(200).json(result);
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
        let question = (yield (yield pool)
            .request()
            .input("question_id", question_id)
            .execute("getQ4Update")).recordset;
        if (!question[0]) {
            return res.status(404).json({ message: "Question not found" });
        }
        else {
            (yield pool)
                .request()
                .input("question_id", question_id)
                .input("title", title)
                .input("body", body)
                .execute("updateQuestion");
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
        let question = (yield (yield pool)
            .request()
            .input("question_id", question_id)
            .execute("getSingleQuestion")).recordset;
        if (!question[0]) {
            return res.status(404).json({ message: "Question does not exist" });
        }
        (yield pool)
            .request()
            .input("question_id", question_id)
            .execute("deleteQuestion");
        return res.status(200).json({ message: "Deleted!" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.deleteQuestion = deleteQuestion;
//Get single user questions
const getUserQuestons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const { pageNumber } = req.params;
        const pageSize = 10;
        let questions = (yield (yield pool.request()).input('user_id', (_c = req.payload) === null || _c === void 0 ? void 0 : _c.user_id[0]).input('pageSize', pageSize).input('pageNumber', pageNumber).execute('getUserQuestions')).recordset;
        if (questions.length) {
            return res.status(200).json(questions);
        }
        else {
            return res.status(404).json({ message: "You have asked no questions yet" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getUserQuestons = getUserQuestons;
//Get all tags
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        let tags = yield (yield pool.request().execute('getTags')).recordset;
        if (tags.length === 0) {
            return res.status(404).json({ message: "No tags found!" });
        }
        else {
            return res.status(200).json(tags);
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getTags = getTags;
