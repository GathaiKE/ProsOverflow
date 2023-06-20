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
exports.getAnswerComments = exports.deleteComment = exports.updateComment = exports.addComment = void 0;
const uuid_1 = require("uuid");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../configuration/config");
//Adding comment
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { comment } = req.body;
        const { answer_id } = req.params;
        const comment_id = (0, uuid_1.v4)();
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        (yield pool).request()
            .input('comment_id', comment_id)
            .input('comment', comment)
            .input('user_id', (_a = req.payload) === null || _a === void 0 ? void 0 : _a.user_id[0])
            .input('answer_id', answer_id)
            .execute('postComment');
        return res.status(200).json({ message: "Comment Added" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.addComment = addComment;
//Update Comment
const updateComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment } = req.body;
        const { comment_id } = req.params;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        (yield pool).request()
            .input('comment', comment)
            .input('comment_id', comment_id)
            .execute('updateComment');
        return res.status(500).json({ message: "Update successfull" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.updateComment = updateComment;
//Delete Comment
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { comment_id } = req.params;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        (yield pool).request().input('comment_id', comment_id).execute('deleteComment');
        return res.status(500).json({ message: "Deleted!" });
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.deleteComment = deleteComment;
//Get Questions Comments
const getAnswerComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { answer_id } = req.params;
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let comments = (yield (yield pool).request().input('answer_id', answer_id).execute('getcomments')).recordset;
        return res.status(200).json(comments);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getAnswerComments = getAnswerComments;
