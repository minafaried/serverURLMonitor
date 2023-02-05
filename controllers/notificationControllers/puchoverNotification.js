const axios = require('axios')
exports.sendNotification = async (data, user) => {
    if(!user.puchoverAPIToken||!user.puchoverUserToken){
        return;
    }
    axios.post("https://api.pushover.net/1/messages.json", {
        token:  user.puchoverAPIToken,//"aag3nmbzvx62uw3qqjpy4i8rq568st",
        user: user.puchoverUserToken,//"ujutv8bctcwhx63siiafno6vjqsdy2"
        message: JSON.stringify(data.text).toString(),
        device :user.puchoverDevice
    }).catch((err) => {
        console.log(err)
    })
}