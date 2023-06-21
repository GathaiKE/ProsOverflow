"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
(0, vitest_1.describe)('Question Tests', () => {
    //Post Question
    // it('Should Post a new question',()=>{
    //     return request(app).post('/questions/post')
    //     .expect('Content-Type',/json/)
    //     .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
    //     .expect(201)
    //     .send({
    //         "title":"Pundemic",
    //         "body":"Why did You get fired from the calender company?",
    //         "tags":[
    //             {"tag":"greetings"},
    //             {"tag":"vibes"},
    //             {"tag":"puns"},
    //             {"tag":"Dad jokes"},
    //             {"tag":"laughs"}
    //         ]
    //     })
    //     .then((res:request.Response)=>{
    //         expect(res.body).toEqual(
    //             expect.objectContaining({
    //                 message:expect.stringMatching('Question added successfully!')
    //             })
    //         )
    //     })
    // })
    // //Get All Question
    // it('Should return all the questions in the database',()=>{
    //     return request(app).get('/questions/all')
    //     .expect('Content-Type',/json/)
    //     .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
    //     .expect(200)
    //     .then((res:request.Response)=>{
    //         expect(res.body).toEqual(
    //             expect.objectContaining({
    //                     question_id:expect.objectContaining({
    //                     title:expect.any(String),
    //                     body:expect.any(String),
    //                     user_id:expect.any(String),
    //                     upvotes:expect.any(Number),
    //                     downvotes:expect.any(Number),
    //                     tags:expect.arrayContaining([
    //                         expect.objectContaining({
    //                             tag_id:expect.any(String),
    //                             tag:expect.any(String)
    //                         })
    //                     ])
    //                 })
    //             })
    //         )
    //     })
    // })
    //Delete Question
    // it('Should delete the question',()=>{
    //     return request(app).delete('/questions/delete/062e4547-f673-447c-b64e-4f60b2a45885')
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
