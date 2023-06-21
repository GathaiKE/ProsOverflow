import request from 'supertest'
import {describe,expect,it} from 'vitest'
import {userRoutes} from '../Routes/userRoutes'
import app from '../server'
import { string } from 'joi'


describe('User tests',()=>{

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
    it('Should get return 401 if no token is read',()=>{
        return request(app).get('/users/getUsers')
        .expect('Content-Type',/json/)
        .expect(401)
        .then((res:request.Response)=>{
            expect(res.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('User not authorized')
                })
            )
        })
    })

    //Get All Users

    it('should Return A liat of all users',()=>{
        return request(app).get('/users/getUsers')
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbImZjOWFhMzVmLTNhYzEtNDU3Yy1hOTNhLWE2YjU2NjRhNzg0ZiIsImZjOWFhMzVmLTNhYzEtNDU3Yy1hOTNhLWE2YjU2NjRhNzg0ZiJdLCJmaXJzdF9uYW1lIjoiS2FyaXVraSIsInNlY29uZF9uYW1lIjoiR2F0aGFpIiwiZW1haWwiOiJnYXRoYWkxMjM0QGVtYWlsLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NTA5M30.Dmfx5rU-UfPAjAR0qnbADQJEbd_4gOoZJdNFY658n14")
        .expect(200)
        .then((res:request.Response)=>{
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        user_id:expect.arrayContaining([expect.any(String)]),
                        profile_pic:expect.any(String),
                        first_name:expect.any(String),
                        second_name:expect.any(String),
                        email:expect.any(String),
                        email_sent:expect.any(Number),
                        deactivated:expect.any(Number),
                        password:expect.any(String),
                        role_id:expect.arrayContaining([expect.any(Number)]),
                        role:expect.any(String)
                    })
                ])
            )
        })
    })


    // Log In 
    it('Should read a user_id from the token and return their details',()=>{
        return request(app).get('/users/getById')
        .expect('Content-Type',/json/)
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbImZjOWFhMzVmLTNhYzEtNDU3Yy1hOTNhLWE2YjU2NjRhNzg0ZiIsImZjOWFhMzVmLTNhYzEtNDU3Yy1hOTNhLWE2YjU2NjRhNzg0ZiJdLCJmaXJzdF9uYW1lIjoiS2FyaXVraSIsInNlY29uZF9uYW1lIjoiR2F0aGFpIiwiZW1haWwiOiJnYXRoYWkxMjM0QGVtYWlsLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NTA5M30.Dmfx5rU-UfPAjAR0qnbADQJEbd_4gOoZJdNFY658n14")
        .expect(200)
        .then((res:request.Response)=>{
            expect(res.body).toEqual(
                    expect.objectContaining({
                        user_id:expect.arrayContaining([expect.any(String)]),
                        profile_pic:expect.any(String),
                        first_name:expect.any(String),
                        second_name:expect.any(String),
                        email:expect.any(String),
                        email_sent:expect.any(Number),
                        deactivated:expect.any(Number),
                        password:expect.any(String),
                        role_id:expect.arrayContaining([expect.any(Number)]),
                        role:expect.any(String)
                    })
            )
        })
    })

    //Get By Email
    it('Should read a users email from the token and return their details',()=>{
        return request(app).get('/users/getByEmail')
        .expect('Content-Type',/json/)
        .set("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA")
        .expect(200)
        .then((res:request.Response)=>{
            expect(res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            user_id:expect.arrayContaining([expect.any(String)]),
                            profile_pic:expect.any(String),
                            first_name:expect.any(String),
                            second_name:expect.any(String),
                            email:expect.any(String),
                            email_sent:expect.any(Number),
                            deactivated:expect.any(Number),
                            password:expect.any(String),
                            role_id:expect.arrayContaining([expect.any(Number)]),
                            role:expect.any(String)
                        })
                    ])
            )
        })
    })

   // Update User

    it('Should Update a Users details',()=>{
        return request(app).put('/users/update')
        .expect('Content-Type',/json/)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbImZjOWFhMzVmLTNhYzEtNDU3Yy1hOTNhLWE2YjU2NjRhNzg0ZiIsImZjOWFhMzVmLTNhYzEtNDU3Yy1hOTNhLWE2YjU2NjRhNzg0ZiJdLCJmaXJzdF9uYW1lIjoiS2FyaXVraSIsInNlY29uZF9uYW1lIjoiR2F0aGFpIiwiZW1haWwiOiJnYXRoYWkxMjM0QGVtYWlsLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NTA5M30.Dmfx5rU-UfPAjAR0qnbADQJEbd_4gOoZJdNFY658n14')
        .expect(201).send({
            "profile_pic":"picture perfect",
            "first_name":"Brian",
            "second_name":"Gathai",
            "email":"gathai7@email.com"
        })
        .then((res:request.Response)=>{
            expect (res.body).toEqual(
                expect.objectContaining({
                    message:expect.stringMatching('Update successfull!')
                })
            )
        })
    })



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
    it("Should return a list of all users who have de-activated",()=>{
        return request(app).get('/users/inactive')
        .expect('Content-Type',/json/)
        .set('token','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjpbIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSIsIjA1YTM1MDRkLWQ0YzUtNGE2Ni04ZGVhLWMyZjRkMjU3OTdlYSJdLCJmaXJzdF9uYW1lIjoiVGVzdCIsInNlY29uZF9uYW1lIjoiVXNlciIsImVtYWlsIjoidGVzdEB1c2VyLmNvbSIsInJvbGVfaWQiOlsyLDJdLCJyb2xlIjoidXNlciIsImlhdCI6MTY4NzM0NzYyN30.YnOQIc9p-B_KT8qyYqr25bHuc6pdzQpVCAn4i-z59jA')
        .expect(200).then((res:request.Response)=>{
            expect(res.body).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        user_id:expect.any(String),
                        profile_pic:expect.any(String),
                        first_name:expect.any(String),
                        second_name:expect.any(String),
                        email:expect.any(String),
                        email_sent:expect.any(Number),
                        deactivated:expect.any(Number),
                        password:expect.any(String)
                    })
                ])
            )
        })
    })


})