import request from 'supertest'
import {describe,it,expect} from 'vitest'
import app from '../server'

describe('Comment tests',()=>{

    //Post comment
        it('Should Add a comment to a particular answer',()=>{
            return request(app).post('/comments/add/b70f9728-0ae2-4a80-a8cb-d34599a31190')
            .expect('Content-Type',/json/)
            .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(201)
            .send({
                "comment":"tests are all running!!"
            })
            .then((res:request.Response)=>{
                expect (res.body).toEqual(
                    expect.objectContaining({
                        message:expect.stringMatching('Comment Added')
                    })
                )
            })
        })

    //Update comment
        it('Should Update a selected comment',()=>{
            return request(app).put('/comments/update/356df506-fb3a-442a-9ea9-7efaad10ee6d')
            .expect('Content-Type',/json/)
            .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(201)
            .send({
                "comment":"tests are not all running!!"
            })
            .then((res:request.Response)=>{
                expect (res.body).toEqual(
                    expect.objectContaining({
                        message:expect.stringMatching('Update successfull')
                    })
                )
            })
        })

    //Get comments for an answer

        it('Should return all comments to an answer',()=>{
            return request(app).get('/comments/get/b70f9728-0ae2-4a80-a8cb-d34599a31190')
            .expect('Content-Type',/json/)
            .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(200)
            .then((res:request.Response)=>{
                expect (res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            user_id:expect.any(String),
                            first_name:expect.any(String),
                            profile_pic:expect.any(String),
                            comment_id:expect.any(String),
                            comment:expect.any(String),
                            answer_id:expect.any(String)
                        })
                    ])
                )
            })
        })

    //Delete comment

        it('Should delete a selected comment',()=>{
            return request(app).delete('/comments/delete/cd75d588-e257-465d-858c-55ff9df8c274')
            .expect('Content-Type',/json/)
            .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
            .expect(200)
            .then((res:request.Response)=>{
                expect (res.body).toEqual(
                    expect.objectContaining({
                        message:expect.stringMatching('Deleted!')
                    })
                )
            })
        })
})