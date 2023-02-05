const request = require('supertest')
const app = require('../server')
describe('should be Success', () => {
    it('login with valid data', () => {
        return request(app)
            .post('/user/login')
            .send({ email: 'monyfaried25@gmail.com', password: "123" })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        { token: expect.any(String) }
                    )
                )
            });
    })
    it('not existing User login', () => {
        return request(app)
            .post('/user/login')
            .send({ email: 'mina@gmail.com', password: "123" })
            .expect(401)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        { message: "not Authenticated please signin" }
                    )
                )
            });
    })
    it('missing login data', () => {
        return request(app)
            .post('/user/login')
            .send({ email: 'mina@gmail.com' })
            .expect(402)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        { message: "missing data" }
                    )
                )
            });
    })
    // it('new user signup with valid data', () => {
    //     return request(app)
    //         .post('/user/signup')
    //         .send({ email: 'testing.email.acc2023@gmail.com', password: "123" })
    //         .expect(200)
    //         .then((res) => {
    //             expect(res.body).toEqual(
    //                 expect.objectContaining(
    //                     { message: "the verifyEmail is sended" }
    //                 )
    //             )
    //         });
    // })
    it('existing user signup with valid data', () => {
        return request(app)
            .post('/user/signup')
            .send({ email: 'monyfaried25@gmail.com', password: "123" })
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        { message: "this email already exists" }
                    )
                )
            });
    })
    it('missing signup data', () => {
        return request(app)
            .post('/user/signup')
            .send({ email: 'monyfaried25@gmail.com' })
            .expect(402)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        { message: "missing data" }
                    )
                )
            });
    })
    // it('verifyEmail valid token', () => {
    //     return request(app)
    //         .get('/user/verifyEmail?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8')
    //         .expect(200)
    //         .then((res) => {
    //             expect(res.body).toEqual(
    //                 expect.objectContaining(
    //                     { message: "email is verified" }
    //                 )
    //             )
    //         });
    // })
    it('verifyEmail valid token already used', () => {
        return request(app)
            .get('/user/verifyEmail?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8')
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        { message: "this email already added" }
                    )
                )
            });
    })
    // it('verifyEmail with expired token', () => {
    //     return request(app)
    //         .get('/user/verifyEmail?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8')
    //         .expect(200)
    //         .then((res) => {
    //             expect(res.body).toEqual(
    //                 expect.objectContaining(
    //                     { message: "expired token" }
    //                 )
    //             )
    //         });
    // })
})
