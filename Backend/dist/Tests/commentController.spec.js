"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const vitest_1 = require("vitest");
const server_1 = __importDefault(require("../server"));
(0, vitest_1.describe)('Comment tests', () => {
    //Post comment
    (0, vitest_1.it)('Should Add a comment to a particular answer', () => {
        return (0, supertest_1.default)(server_1.default).post('/comments/add/b70f9728-0ae2-4a80-a8cb-d34599a31190')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(201)
            .send({
            "comment": "tests are all running!!"
        })
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('Comment Added')
            }));
        });
    });
    //Update comment
    (0, vitest_1.it)('Should Update a selected comment', () => {
        return (0, supertest_1.default)(server_1.default).put('/comments/update/356df506-fb3a-442a-9ea9-7efaad10ee6d')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(201)
            .send({
            "comment": "tests are not all running!!"
        })
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.objectContaining({
                message: vitest_1.expect.stringMatching('Update successfull')
            }));
        });
    });
    //Get comments for an answer
    (0, vitest_1.it)('Should return all comments to an answer', () => {
        return (0, supertest_1.default)(server_1.default).get('/comments/get/b70f9728-0ae2-4a80-a8cb-d34599a31190')
            .expect('Content-Type', /json/)
            .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(200)
            .then((res) => {
            (0, vitest_1.expect)(res.body).toEqual(vitest_1.expect.arrayContaining([
                vitest_1.expect.objectContaining({
                    user_id: vitest_1.expect.any(String),
                    first_name: vitest_1.expect.any(String),
                    profile_pic: vitest_1.expect.any(String),
                    comment_id: vitest_1.expect.any(String),
                    comment: vitest_1.expect.any(String),
                    answer_id: vitest_1.expect.any(String)
                })
            ]));
        });
    });
    //Delete comment
    // it('Should delete a selected comment',()=>{
    //     return request(app).delete('/comments/delete/cd75d588-e257-465d-858c-55ff9df8c274')
    //     .expect('Content-Type',/json/)
    //     .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
    //     .expect(200)
    //     .then((res:request.Response)=>{
    //         expect (res.body).toEqual(
    //             expect.objectContaining({
    //                 message:expect.stringMatching('Deleted!')
    //             })
    //         )
    //     })
    // })
});
