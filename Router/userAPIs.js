var express = require('express');
var userController=require('../controllers/userController');
const router = express.Router();

router.post('/user/login',userController.login );
router.post('/user/signup',userController.signup);
router.get('/user/verifyEmail',userController.verifyEmail);
//export this router to use in our index.js
module.exports = router;