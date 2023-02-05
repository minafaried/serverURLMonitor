const jwt = require('jsonwebtoken')
const URLServices = require('../services/URLCheckServices/fileDatabase_URLServices')
const monitorController = require('./monitorControllers/axiosMonitor')
exports.getAllURLs = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).send({ message: "unauthorized" })
            return;
        }
        const Bearertoken = req.headers.authorization.split(" ")
        //console.log(Bearertoken);
        let token = Bearertoken[1]
        jwt.verify(token, "bosta", async (err, authData) => {
            if (err) {
                res.status(401).send({ message: "expired token" })
            }
            else {
                res.status(200).send({ URLsCheck: await URLServices.getUserURLs(authData) })
            }
        })
    } catch (err) {
        console.log(err)
        res.status(402).send("try again")
    }
}

exports.addURLCheck = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).send({ message: "unauthorized" })
            return;
        }
        if (!req.body.name || !req.body.url || !req.body.protocol) {
            res.status(402).send({ message: "missing data" })
            return;
        }

        const Bearertoken = req.headers.authorization.split(" ")
        //console.log(Bearertoken);
        let token = Bearertoken[1]
        jwt.verify(token, "bosta", async (err, authData) => {
            if (err) {
                res.status(401).send("expired token")
            }
            else {
                URLCheck = {
                    "data": {
                        "name": req.body.name,
                        "url": req.body.url,
                        "protocol": req.body.protocol,
                        "path": req.body.path || "",
                        "port": req.body.port || "",
                        "webhook": req.body.webhook || "",
                        "timeout": req.body.timeout || 5000,
                        "interval": req.body.interval || 10000,
                        "threshold": req.body.threshold || 1,
                        "authentication": req.body.authentication || { username: "", password: "" },
                        "httpHeaders": req.body.headers || [],
                        "assert": req.body.assert || { statusCode: 200 },
                        "tags": req.body.tags || [],
                        "ignoreSSL": req.body.ignoreSSL || false,
                        "monitorState": "working"
                    },
                    "report": {
                        "status": 200,
                        "availability": true,
                        "outages": 0,
                        "downtime": 0.0,
                        "uptime": 1.0,
                        "responseTime": 0,
                        "history": [],
                        "count": 0
                    }
                };
                var obj = await URLServices.addURLToUser(authData, URLCheck)
                if (Object.keys(obj).length === 0) {
                    res.status(402).send({ message: "the name is exsisting" })
                }
                else {
                    monitorController.monitorTheURL(obj.data.name, authData);
                    res.status(200).send({ URLCheck: obj })
                }

            }

        })

    } catch (err) {
        console.log(err)
        res.status(402).send({ message: "try again" })
    }
}

exports.deleteURLByName = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).send({ message: "unauthorized" })
            return;
        }
        if (!req.body.name) {
            res.status(402).send({ message: "missing data" })
            return;
        }
        const Bearertoken = req.headers.authorization.split(" ")
        //console.log(Bearertoken);
        let token = Bearertoken[1]
        jwt.verify(token, "bosta", async (err, authData) => {
            if (err) {
                res.status(401).send({ message: "expired token" })
            }
            else {
                let URLChack = await URLServices.deleteURLFromUserByName(authData, req.body.name);
                if (Object.keys(URLChack).length === 0) {
                    res.status(402).send({ message: "dose not existed" })
                }
                else {
                    res.status(200).send({ URLChack })
                }
            }

        })

    } catch (err) {
        console.log(err)
        res.status(402).send("try again")
    }
}
exports.editURLByName = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).send({ message: "unauthorized" })
            return;
        }
        if (!req.query.name) {
            res.status(402).send({ message: "name is missing" })
            return;
        }

        const Bearertoken = req.headers.authorization.split(" ")
        //console.log(Bearertoken);
        let token = Bearertoken[1]
        jwt.verify(token, "bosta", async (err, authData) => {
            if (err) {
                res.status(401).send({ message: "expired token" })
            }
            else {
                URLCheckEdited = {
                    "name": req.body.name,
                    "url": req.body.url,
                    "protocol": req.body.protocol,
                    "path": req.body.path || "",
                    "port": req.body.port || "",
                    "webhook": req.body.webhook || "",
                    "timeout": req.body.timeout || 5000,
                    "interval": req.body.interval || 10000,
                    "threshold": req.body.threshold || 1,
                    "authentication": req.body.authentication || { username: "", password: "" },
                    "httpHeaders": req.body.headers || [],
                    "assert": req.body.assert || { statusCode: 200 },
                    "tags": req.body.tags || [],
                    "ignoreSSL": req.body.ignoreSSL || false,
                    "monitorState": "restart"
                };
                let URLChack = await URLServices.editUserURLByName(authData, req.query.name, URLCheckEdited);
                if (Object.keys(URLChack).length === 0) {
                    res.status(402).send({ message: "dose not existed" })

                }
                else {
                    if (req.query.name != req.body.name) {
                        monitorController.monitorTheURL(req.body.name, authData);
                    }
                    res.status(200).send({ URLChack })
                }
            }

        })

    } catch (err) {
        console.log(err)
        res.status(402).send("try again")
    }
}



exports.getURLDetailsByName = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            res.status(401).send({ message: "unauthorized" })
            return;
        }
        if (!req.query.name) {
            res.status(402).send({ message: "name is missing" })
            return;
        }
        const Bearertoken = req.headers.authorization.split(" ")
        //console.log(Bearertoken);
        let token = Bearertoken[1]
        jwt.verify(token, "bosta", async (err, authData) => {
            if (err) {
                res.status(401).send({ message: "expired token" })
            }
            else {
                let URLChack = await URLServices.getUserURLByName(authData, req.query.name);
                if (Object.keys(URLChack).length === 0) {
                    res.status(402).send({ message: "dose not existed" })
                    return;
                }
                res.status(200).send({ URLChack })
            }
        })
    } catch (err) {
        console.log(err)
        res.status(402).send("try again")
    }
}