
var express = require('express');
var URLController = require('../controllers/URLController');
const router = express.Router();

router.get('/url/getAllURLs', URLController.getAllURLs);
router.post('/url/addUrlCheck', URLController.addURLCheck);
router.delete('/url/deleteURLByName', URLController.deleteURLByName);
router.put('/url/editURLByName', URLController.editURLByName);
router.get('/url/getURLDetailsByName', URLController.getURLDetailsByName);

//export this router to use in our index.js
module.exports = router;