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
exports.getInactive = exports.deactivate = exports.updateUser = exports.getUserByEmail = exports.getUserById = exports.getUsers = exports.logIn = exports.register = void 0;
const uuid_1 = require("uuid");
const userValidate_1 = require("../Helpers/userValidate");
const mssql_1 = __importDefault(require("mssql"));
const config_1 = require("../configuration/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../.env') });
//Register
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profile_pic, first_name, second_name, email, password } = req.body;
        let user_id = (0, uuid_1.v4)();
        let email_sent = 0;
        let deactivated = 0;
        let role_id = 2;
        const error = userValidate_1.userValidateSchema.validate(req.body);
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        let user = yield (yield pool.request().input('email', email).execute('getUserByEmail')).recordset;
        if (user.length) {
            return res.status(409).json({ message: "User already exists!" });
        }
        else {
            let hashedPassword = yield bcrypt_1.default.hash(password, 10);
            yield pool.request()
                .input('user_id', user_id)
                .input('profile_pic', profile_pic)
                .input('first_name', first_name)
                .input('second_name', second_name)
                .input('email', email)
                .input('email_sent', email_sent)
                .input('deactivated', deactivated)
                .input('password', hashedPassword)
                .execute('register');
            yield pool.request()
                .input('user_id', user_id)
                .input('role_id', role_id)
                .execute('addUserRole');
            return res.status(201).json({ message: "Welcome to Pro's Overflow!" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.register = register;
//Log In
const logIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        const { email, password } = req.body;
        let user = (yield pool.request().input('email', email).execute('getUserByEmail')).recordset;
        if (!user[0]) {
            return res.status(404).json({ message: "Wrong Email!" });
        }
        else {
            let correctPassword = yield bcrypt_1.default.compare(password, user[0].password);
            if (!correctPassword) {
                return res.status(404).json({ message: "Wrong password!" });
            }
            else {
                const payload = user.map(usr => {
                    const { password, email_sent, profile_pic, deactivated } = usr, rest = __rest(usr, ["password", "email_sent", "profile_pic", "deactivated"]);
                    return rest;
                });
                const token = jsonwebtoken_1.default.sign(payload[0], process.env.SECRET_KEY);
                // ,{expiresIn:"3600s"}
                const username = (payload[0].first_name + " " + payload[0].second_name);
                return res.status(201).json({ message: "Log In was Successfull!", token, role: payload[0].role_id[0], username });
            }
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.logIn = logIn;
//Get all Users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page } = req.params;
        const pagesize = 10;
        const totalpages = +'';
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        let users = (yield (yield pool.request()).input('pageNumber', page).input('pageSize', pagesize).input('totalPages', totalpages).execute('getChattyUsers')).recordset;
        if (users) {
            console.log("userslist", users);
            return res.status(200).json(users);
        }
        else {
            return res.status(404).json({ message: "No Users available" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getUsers = getUsers;
//Get user by Id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        console.log(req.payload);
        if (req.payload) {
            let user = (yield (yield pool.request()).input('user_id', req.payload.user_id[0]).execute('getUserById')).recordset;
            if (!user[0]) {
                return res.status(404).json({ message: "User not found!" });
            }
            return res.status(200).json(user[0]);
        }
    }
    catch (error) {
        console.log("Server check");
        return res.status(500).json(error.message);
    }
});
exports.getUserById = getUserById;
//Get user by email
const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        if (req.payload) {
            let user = yield (yield pool.request().input('email', req.payload.email).execute('getUserByEmail')).recordset;
            if (user.length) {
                return res.status(200).json(user);
            }
            else {
                return res.status(404).json({ message: "User not found!" });
            }
        }
        else {
            return res.status(404).json({ message: "no token available!" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getUserByEmail = getUserByEmail;
//Update A User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { profile_pic, first_name, second_name, email } = req.body;
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        if (!req.payload) {
            return res.status(404).json({ message: "User not found!" });
        }
        else {
            yield pool.request()
                .input('profile_pic', profile_pic)
                .input('first_name', first_name)
                .input('second_name', second_name)
                .input('email', email)
                .input('user_id', req.payload.user_id[0])
                .execute('updateUser');
            return res.status(201).json({ message: "Update successfull!" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.updateUser = updateUser;
// Deactivate
const deactivate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield mssql_1.default.connect(config_1.sqlConfig);
        if (!req.payload) {
            return res.status(404).json({ message: "Invalid token!" });
        }
        else {
            yield pool.request()
                .input('user_id', req.payload.user_id[0]).execute('deactivateUser');
            return res.json({ message: "We are sad to see you leave😥" });
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.deactivate = deactivate;
//Get Deactivated Users
const getInactive = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = mssql_1.default.connect(config_1.sqlConfig);
        let exusers = (yield (yield pool).request().execute('deactivatedUsers')).recordset;
        if (exusers.length === 0) {
            return res.status(404).json({ message: "All users are still active." });
        }
        else {
            return res.status(200).json(exusers);
        }
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
});
exports.getInactive = getInactive;
