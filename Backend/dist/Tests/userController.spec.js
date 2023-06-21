"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
const server_1 = __importDefault(require("../server"));
(0, vitest_1.describe)('User tests', () => {
    // Registration
    // it('Should add a new user',()=>{
    //     return request(app).post('/users/register')
    //     .expect('Content-Type',/json/)
    //     .expect(201).send({
    //         "profile_pic":string,
    //         "first_name":"Kariuki",
    //         "second_name":"Gathai",
    //         "email":"gath34@email.com",
    //         "password":"B91371758@b"
    //     })
    //     .then((response:request.Response)=>{
    //         expect(response.body).toEqual(
    //             expect.objectContaining({
    //                 message:expect.stringMatching("Welcome to Pro's Overflow!")
    //             })
    //         )
    //     })
    // })
    //Check when No token is passed
    (0, vitest_1.it)('Should get return 401 if no token is read', () => {
        return (0, supertest_1.default)(server_1.default).get('/users/getUsers')
            .expect('Content-Type', /json/)
            .expect(401)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('User not authorized')
            }));
        });
    });
    //Get All Users
    (0, vitest_1.it)('should Return A liat of all users', () => {
        return (0, supertest_1.default)(server_1.default).get('/users/getUsers')
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbImZjOWFhMzVmLTNhYzEtNDU3Yy1hOTNhLWE2YjU2NjRhNzg0ZiIsImZjOWFhMzVmLTNhYzEtNDU3Yy1hOTNhLWE2YjU2NjRhNzg0ZiJdLCJmaXJzdF9uYW1lIjoiS2FyaXVraSIsInNlY29uZF9uYW1lIjoiR2F0aGFpIiwiZW1haWwiOiJnYXRoYWkxMjM0QGVtYWlsLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NTA5M30.Dmfx5rU-UfPAjAR0qnbADQJEbd_4gOoZJdNFY658n14")
            .expect(200)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    user_id: vitest_1.expect.arrayContaining([vitest_1.expect.any(String)]),
                    profile_pic: vitest_1.expect.any(String),
                    first_name: vitest_1.expect.any(String),
                    second_name: vitest_1.expect.any(String),
                    email: vitest_1.expect.any(String),
                    email_sent: vitest_1.expect.any(Number),
                    deactivated: vitest_1.expect.any(Number),
                    password: vitest_1.expect.any(String),
                    role_id: vitest_1.expect.arrayContaining([vitest_1.expect.any(Number)]),
                    role: vitest_1.expect.any(String)
                })
            ]));
        });
    });
    // Get By Id
    (0, vitest_1.it)('Should read a user_id from the token and return their details', () => {
        return (0, supertest_1.default)(server_1.default).get('/users/getById')
            .expect('Content-Type', /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbImZjOWFhMzVmLTNhYzEtNDU3Yy1hOTNhLWE2YjU2NjRhNzg0ZiIsImZjOWFhMzVmLTNhYzEtNDU3Yy1hOTNhLWE2YjU2NjRhNzg0ZiJdLCJmaXJzdF9uYW1lIjoiS2FyaXVraSIsInNlY29uZF9uYW1lIjoiR2F0aGFpIiwiZW1haWwiOiJnYXRoYWkxMjM0QGVtYWlsLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NTA5M30.Dmfx5rU-UfPAjAR0qnbADQJEbd_4gOoZJdNFY658n14")
            .expect(200)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                user_id: vitest_1.expect.arrayContaining([vitest_1.expect.any(String)]),
                profile_pic: vitest_1.expect.any(String),
                first_name: vitest_1.expect.any(String),
                second_name: vitest_1.expect.any(String),
                email: vitest_1.expect.any(String),
                email_sent: vitest_1.expect.any(Number),
                deactivated: vitest_1.expect.any(Number),
                password: vitest_1.expect.any(String),
                role_id: vitest_1.expect.arrayContaining([vitest_1.expect.any(Number)]),
                role: vitest_1.expect.any(String)
            }));
        });
    });
    //Get By Email
    (0, vitest_1.it)('Should read a users email from the token and return their details', () => {
        return (0, supertest_1.default)(server_1.default).get('/users/getByEmail')
            .expect('Content-Type', /json/)
            .set("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA")
            .expect(200)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    user_id: vitest_1.expect.arrayContaining([vitest_1.expect.any(String)]),
                    profile_pic: vitest_1.expect.any(String),
                    first_name: vitest_1.expect.any(String),
                    second_name: vitest_1.expect.any(String),
                    email: vitest_1.expect.any(String),
                    email_sent: vitest_1.expect.any(Number),
                    deactivated: vitest_1.expect.any(Number),
                    password: vitest_1.expect.any(String),
                    role_id: vitest_1.expect.arrayContaining([vitest_1.expect.any(Number)]),
                    role: vitest_1.expect.any(String)
                })
            ]));
        });
    });
    // Update User
    (0, vitest_1.it)('Should Update a Users details', () => {
        return (0, supertest_1.default)(server_1.default).put('/users/update')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbImZjOWFhMzVmLTNhYzEtNDU3Yy1hOTNhLWE2YjU2NjRhNzg0ZiIsImZjOWFhMzVmLTNhYzEtNDU3Yy1hOTNhLWE2YjU2NjRhNzg0ZiJdLCJmaXJzdF9uYW1lIjoiS2FyaXVraSIsInNlY29uZF9uYW1lIjoiR2F0aGFpIiwiZW1haWwiOiJnYXRoYWkxMjM0QGVtYWlsLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NTA5M30.Dmfx5rU-UfPAjAR0qnbADQJEbd_4gOoZJdNFY658n14')
            .expect(201).send({
            "profile_pic": "picture perfect",
            "first_name": "Brian",
            "second_name": "Gathai",
            "email": "gathai7@email.com"
        })
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('Update successfull!')
            }));
        });
    });
    //Deactivate a User's Account
    // it("Should read a users email from the token and update the deactivated property value to one",()=>{
    //     return request(app).put('/users/deactivate')
    //     .expect('Content-Type',/json/)
    //     .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjViNWViMzQ5LWZlZWQtNDhlYS1hOWY5LTMxOWQ1YzZhZWFhZCIsIjViNWViMzQ5LWZlZWQtNDhlYS1hOWY5LTMxOWQ1YzZhZWFhZCJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoiZGVAdXNlci5jb20iLCJyb2xlX2lkIjpbMiwyXSwicm9sZSI6InVzZXIiLCJpYXQiOjE2ODczNDgxMjh9.ZFzDy8ZQIiYw0TUGSaL4bX0zcWe5ci1BspmUmPa6Rqg')
    //     .expect(200)
    //     .then((res:request.Response)=>{
    //         expect (res.body).toEqual(
    //             expect.objectContaining({
    //                 message:expect.stringMatching('We are sad to see you leave😥')
    //             })
    //         )
    //     })
    // })
    //Get all Users who have left
    (0, vitest_1.it)("Should return a list of all users who have de-activated", () => {
        return (0, supertest_1.default)(server_1.default).get('/users/inactive')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(200).then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    user_id: vitest_1.expect.any(String),
                    profile_pic: vitest_1.expect.any(String),
                    first_name: vitest_1.expect.any(String),
                    second_name: vitest_1.expect.any(String),
                    email: vitest_1.expect.any(String),
                    email_sent: vitest_1.expect.any(Number),
                    deactivated: vitest_1.expect.any(Number),
                    password: vitest_1.expect.any(String)
                })
            ]));
        });
    });
});
