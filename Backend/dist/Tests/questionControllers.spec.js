"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Question Tests', () => {
    //Post Question
    (0, vitest_1.it)('Should Post a new question', () => {
        return (0, supertest_1.default)(server_1.default).post('/questions/post')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(201)
            .send({
            "title": "Pundemic",
            "body": "Why did You get fired from the calender company?",
            "tags": [
                { "tag": "greetings" },
                { "tag": "vibes" },
                { "tag": "puns" },
                { "tag": "Dad jokes" },
                { "tag": "laughs" }
            ]
        })
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('Question added successfully!')
            }));
        });
    });
    // //Get All Question
    (0, vitest_1.it)('Should return all the questions in the database', () => {
        return (0, supertest_1.default)(server_1.default).get('/questions/all')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(200)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                question_id: vitest_1.expect.objectContaining({
                    title: vitest_1.expect.any(String),
                    body: vitest_1.expect.any(String),
                    user_id: vitest_1.expect.any(String),
                    upvotes: vitest_1.expect.any(Number),
                    downvotes: vitest_1.expect.any(Number),
                    tags: vitest_1.expect.arrayContaining([
                        vitest_1.expect.objectContaining({
                            tag_id: vitest_1.expect.any(String),
                            tag: vitest_1.expect.any(String)
                        })
                    ])
                })
            }));
        });
    });
    //Delete Question
    (0, vitest_1.it)('Should delete the question', () => {
        return (0, supertest_1.default)(server_1.default).delete('/questions/delete/062e4547-f673-447c-b64e-4f60b2a45885')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(200)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('Deleted!')
            }));
        });
    });
});
