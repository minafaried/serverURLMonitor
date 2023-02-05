const fs = require('fs');
exports.addUser = async (userObj) => {
    var data = await fs.readFileSync(__dirname + '/../../database.json');
    let user = [];
    if (data.length != 0) {
        user = JSON.parse(data);
    }
    user[user.length] = {
        "email": userObj.email,
        "password": userObj.password,
        "puchoverAPIToken": userObj.puchoverAPIToken || "",
        "puchoverUserToken": userObj.puchoverUserToken || "",
        "puchoverDevice":userObj.puchoverDevice||"",
        "URLsCheck": []
    }
    await fs.writeFileSync(__dirname + '/../../database.json', JSON.stringify(user), 'utf8')
}

exports.getUser = async (userObj) => {
    let user={};
    var data = await fs.readFileSync(__dirname + '/../../database.json');
    if (data.length != 0) {
        
        JSON.parse(data).forEach((el) => {

            if (el.email == userObj.email && el.password == userObj.password) {
                user=el;
                return;
            }
        })
        return user;
    }
    else{
        return user;
    }
}