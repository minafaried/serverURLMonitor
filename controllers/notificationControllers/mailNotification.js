 
const nodemailer = require('nodemailer')
 exports.sendNotification=async(data, user)=> {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            user: "testing.email.acc2023@gmail.com",
            pass: "yerodvyinvntjlfj", 
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // send mail with defined transport object
    transporter.sendMail({
        from: "testing.email.acc2023@gmail.com", // sender address
        to: user.email, // list of receivers
        subject: JSON.stringify(data.subject).toString(), // Subject line
        text: JSON.stringify(data.text).toString() , // plain text body
    },(err)=>{
       
    })
}