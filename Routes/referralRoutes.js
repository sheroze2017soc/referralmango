const express = require('express');
const referralController = require('../controllers/referralController');

const router = express.Router();

router.post('/createReferral', referralController.createReferral);
router.get('/checkReferralCode', referralController.checkReferralCode);
router.post('/loginReferral', referralController.loginReferral);
router.post('/checkEmail', referralController.checkEmail);

module.exports = router;
