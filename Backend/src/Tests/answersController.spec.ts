import request from 'supertest'
import {describe,it,expect} from 'vitest'
import app from '../server'
import { string } from 'joi'

describe('Answer Tests ',()=>{

    //Post Answer
it('Should Add answer to particular question',()=>{
    return request(app).post('/answers/post/0cec4a4d-eba9-471d-a157-89ed24c57ea5')
    .expect('Content-Type',/json/)
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
    .expect(201)
    .send({
        "answer":"Because I tok a day off"
    })
    .then((res:request.Response)=>{
        expect (res.body).toEqual(
            expect.objectContaining({
                message:expect.stringMatching('Thank you for your response')
            })
        )
    })
})


    //Get All  Answers

    it('Should return all answers',()=>{
        return request(app).get('/answers/all')
        .expect('Content-Type',/json/)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
        .expect(200)
        .then((res:request.Response)=>{
            expect (res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        answer_id:expect.any(String),
                        answer:expect.any(String),
                        question_id:expect.any(String),
                        user_id:expect.any(String),
                        upvotes:expect.any(Number),
                        downvotes:expect.any(Number),
                        accepted:expect.any(Number)
                    })
                ])
            )
        })
    })


    //Get Answers for a question

    it('Should return all answers for a single question',()=>{
        return request(app).get('/answers//question/0cec4a4d-eba9-471d-a157-89ed24c57ea5')
        .expect('Content-Type',/json/)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
        .expect(200)
        .then((res:request.Response)=>{
            expect (res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        answer_id:expect.any(String),
                        answer:expect.any(String),
                        question_id:expect.any(String),
                        user_id:expect.any(String),
                        upvotes:expect.any(Number),
                        downvotes:expect.any(Number),
                        accepted:expect.any(Number)
                    })
                ])
            )
        })
    })

    //Delete an answer

    // it('Should delete selected answer',()=>{
    //     return request(app).delete('/answers/delete/1af0e777-4c01-49c9-a14f-45d8607756cd')
    //     .expect('Content-Type',/json/)
    //     .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
    //     .expect(200)
    //     .then((res:request.Response)=>{
    //         expect (res.body).toEqual(
    //             expect.objectContaining({
    //                 message:expect.stringContaining('Deleted!')
    //             })
    //         )
    //     })
    // })

    //Update Answer

    it('Should update selected answer',()=>{
        return request(app).put('/answers/update/b70f9728-0ae2-4a80-a8cb-d34599a31190')
        .expect('Content-Type',/json/)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
        .send({
            "answer":"I love taking days off"
        })
        .expect(201)
        .then((res:request.Response)=>{
            expect (res.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Update Successful')
                })
            )
        })
    })


     //Upvote Answer

        it('Should upvote selected answer',()=>{
        return request(app).put('/answers/upvote/b70f9728-0ae2-4a80-a8cb-d34599a31190')
        .expect('Content-Type',/json/)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
        .expect(200)
        .then((res:request.Response)=>{
            expect (res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        answer_id:expect.any(String),
                        answer:expect.any(String),
                        question_id:expect.any(String),
                        user_id:expect.any(String),
                        upvotes:expect.any(Number),
                        downvotes:expect.any(Number),
                        accepted:expect.any(Number)
                    })
                ])
            )
        })
        
    })
//Downvote Answer

it('Should downvote selected answer',()=>{
    return request(app).put('/answers/downvote/b70f9728-0ae2-4a80-a8cb-d34599a31190')
    .expect('Content-Type',/json/)
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
    .expect(200)
    .then((res:request.Response)=>{
        expect (res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    answer_id:expect.any(String),
                    answer:expect.any(String),
                    question_id:expect.any(String),
                    user_id:expect.any(String),
                    upvotes:expect.any(Number),
                    downvotes:expect.any(Number),
                    accepted:expect.any(Number)
                })
            ])
        )
    }
    )
})

//Accept Answer

it('Should downvote selected answer',()=>{
    return request(app).put('/answers/accept/b70f9728-0ae2-4a80-a8cb-d34599a31190')
    .expect('Content-Type',/json/)
    .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
    .expect(200)
    .then((res:request.Response)=>{
        expect (res.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    answer_id:expect.any(String),
                    answer:expect.any(String),
                    question_id:expect.any(String),
                    user_id:expect.any(String),
                    upvotes:expect.any(Number),
                    downvotes:expect.any(Number),
                    accepted:expect.any(Number)
                })
            ])
        )
    }
    )
})

})