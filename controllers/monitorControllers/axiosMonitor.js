
const axios = require('axios');
const URLServices = require("../../services/URLCheckServices/fileDatabase_URLServices")
const mailNotificationController = require("../notificationControllers/mailNotification")
const puchoverNotificationController = require("../notificationControllers/puchoverNotification")
const URLCheckServices = require("../../services/URLCheckServices/fileDatabase_URLServices")
exports.monitorTheURL = async (URLCheckName, user) => {
    let startTotalTime = performance.now();
    let totalResponseTime = 0;
    let loopbreak = false
    while (true) {
        let URLCheck = await URLCheckServices.getUserURLByName(user, URLCheckName)
        if (Object.keys(URLCheck).length === 0) {
            console.log("break:" + URLCheckName)
            break;
        }
        if (URLCheck.data.monitorState == "restart") {
            console.log("restarting:" + URLCheckName)
            report = {
                "status": 200,
                "availability": true,
                "outages": 0,
                "downtime": 0.0,
                "uptime": 1.0,
                "responseTime": 0,
                "history": [],
                "count": 0
            }
            if (!await URLServices.reportEdit(report, URLCheck, user)) {
                break;
            }
            URLCheck.data.monitorState = "working"
            URLCheck.report=report;
            await URLCheckServices.editUserURLByName(user, URLCheckName, URLCheck.data)
            startTotalTime = performance.now();
            totalResponseTime = 0;
            loopbreak = false;
        }
        console.log("test: " + URLCheckName)
        let time = performance.now();

        axios({
            method: 'GET',
            url: URLCheck.data.url + URLCheck.data.path,
            timeout: URLCheck.data.timeout,
            port: URLCheck.data.port,
            tags: URLCheck.data.tags,
            auth: URLCheck.data.authentication,
            headers: URLCheck.data.headers
        }).then(async (response) => {
            totalResponseTime += (performance.now() - time) / 1000;
            let totalTime = (performance.now() - startTotalTime) / 1000;
            if (response.status >= 200 && response.status < 300 ||response.status==URLCheck.data.assert.statusCode) {
                let report = {
                    "status": response.status,
                    "availability": true,
                    "outages": URLCheck.report.outages,
                    "downtime": (URLCheck.report.outages) * 2 / totalTime,
                    "uptime": 1 - ((URLCheck.report.outages) * 2 / totalTime),
                    "responseTime": totalResponseTime / (URLCheck.report.count + 1),
                    "history": URLCheck.report.history,
                    "count": URLCheck.report.count + 1
                }
                URLCheck.report = report;

                if (!await URLServices.reportEdit(report, URLCheck, user)) {
                    loopbreak = true;
                }

            }
            else {
                totalResponseTime += (performance.now() - time) / 1000;
                let totalTime = (performance.now() - startTotalTime) / 1000;
                history = URLCheck.report.history;
                history[URLCheck.report.history.length] = response.statusText;
                let report = {
                    "status": response.status,
                    "availability": false,
                    "outages": URLCheck.report.outages + 1,
                    "downtime": (URLCheck.report.outages) * 2 / totalTime,
                    "uptime": 1 - ((URLCheck.report.outages) * 2 / totalTime),
                    "responseTime": totalResponseTime / (URLCheck.report.count + 1),
                    "history": history,
                    "count": URLCheck.report.count + 1
                }
                URLCheck.report = report;
                if (!await URLServices.reportEdit(report, URLCheck, user)) {
                    loopbreak = true;
                }
                if (URLCheck.report.outages >= URLCheck.data.threshold) {
                    mailNotificationController.sendNotification({ text: URLCheck, subject: "downTime Notification" }, user)
                    puchoverNotificationController.sendNotification({ text: URLCheck, subject: "downTime Notification" }, user);
                }

            }

        }).catch(async (error) => {
            totalResponseTime += (performance.now() - time) / 1000;
            let totalTime = (performance.now() - startTotalTime) / 1000;
            history = URLCheck.report.history;
            history[URLCheck.report.history.length] = error.message;
            let report = {
                "status": 408,
                "availability": false,
                "outages": URLCheck.report.outages + 1,
                "downtime": (URLCheck.report.outages) * 2 / totalTime,
                "uptime": 1 - ((URLCheck.report.outages) * 2 / totalTime),
                "responseTime": totalResponseTime / (URLCheck.report.count + 1),
                "history": history,
                "count": URLCheck.report.count + 1
            }
            URLCheck.report = report;
            if (!await URLServices.reportEdit(report, URLCheck, user)) {
                loopbreak = true;
            }
            if (URLCheck.report.outages >= URLCheck.data.threshold) {
                mailNotificationController.sendNotification({ text: URLCheck, subject: "downTime Notification" }, user)
                puchoverNotificationController.sendNotification({ text: URLCheck, subject: "downTime Notification" }, user);
            }
        })
        if (loopbreak) {
            console.log("break:" + URLCheckName)
            break;
        }
        await new Promise(r => setTimeout(r, URLCheck.data.interval));

    }
}