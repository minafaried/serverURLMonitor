const fs = require('fs');
exports.getUserURLs = async (user) => {
    let returnData = [];
    var data = await fs.readFileSync(__dirname + '/../../database.json');
    if (data.length != 0) {
        JSON.parse(data).forEach((el) => {

            if (el.email == user.email && el.password == user.password) {
                returnData = el.URLsCheck
                return;
            }
        })
        return returnData;
    }
    else {
        return returnData
    }
}
exports.getUserURLByName = async (user, URLName) => {
    let returnData = {};
    var data = await fs.readFileSync(__dirname + '/../../database.json');
    if (data.length != 0) {
        JSON.parse(data).forEach((el) => {

            if (el.email == user.email && el.password == user.password) {
                el.URLsCheck.forEach((URL) => {
                    if (URL.data.name == URLName) {
                        returnData=URL;
                        return;
                    }
                })
            }
        })
        return returnData;
    }
    else {
        return returnData
    }
}
exports.addURLToUser = async (user, URLCheck) => {
    let foundURL=await this.getUserURLByName(user,URLCheck.data.name)
    let returnData = {};
    if(Object.keys(foundURL).length !== 0){
        return returnData;
    }
    var data = await fs.readFileSync(__dirname + '/../../database.json');
    if (data.length != 0) {
        users = JSON.parse(data);
        await users.forEach(async (el) => {
            if (el.email == user.email && el.password == user.password) {
                let lastId = 0;
                if (el.URLsCheck.length != 0) {

                    lastId = el.URLsCheck[el.URLsCheck.length - 1].id
                }
                URLCheck.id = lastId + 1;
                el.URLsCheck[el.URLsCheck.length] = URLCheck;

                await fs.writeFileSync(__dirname + '/../../database.json', JSON.stringify(users), 'utf8')
                returnData = URLCheck
                return;
            }
        })
        return returnData;
    }
    else {
        return returnData;
    }
}
exports.deleteURLFromUserByName = async (user, URLCheckName) => {
    var URLCheck = {}
    var data = await fs.readFileSync(__dirname + '/../../database.json');
    if (data.length != 0) {
        users = JSON.parse(data);
        await users.forEach(async (el) => {
            if (el.email == user.email && el.password == user.password) {
                URLsCheck = [];
                el.URLsCheck.forEach((URL) => {
                    if (URL.data.name != URLCheckName) {
                        URLsCheck.push(URL);
                    }
                    else {
                        URLCheck = URL;
                    }
                })
                el.URLsCheck = URLsCheck;
                await fs.writeFileSync(__dirname + '/../../database.json', JSON.stringify(users), 'utf8')
                return;
            }
        })
        return URLCheck;
    }
    else
        return URLCheck;
}

exports.editUserURLByName = async (user, URLCheckname, URLCheckData) => {
    let URLCheck = {}
    var data = await fs.readFileSync(__dirname + '/../../database.json');
    if (data.length != 0) {

        users = JSON.parse(data);
        await users.forEach(async (el) => {
            if (el.email == user.email && el.password == user.password) {

                URLsCheck = [];
                el.URLsCheck.forEach((URL) => {

                    if (URL.data.name == URLCheckname) {

                        URLCheck = { id: URL.id, data: URLCheckData, report: URL.report }

                        URLsCheck.push(URLCheck);
                    }
                    else
                        URLsCheck.push(URL)
                })
                el.URLsCheck = URLsCheck;

                await fs.writeFileSync(__dirname + '/../../database.json', JSON.stringify(users), 'utf8')
                return URLCheck;
            }
        })
        return URLCheck
    }
    else
        return URLCheck
}
exports.reportEdit = async (report, URLCheck, user) => {
    let data = await fs.readFileSync(__dirname + '/../../database.json');
    let isExist = false;
    if (data.length != 0) {
        users = JSON.parse(data);
        await users.forEach(async (el) => {
            if (el.email == user.email && el.password == user.password) {
                temp = [];
                el.URLsCheck.forEach((URL) => {
                    if (URL.data.name == URLCheck.data.name) {
                        temp.push({ id: URL.id, data: URL.data, report });
                        isExist = true;
                    }
                    else
                        temp.push(URL)
                })
                el.URLsCheck = temp;
                await fs.writeFileSync(__dirname + '/../../database.json', JSON.stringify(users), 'utf8')
                return;
            }
        })
    }
    return isExist;
}