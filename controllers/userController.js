const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
const userServices = require('../services/userServices/fileDatabase_userServices')
const mailNotification = require('./notificationControllers/mailNotification')
exports.login = async (req, res, next) => {

    if (!req.body.email || !req.body.password) {
        res.status(402).send({ message: "missing data" });
        return;
    }
    let user = await userServices.getUser({ email: req.body.email, password: req.body.password });
    if (Object.keys(user).length != 0) {
        jwt.sign({
            "email": req.body.email,
            "password": req.body.password,
            "puchoverAPIToken": user.puchoverAPIToken || "",
            "puchoverUserToken": user.puchoverUserToken || "",
            "puchoverDevice": user.puchoverDevice || ""
            
        }, "bosta", { expiresIn: '1d' }, (err, token) => {
            if (err) {
                res.status(200).send("try again");
            }
            else {
                res.status(200).send({ token });
            }
        })
    }
    else {
        res.status(401).send({ message: "not Authenticated please signin" });
    }

}

exports.signup = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(402).send({ message: "missing data" });
        return;
    }
    try {
        user = await userServices.getUser({ email: req.body.email, password: req.body.password })
        if (Object.keys(user).length != 0) {
            res.status(200).send({ message: "this email already exists" });
            return;
        }
        jwt.sign({
            "email": req.body.email,
            "password": req.body.password,
            "puchoverAPIToken": req.body.puchoverAPIToken || "",
            "puchoverUserToken": req.body.puchoverUserToken || "",
            "puchoverDevice": req.body.puchoverDevice || ""
        }, "bosta", { expiresIn: '1y' }, async (err, token) => {
            await mailNotification.sendNotification(
                { text: "http://localhost:3000/user/verifyEmail?token=" + token, subject: "verify email" },
                { email: req.body.email }
            ).then(() => {
                res.status(200).send({ message: "the verifyEmail is sended" });
                return;
            }).catch((err) => {
                res.status(402).send({ message: "try again" });
                return;
            })
        });

    } catch (err) {
        console.log(err);
        res.status(402).send({ message: "try again" });
    }
}

exports.verifyEmail = async (req, res, next) => {
    if (!req.query.token) {
        res.status(402).send({ message: "missing data" });
        return;
    }
    try {

        jwt.verify(req.query.token, "bosta", async (err, authData) => {
            if (err) {
                res.status(401).send("expired token")
            }
            else {
                user = await userServices.getUser(authData)
                if (Object.keys(user).length != 0) {
                    res.status(200).send({ message: "this email already added" });
                    return;
                }
                await userServices.addUser({
                    email: authData.email,
                    password: authData.password,
                    puchoverAPIToken: authData.puchoverAPIToken || "",
                    puchoverUserToken: authData.puchoverUserToken || "",
                    puchoverDevice: authData.puchoverDevice || ""
                });
                res.status(200).send({ message: "email is verified" });
            }
        })

    } catch (err) {

    }
}


