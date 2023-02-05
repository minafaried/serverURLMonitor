const request = require('supertest')
const app = require('../server')
describe('should be Success', () => {
    it('get all urls successfully', () => {
        return request(app)
            .get('/url/getAllURLs')
            .expect('Content-Type', /json/)
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        { URLsCheck: expect.any(Array) }
                    )
                )
            });
    })
    it('add url with invalid data', () => {
        return request(app)
            .post('/url/addUrlCheck')
            .send({
                name: "bosta_ass",
                url: "https://github.com/bostaapp/be-assessment/",
            })
            .expect('Content-Type', /json/)
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect(402)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "missing data"
                        }
                    )
                )
            });
    })
    it('add url with valid data', () => {
        return request(app)
            .post('/url/addUrlCheck')
            .send({
                name: "bosta_ass",
                url: "https://github.com/bostaapp/be-assessment/",
                protocol: "https",
            })
            .expect('Content-Type', /json/)
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            URLCheck: {
                                data: expect.any(Object),
                                report: expect.any(Object),
                                id: expect.any(Number)
                            }
                        }
                    )
                )
            });
    })
    it('add url with exsisting name', () => {
        return request(app)
            .post('/url/addUrlCheck')
            .send({
                name: "bosta_ass",
                url: "https://github.com/bostaapp/be-assessment/",
                protocol: "https",
            })
            .expect('Content-Type', /json/)
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect(402)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "the name is exsisting"
                        }
                    )
                )
            });
    })
    it('add url without token', () => {
        return request(app)
            .post('/url/addUrlCheck')
            .send({
                name: "bosta_ass",
                url: "https://github.com/bostaapp/be-assessment/",
                protocol: "https",
            })
            .expect('Content-Type', /json/)
            .expect(401)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "unauthorized"
                        }
                    )
                )
            });
    })
    it('get URL Details', () => {
        return request(app)
            .get('/url/getURLDetailsByName?name=bosta_ass')
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            URLChack: expect.any(Object)
                        }
                    )
                )
            });

    })
    it('get URL Details without token', () => {
        return request(app)
            .get('/url/getURLDetailsByName?name=bosta_ass')
            .expect('Content-Type', /json/)
            .expect(401)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "unauthorized"
                        }
                    )
                )
            });

    })
    it('get URL Details without name', () => {
        return request(app)
            .get('/url/getURLDetailsByName')
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect('Content-Type', /json/)
            .expect(402)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "name is missing"
                        }
                    )
                )
            });

    })
    it('get URL Details dose not existed', () => {
        return request(app)
            .get('/url/getURLDetailsByName?name=nonexisted')
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect('Content-Type', /json/)
            .expect(402)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "dose not existed"
                        }
                    )
                )
            });

    })

    it('edit url with valid data', () => {
        return request(app)
            .put('/url/editURLByName?name=bosta_ass')
            .send({
                name: "bosta_ass",
                url: "https://github.com/bostaapp/be-assessment/",
                protocol: "https",
            })
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            URLChack: expect.any(Object)
                        }
                    )
                )
            });
    })

    it('edit url without token', () => {
        return request(app)
            .put('/url/editURLByName?name=bosta_ass')
            .send({
                name: "bosta_ass",
                url: "https://github.com/bostaapp/be-assessment/",
                protocol: "https",
            })
            .expect('Content-Type', /json/)
            .expect(401)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "unauthorized"
                        }
                    )
                )
            });
    })

    // it('edit url with missing data', () => {
    //     return request(app)
    //         .put('/url/editURLByName?name=bosta_ass')
    //         .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
    //         .expect('Content-Type', /json/)
    //         .expect(402)
    //         .then((res) => {
    //             expect(res.body).toEqual(
    //                 expect.objectContaining(
    //                     { 
    //                         message: "missing data"
    //                      }
    //                 )
    //             )
    //         });
    // })
    it('editing not Existeing url', () => {
        return request(app)
            .put('/url/editURLByName?name=not_ExistingName')
            .send({
                name: "bosta_ass",
                url: "https://github.com/bostaapp/be-assessment/",
                protocol: "https",
            })
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect('Content-Type', /json/)
            .expect(402)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "dose not existed"
                        }
                    )
                )
            });
    })
    it('deleteing url without send the name', () => {
        return request(app)
            .put('/url/editURLByName')
            .send({
                name: "bosta_ass",
                url: "https://github.com/bostaapp/be-assessment/",
                protocol: "https",
            })
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect('Content-Type', /json/)
            .expect(402)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "name is missing"
                        }
                    )
                )
            });

    })



    it('delete url without token', () => {
        return request(app)
            .delete('/url/deleteURLByName')
            .send({ name: "bosta_ass" })
            .expect('Content-Type', /json/)
            .expect(401)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "unauthorized"
                        }
                    )
                )
            });
    })
    it('delete url with valid data', () => {
        return request(app)
            .delete('/url/deleteURLByName')
            .send({ name: "bosta_ass" })
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            URLChack: expect.any(Object)
                        }
                    )
                )
            });
    })
    it('delete url with missing data', () => {
        return request(app)
            .delete('/url/deleteURLByName')
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect('Content-Type', /json/)
            .expect(402)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "missing data"
                        }
                    )
                )
            });
    })
    it('deleteing not Existeing url', () => {
        return request(app)
            .delete('/url/deleteURLByName')
            .send({ name: "not_Existeing_name" })
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect('Content-Type', /json/)
            .expect(402)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "dose not existed"
                        }
                    )
                )
            });
    })
    it('deleteing not Existeing url', () => {
        return request(app)
            .delete('/url/deleteURLByName')
            .send({ name: "not_Existeing_name" })
            .set("Authorization", "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vbnlmYXJpZWQyNUBnbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMyIsInB1Y2hvdmVyQVBJVG9rZW4iOiJhYWczbm1ienZ4NjJ1dzNxcWpweTRpOHJxNTY4c3QiLCJwdWNob3ZlclVzZXJUb2tlbiI6InVqdXR2OGJjdGN3aHg2M3NpaWFmbm82dmpxc2R5MiIsInB1Y2hvdmVyRGV2aWNlIjoicmVkbWlub3RlOCIsImlhdCI6MTY3NTYzMDM4OSwiZXhwIjoxNzA3MTg3OTg5fQ.Qy6n0ckGeZZKadvjup1O9QNgmugQc1EHqNbIrrBTvM8")
            .expect('Content-Type', /json/)
            .expect(402)
            .then((res) => {
                expect(res.body).toEqual(
                    expect.objectContaining(
                        {
                            message: "dose not existed"
                        }
                    )
                )
            });

    })







})
