"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
const server_1 = __importDefault(require("../server"));
(0, vitest_1.describe)('Answer Tests ', () => {
    //Post Answer
    (0, vitest_1.it)('Should Add answer to particular question', () => {
        return (0, supertest_1.default)(server_1.default).post('/answers/post/0cec4a4d-eba9-471d-a157-89ed24c57ea5')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(201)
            .send({
            "answer": "Because I tok a day off"
        })
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('Thank you for your response')
            }));
        });
    });
    //Get All  Answers
    (0, vitest_1.it)('Should return all answers', () => {
        return (0, supertest_1.default)(server_1.default).get('/answers/all')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(200)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    answer_id: vitest_1.expect.any(String),
                    answer: vitest_1.expect.any(String),
                    question_id: vitest_1.expect.any(String),
                    user_id: vitest_1.expect.any(String),
                    upvotes: vitest_1.expect.any(Number),
                    downvotes: vitest_1.expect.any(Number),
                    accepted: vitest_1.expect.any(Number)
                })
            ]));
        });
    });
    //Get Answers for a question
    (0, vitest_1.it)('Should return all answers for a single question', () => {
        return (0, supertest_1.default)(server_1.default).get('/answers//question/0cec4a4d-eba9-471d-a157-89ed24c57ea5')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(200)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    answer_id: vitest_1.expect.any(String),
                    answer: vitest_1.expect.any(String),
                    question_id: vitest_1.expect.any(String),
                    user_id: vitest_1.expect.any(String),
                    upvotes: vitest_1.expect.any(Number),
                    downvotes: vitest_1.expect.any(Number),
                    accepted: vitest_1.expect.any(Number)
                })
            ]));
        });
    });
    //Delete an answer
    (0, vitest_1.it)('Should delete selected answer', () => {
        return (0, supertest_1.default)(server_1.default).delete('/answers/delete/1af0e777-4c01-49c9-a14f-45d8607756cd')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(200)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringContaining('Deleted!')
            }));
        });
    });
    //Update Answer
    (0, vitest_1.it)('Should update selected answer', () => {
        return (0, supertest_1.default)(server_1.default).put('/answers/update/b70f9728-0ae2-4a80-a8cb-d34599a31190')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .send({
            "answer": "I love taking days off"
        })
            .expect(201)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('Update Successful')
            }));
        });
    });
    //Upvote Answer
    (0, vitest_1.it)('Should upvote selected answer', () => {
        return (0, supertest_1.default)(server_1.default).put('/answers/upvote/b70f9728-0ae2-4a80-a8cb-d34599a31190')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(200)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    answer_id: vitest_1.expect.any(String),
                    answer: vitest_1.expect.any(String),
                    question_id: vitest_1.expect.any(String),
                    user_id: vitest_1.expect.any(String),
                    upvotes: vitest_1.expect.any(Number),
                    downvotes: vitest_1.expect.any(Number),
                    accepted: vitest_1.expect.any(Number)
                })
            ]));
        });
    });
    //Downvote Answer
    (0, vitest_1.it)('Should downvote selected answer', () => {
        return (0, supertest_1.default)(server_1.default).put('/answers/downvote/b70f9728-0ae2-4a80-a8cb-d34599a31190')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(200)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    answer_id: vitest_1.expect.any(String),
                    answer: vitest_1.expect.any(String),
                    question_id: vitest_1.expect.any(String),
                    user_id: vitest_1.expect.any(String),
                    upvotes: vitest_1.expect.any(Number),
                    downvotes: vitest_1.expect.any(Number),
                    accepted: vitest_1.expect.any(Number)
                })
            ]));
        });
    });
    //Accept Answer
    (0, vitest_1.it)('Should downvote selected answer', () => {
        return (0, supertest_1.default)(server_1.default).put('/answers/accept/b70f9728-0ae2-4a80-a8cb-d34599a31190')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(200)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    answer_id: vitest_1.expect.any(String),
                    answer: vitest_1.expect.any(String),
                    question_id: vitest_1.expect.any(String),
                    user_id: vitest_1.expect.any(String),
                    upvotes: vitest_1.expect.any(Number),
                    downvotes: vitest_1.expect.any(Number),
                    accepted: vitest_1.expect.any(Number)
                })
            ]));
        });
    });
});
